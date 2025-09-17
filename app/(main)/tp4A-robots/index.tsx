import { router, Stack } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RobotListItem } from '../../../components/RobotListItem';
import { useRobotsStore } from '../../../store/robotsStore';
import { Robot } from '../../../types/robot';

export default function RobotsListScreen() {
  const allRobots = useRobotsStore((state) => state.getAllRobots());
  
  // Tri des robots par année (plus récent en premier)
  const robots = React.useMemo(() => {
    return [...allRobots].sort((a, b) => b.year - a.year);
  }, [allRobots]);

  const renderRobot = ({ item }: { item: Robot }) => (
    <RobotListItem robot={item} />
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>🤖 Aucun robot</Text>
      <Text style={styles.emptySubtitle}>
        Créez votre premier robot pour commencer !
      </Text>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => router.push('/tp4A-robots/create' as any)}
      >
        <Text style={styles.createButtonText}>➕ Créer un robot</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mes Robots',
        }}
      />
      
      <View style={styles.container}>
        {robots.length > 0 && (
          <View style={styles.sortIndicator}>
            <Text style={styles.sortIndicatorText}>
              {robots.length} robot{robots.length > 1 ? 's' : ''} (trié par année)
            </Text>
          </View>
        )}
        
        <FlatList
          data={robots}
          renderItem={renderRobot}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            robots.length === 0 && styles.listContainerEmpty,
          ]}
          ListEmptyComponent={EmptyList}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Bouton flottant pour créer un robot */}
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => router.push('/tp4A-robots/create' as any)}
        >
          <Text style={styles.floatingButtonText}>➕</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 8,
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
  },

  sortIndicator: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
  },
  sortIndicatorText: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});