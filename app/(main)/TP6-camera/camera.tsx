import { CameraType, CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { savePhoto } from './lib/camera/storage';
import { useCameraPermission } from './lib/hooks/useCameraPermission';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { hasPermission, canAskAgain, request, openSettings } = useCameraPermission();

  // Demande la permission au chargement si nécessaire
  React.useEffect(() => {
    if (!hasPermission && canAskAgain) {
      request();
    }
  }, []);

  // Bascule entre caméra avant/arrière
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Capture une photo
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();
      
      if (photo) {
        // Sauvegarde la photo
        await savePhoto(photo.uri);
        
        // Retour à la galerie
        Alert.alert('Succès', 'Photo enregistrée !', [
          { text: 'OK', onPress: () => router.replace('/TP6-camera') },
        ]);
      }
    } catch (error) {
      console.error('Erreur lors de la capture:', error);
      Alert.alert('Erreur', 'Impossible de prendre la photo');
    } finally {
      setIsCapturing(false);
    }
  };

  // Affichage si pas de permission
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          L'accès à la caméra est nécessaire pour prendre des photos
        </Text>
        {canAskAgain ? (
          <TouchableOpacity style={styles.button} onPress={request}>
            <Text style={styles.buttonText}>Autoriser</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={openSettings}>
            <Text style={styles.buttonText}>Ouvrir les paramètres</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Contrôles en haut */}
        <View style={styles.topControls}>
          {/* Bouton retour */}
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Text style={styles.iconButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Bouton bascule caméra */}
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <Text style={styles.iconButtonText}>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton capture */}
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={isCapturing}
            activeOpacity={0.8}
          >
            {isCapturing ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconButtonText: {
    color: '#fff',
    fontSize: 26,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
  },
});
