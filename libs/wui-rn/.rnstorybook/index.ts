import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { view } from './storybook.requires';

/**
 * Storybook on-device persistence is optional. AsyncStorage v3 can throw when the
 * native module is missing (e.g. web, or some Expo Go / linking edge cases).
 * We fall back to in-memory storage so Storybook still runs.
 */
const memoryFallback = new Map<string, string>();

function createStorybookStorage() {
  if (Platform.OS === 'web') {
    return {
      getItem: async (key: string): Promise<string | null> => {
        if (typeof localStorage === 'undefined') return null;
        return localStorage.getItem(key);
      },
      setItem: async (key: string, value: string): Promise<void> => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
      },
    };
  }

  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        return await AsyncStorage.getItem(key);
      } catch {
        return memoryFallback.get(key) ?? null;
      }
    },
    setItem: async (key: string, value: string): Promise<void> => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch {
        memoryFallback.set(key, value);
      }
    },
  };
}

const StorybookUIRoot = view.getStorybookUI({
  storage: createStorybookStorage(),
});

export default StorybookUIRoot;
