import { Stack } from 'expo-router';

export default function TP5Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Robots (SQLite)' }} 
      />
      <Stack.Screen 
        name="create" 
        options={{ title: 'Créer un robot' }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ title: 'Éditer un robot' }} 
      />
    </Stack>
  );
}
