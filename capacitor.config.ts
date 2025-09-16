import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.58abc300d4184e4b9f2198e24676fcd7',
  appName: 'rural-youth-boost',
  webDir: 'dist',
  server: {
    url: 'https://58abc300-d418-4e4b-9f21-98e24676fcd7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    }
  }
};

export default config;