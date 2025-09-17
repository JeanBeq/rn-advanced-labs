import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { fetchLastStoredUrl } from '../hooks/use-persisted-url';

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const last = await fetchLastStoredUrl();
        if (!mounted) return;
        if (last && last.startsWith('/')) {
          if (last !== '/index') {
            router.replace(last as any);
            return;
          }
        }
      } catch (e: any) {
        if (mounted) setError('Impossible de restaurer la dernière page');
      } finally {
        if (mounted) setChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>Restauration…</Text>
      </View>
    );
  }

  if (error) {
    return <Redirect href="/(main)/home" />;
  }

  return <Redirect href="/(main)/home" />;
}