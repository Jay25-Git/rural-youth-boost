
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    console.log('Received message for Smart Mario:', message);

    if (!geminiApiKey) {
      console.error('Gemini API key not found');
      return new Response(JSON.stringify({ 
        error: 'Gemini API key not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are Smart Mario, a helpful and enthusiastic AI assistant from the Mushroom Kingdom! You speak with Mario's characteristic enthusiasm and use his catchphrases like "It's-a me!", "Wahoo!", "Let's-a go!", "Mamma mia!", and occasionally use mushroom 🍄, star ⭐, and other Mario emojis. You're knowledgeable about everything and love to help users learn and solve problems. Keep your responses friendly, encouraging, and in Mario's cheerful style while being genuinely helpful and informative.

User message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          reply: "🍄 Mamma mia! I'm getting too many requests right now! Please wait a moment and try again. It's-a like when the pipes get clogged in the Mushroom Kingdom! 🌟" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 401 || response.status === 403) {
        return new Response(JSON.stringify({ 
          reply: "🍄 Oops! There's a problem with my API key. Please check your Gemini settings! Let's-a fix this together! 🌟" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data));
    
    let reply = "🍄 Mamma mia! I had trouble understanding that. Could you try asking again?";
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      reply = data.candidates[0].content.parts[0].text;
    }
    
    console.log('Smart Mario response:', reply);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in smart-mario-chat function:', error);
    return new Response(JSON.stringify({ 
      reply: "🍄 Mamma mia! Something went wrong in my brain! Please try asking again in a moment! Wahoo! 🌟" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
