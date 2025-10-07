import { Link } from 'expo-router';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../app/hooks';
import { deleteRobot } from '../features/robots/robotsSlice';
import { useRobotsStore } from '../store/robotsStore';
import { Robot, ROBOT_TYPE_LABELS } from '../types/robot';

interface RobotListItemProps {
  robot: Robot;
  useRedux?: boolean;
}

export const RobotListItem: React.FC<RobotListItemProps> = ({ robot, useRedux = false }) => {
  const dispatch = useAppDispatch();
  const removeRobotZustand = useRobotsStore((state) => state.remove);

  const handleDelete = () => {
    Alert.alert(
      'Supprimer le robot',
      `Êtes-vous sûr de vouloir supprimer "${robot.name}" ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            if (useRedux) {
              dispatch(deleteRobot(robot.id));
            } else {
              removeRobotZustand(robot.id);
            }
          },
        },
      ]
    );
  };

  const editPath = useRedux 
    ? `/(main)/tp4b-robots-rtk/edit/${robot.id}` 
    : `/(main)/tp4A-robots/edit/${robot.id}`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{robot.name}</Text>
          <Text style={styles.year}>{robot.year}</Text>
        </View>
        
        <Text style={styles.label}>{robot.label}</Text>
        
        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Type:</Text>
          <Text style={styles.type}>{ROBOT_TYPE_LABELS[robot.type]}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Link href={editPath as any} asChild>
          <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Text style={styles.editButtonText}>✏️ Éditer</Text>
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>🗑️ Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  content: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  year: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  type: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});