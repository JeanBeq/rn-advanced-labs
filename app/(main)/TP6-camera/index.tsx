import { router, Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { listPhotos } from './lib/camera/storage';
import { Photo } from './lib/camera/types';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 4;
const ITEM_SIZE = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

export default function GalleryScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Charge les photos
  const loadPhotos = async () => {
    try {
      const photosList = await listPhotos();
      setPhotos(photosList);
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Recharge à chaque fois que l'écran est affiché
  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [])
  );

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadPhotos();
  };

  // Rendu d'une photo
  const renderPhoto = ({ item }: { item: Photo }) => (
    <TouchableOpacity
      style={styles.photoItem}
      onPress={() => router.push(`/TP6-camera/detail/${item.id}`)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.uri }} 
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.photoOverlay}>
        <Text style={styles.photoDate}>
          {new Date(item.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Galerie Photos',
          headerRight: () => (
            <Text style={styles.headerCount}>
              {photos.length > 0 ? `${photos.length} photo${photos.length > 1 ? 's' : ''}` : ''}
            </Text>
          ),
        }}
      />
      
      <View style={styles.container}>
        {photos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyText}>Aucune photo</Text>
            <Text style={styles.emptySubtext}>
              Appuyez sur le bouton ➕ ci-dessous{'\n'}pour prendre votre première photo
            </Text>
          </View>
        ) : (
          <FlatList
            data={photos}
            renderItem={renderPhoto}
            keyExtractor={(item) => item.id}
            numColumns={COLUMN_COUNT}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        {/* Bouton flottant pour ouvrir la caméra */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push('/TP6-camera/camera')}
          activeOpacity={0.8}
        >
          <Text style={styles.floatingButtonText}>📷</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginRight: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  grid: {
    padding: SPACING,
    paddingTop: SPACING * 2,
    paddingBottom: 100,
  },
  photoItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: SPACING / 2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  photoDate: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonText: {
    fontSize: 32,
  },
});
