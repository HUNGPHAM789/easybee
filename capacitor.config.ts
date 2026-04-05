import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easybee.english',
  appName: 'EasyBee',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'EasyBee',
    limitsNavigationsToAppBoundDomains: true,
  },
};

export default config;
