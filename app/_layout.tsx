import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { usePersistCurrentUrl } from '../hooks/use-persisted-url';
import { persistor, store } from './store';

export default function RootLayout() {
  usePersistCurrentUrl();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(main)" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}