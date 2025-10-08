import { useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

export function useCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isRequesting, setIsRequesting] = useState(false);

  // Demande la permission
  const request = async () => {
    setIsRequesting(true);
    try {
      const result = await requestPermission();
      return result.granted;
    } finally {
      setIsRequesting(false);
    }
  };

  // Ouvre les paramètres de l'application
  const openSettings = () => {
    Alert.alert(
      'Permission requise',
      'Veuillez autoriser l\'accès à la caméra dans les paramètres de l\'application.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Ouvrir les paramètres',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  };

  return {
    hasPermission: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    isRequesting,
    request,
    openSettings,
  };
}
