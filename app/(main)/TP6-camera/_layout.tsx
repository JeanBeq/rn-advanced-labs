import { Stack } from 'expo-router';

export default function TP6Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          title: 'Galerie Photos'
        }} 
      />
      <Stack.Screen 
        name="camera" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="detail/[id]" 
        options={{ 
          headerShown: false
        }} 
      />
    </Stack>
  );
}
