import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { deletePhoto, getPhoto } from '../lib/camera/storage';
import { Photo } from '../lib/camera/types';

const { width, height } = Dimensions.get('window');

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Charge les infos de la photo
  useEffect(() => {
    loadPhoto();
  }, [id]);

  // Animation des overlays
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showOverlays ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showOverlays]);

  const loadPhoto = async () => {
    if (!id) return;
    
    try {
      const photoData = await getPhoto(id);
      setPhoto(photoData);
    } catch (error) {
      console.error('Erreur lors du chargement de la photo:', error);
      Alert.alert('Erreur', 'Impossible de charger la photo');
    } finally {
      setLoading(false);
    }
  };

  // Supprime la photo
  const handleDelete = () => {
    Alert.alert(
      'Supprimer la photo',
      'Êtes-vous sûr de vouloir supprimer cette photo ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              if (id) {
                await deletePhoto(id);
                router.back();
              }
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la photo');
            }
          },
        },
      ]
    );
  };

  // Formate la date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Formate la taille
  const formatSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!photo) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Photo introuvable</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Image plein écran - Tap pour masquer/afficher les overlays */}
      <TouchableOpacity 
        style={styles.imageContainer} 
        activeOpacity={1}
        onPress={() => setShowOverlays(!showOverlays)}
      >
        <Image 
          source={{ uri: photo.uri }} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </TouchableOpacity>

      {/* Overlay avec bouton retour en haut */}
      {showOverlays && (
        <Animated.View style={[styles.topOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/TP6-camera')}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Overlay avec infos et actions en bas */}
      {showOverlays && (
        <Animated.View style={[styles.bottomOverlay, { opacity: fadeAnim }]}>
        {/* Métadonnées */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{formatDate(photo.createdAt)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>💾</Text>
            <Text style={styles.infoText}>{formatSize(photo.size)}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={handleDelete}
          >
            <Text style={styles.actionButtonIcon}>🗑️</Text>
            <Text style={styles.actionButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: width,
    height: height,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
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
  backButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '300',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingTop: 24,
    paddingBottom: 45,
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  infoText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonIcon: {
    fontSize: 22,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
