import { File, Paths } from 'expo-file-system';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { initDatabase } from '../../../db';
import * as robotRepo from '../../../services/robotRepo';
import { Robot } from '../../../types/robot';

export default function RobotsListScreen() {
  const router = useRouter();
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  // Initialiser la DB et charger les robots
  const loadRobots = async () => {
    try {
      await initDatabase();
      const data = await robotRepo.list({ q: search, sort: 'name' });
      setRobots(data);
    } catch (error) {
      console.error('Erreur chargement robots:', error);
      Alert.alert('Erreur', 'Impossible de charger les robots');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Recharger quand on revient sur la page
  useFocusEffect(
    useCallback(() => {
      loadRobots();
    }, [search])
  );

  // Rechercher avec délai
  useEffect(() => {
    const timer = setTimeout(() => {
      loadRobots();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadRobots();
  };

  // Supprimer un robot
  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Confirmer',
      `Supprimer ${name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await robotRepo.remove(id);
            loadRobots();
          },
        },
      ]
    );
  };

  // Exporter les données
  const handleExport = async () => {
    try {
      const allRobots = await robotRepo.getAll();
      const json = JSON.stringify(allRobots, null, 2);
      
      // Créer un fichier dans le répertoire de documents
      const file = new File(Paths.document, 'robots_export.json');
      
      // Créer le fichier avec option overwrite
      if (file.exists) {
        await file.delete();
      }
      await file.create();
      
      // Utiliser FileHandle pour écrire
      const handle = file.open();
      const encoder = new TextEncoder();
      const data = encoder.encode(json);
      handle.writeBytes(data);
      handle.close();
      
      Alert.alert('Succès', `${allRobots.length} robots exportés vers:\n${file.uri}`);
    } catch (error) {
      console.error('Erreur export:', error);
      Alert.alert('Erreur', `Impossible d'exporter les données: ${error}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un robot..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Liste des robots */}
      <FlatList
        data={robots}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemYear}>Année: {item.year}</Text>
            </View>
            <View style={styles.itemActions}>
              <TouchableOpacity
                style={[styles.button, styles.buttonEdit]}
                onPress={() => router.push(`/(main)/TP5-robots-db/edit/${item.id}` as any)}
              >
                <Text style={styles.buttonText}>Éditer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => handleDelete(item.id, item.name)}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun robot trouvé</Text>
        }
      />

      {/* Boutons d'action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCreate]}
          onPress={() => router.push('/(main)/TP5-robots-db/create' as any)}
        >
          <Text style={styles.buttonText}>+ Créer un robot</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonExport]}
          onPress={handleExport}
        >
          <Text style={styles.buttonText}>Exporter JSON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContent: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemYear: {
    fontSize: 12,
    color: '#999',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: '#2196F3',
  },
  buttonDelete: {
    backgroundColor: '#f44336',
  },
  buttonCreate: {
    backgroundColor: '#4CAF50',
  },
  buttonExport: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#999',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});
