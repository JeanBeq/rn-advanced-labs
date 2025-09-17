import { Stack } from 'expo-router';
import { usePersistCurrentUrl } from '../hooks/use-persisted-url';

export default function RootLayout() {
  usePersistCurrentUrl();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}