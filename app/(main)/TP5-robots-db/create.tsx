import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RobotForm } from '../../../components/RobotForm';
import { initDatabase } from '../../../db';
import * as robotRepo from '../../../services/robotRepo';
import { Robot } from '../../../types/robot';

export default function CreateRobotScreen() {
  const [allRobots, setAllRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les robots pour validation d'unicité
  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      await initDatabase();
      const robots = await robotRepo.getAll();
      setAllRobots(robots);
    } catch (error) {
      console.error('Erreur chargement robots:', error);
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

  return (
    <View style={styles.container}>
      <RobotForm allRobots={allRobots} />
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
});
