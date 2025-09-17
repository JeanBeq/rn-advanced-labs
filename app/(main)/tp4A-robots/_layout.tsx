import { Stack } from 'expo-router';

export default function TP4RobotsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mes Robots',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Nouveau Robot',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: 'Éditer Robot',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}