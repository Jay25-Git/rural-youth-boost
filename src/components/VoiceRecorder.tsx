import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        // Use browser Speech Recognition if available (no API quota, faster UX)
        const recognition = new SpeechRecognitionAPI();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript ?? '';
          if (transcript) {
            onTranscription(transcript);
            toast({
              title: '🎯 Speech recognized!',
              description: 'Your voice has been converted to text (browser).',
            });
          }
          setIsRecording(false);
          setIsProcessing(false);
        };

        recognition.onerror = (e: any) => {
          console.error('SpeechRecognition error:', e);
          setIsRecording(false);
          setIsProcessing(false);
          toast({
            title: 'Voice Error',
            description: 'Voice recognition failed. You can try again or type instead.',
            variant: 'destructive',
          });
        };

        recognition.onend = () => {
          // Ensure flags reset if it ends unexpectedly
          setIsRecording(false);
        };

        recognition.start();
        setIsRecording(true);
        toast({
          title: '🎙️ Listening…',
          description: "Speak now! Click stop to finish.",
        });
        return;
      }

      // Fallback: record audio and transcribe via Supabase Edge Function
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: '🎙️ Recording started',
        description: "Speak now! Click stop when you're done.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: 'Microphone Error',
        description: 'Unable to access microphone. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      try { recognitionRef.current.stop(); } catch {}
      setIsRecording(false);
      setIsProcessing(true);
      return;
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64Audio = btoa(String.fromCharCode(...uint8Array));

      console.log('Sending audio for transcription...');
      
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: { audio: base64Audio }
      });

      if (error) {
        console.error('Transcription error:', error);
        throw error;
      }

      if (data?.text) {
        onTranscription(data.text);
        toast({
          title: "🎯 Speech recognized!",
          description: "Your voice has been converted to text.",
        });
      } else {
        throw new Error('No transcription received');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      
      // More specific error messages
      let errorMessage = "Unable to convert speech to text. Please try again.";
      if (error.message && error.message.includes('quota')) {
        errorMessage = "Voice transcription quota exceeded. Please check your OpenAI account billing.";
      } else if (error.message && error.message.includes('API')) {
        errorMessage = "Voice transcription service is currently unavailable.";
      }
      
      toast({
        title: "Transcription Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      onClick={handleToggleRecording}
      disabled={disabled || isProcessing}
      className={`p-3 border-4 border-mario-black font-mario-text font-bold ${
        isRecording 
          ? 'bg-mario-red hover:bg-mario-dark-red text-white animate-pulse' 
          : 'bg-mario-green hover:bg-mario-dark-green text-white'
      }`}
      title={isRecording ? 'Stop recording' : 'Start voice recording'}
    >
      {isProcessing ? (
        <div className="animate-spin">⏳</div>
      ) : isRecording ? (
        <Square size={20} />
      ) : (
        <Mic size={20} />
      )}
    </Button>
  );
};

export default VoiceRecorder;