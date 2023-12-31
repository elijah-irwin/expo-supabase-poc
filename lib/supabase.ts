import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

export const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://uepirjskpelalzdgonze.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcGlyanNrcGVsYWx6ZGdvbnplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2NDE5NzcsImV4cCI6MjAwODIxNzk3N30.pgzSNpXhFpM87yhi9wX3vZC4ia3SYEggSriVocpr_yM';

const isWeb = Platform.OS === 'web';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: !isWeb ? (ExpoSecureStoreAdapter as any) : undefined,
    detectSessionInUrl: !isWeb ? false : true,
  },
});
