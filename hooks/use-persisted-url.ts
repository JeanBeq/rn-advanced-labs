import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';

const LAST_URL_KEY = 'LAST_VISITED_URL_V1';

export function usePersistCurrentUrl(options: { debounceMs?: number } = {}) {
  const pathname = usePathname();
  const lastSavedRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | number | null>(null);
  const { debounceMs = 150 } = options;

  const persist = useCallback(async (path: string) => {
    try {
      await AsyncStorage.setItem(LAST_URL_KEY, path);
      lastSavedRef.current = path;
    } catch (e) {
      console.warn('[usePersistCurrentUrl] Failed to save path', e);
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (lastSavedRef.current === pathname) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      persist(pathname);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, persist, debounceMs]);

  const getLastUrl = useCallback(async (): Promise<string | null> => {
    try {
      return (await AsyncStorage.getItem(LAST_URL_KEY)) || null;
    } catch (e) {
      console.warn('[usePersistCurrentUrl] Failed to read path', e);
      return null;
    }
  }, []);

  const clearLastUrl = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(LAST_URL_KEY);
      lastSavedRef.current = null;
    } catch (e) {
      console.warn('[usePersistCurrentUrl] Failed to clear path', e);
    }
  }, []);

  return { getLastUrl, clearLastUrl };
}

export async function fetchLastStoredUrl(): Promise<string | null> {
  try {
    return (await AsyncStorage.getItem(LAST_URL_KEY)) || null;
  } catch (e) {
    console.warn('[fetchLastStoredUrl] Failed to fetch path', e);
    return null;
  }
}
