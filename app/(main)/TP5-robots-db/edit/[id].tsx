import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RobotForm } from '../../../../components/RobotForm';
import { initDatabase } from '../../../../db';
import * as robotRepo from '../../../../services/robotRepo';
import { Robot } from '../../../../types/robot';

export default function EditRobotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [allRobots, setAllRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      await initDatabase();
      
      // Charger le robot à éditer
      const foundRobot = await robotRepo.getById(id);
      if (!foundRobot) {
        setError('Robot introuvable');
        return;
      }
      setRobot(foundRobot);
      
      // Charger tous les robots pour validation
      const robots = await robotRepo.getAll();
      setAllRobots(robots);
    } catch (err) {
      console.error('Erreur chargement robot:', err);
      setError('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !robot) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Robot introuvable'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RobotForm robot={robot} allRobots={allRobots} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
  },
});
