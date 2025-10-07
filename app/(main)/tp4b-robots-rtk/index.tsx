import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppSelector } from '../../../app/hooks';
import { RobotListItem } from '../../../components/RobotListItem';
import { selectRobotsSortedByName } from '../../../features/robots/selectors';

export default function RobotsListScreen() {
  const robots = useAppSelector(selectRobotsSortedByName);

  return (
    <View style={styles.container}>
      <FlatList
        data={robots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RobotListItem robot={item} useRedux />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun robot pour le moment</Text>
            <Text style={styles.emptySubtext}>Appuyez sur + pour en créer un</Text>
          </View>
        }
        contentContainerStyle={robots.length === 0 && styles.emptyList}
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/(main)/tp4b-robots-rtk/create')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 32,
    color: 'white',
    fontWeight: '300',
  },
});
