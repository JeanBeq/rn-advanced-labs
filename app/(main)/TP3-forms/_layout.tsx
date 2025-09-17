import { Stack } from 'expo-router';

export default function TP3Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="formik/index"
        options={{
          title: 'Formik + Yup',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="rhf/index"
        options={{
          title: 'React Hook Form + Zod',
          headerShown: false,
        }}
      />
    </Stack>
  );
}