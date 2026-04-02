import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easybee.english',
  appName: 'EasyBee',
  webDir: 'dist',
  server: {
    // In production, the app loads from the local bundle
    // During development, uncomment below to use live reload:
    // url: 'http://192.168.1.x:3000',
    // cleartext: true,
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'EasyBee',
    // Microphone permission
    limitsNavigationsToAppBoundDomains: true,
  },
  plugins: {
    // Mic permission will be configured in Info.plist on Mac
  },
};

export default config;
