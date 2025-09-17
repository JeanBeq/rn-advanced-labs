import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RobotForm } from '../../../../components/RobotForm';
import { useRobotsStore } from '../../../../store/robotsStore';

export default function EditRobotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getById = useRobotsStore((state) => state.getById);
  
  const robot = id ? getById(id) : undefined;

  if (!robot) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Robot introuvable',
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>🤖 Robot introuvable</Text>
          <Text style={styles.errorSubtitle}>
            Le robot que vous cherchez n'existe plus ou a été supprimé.
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Éditer ${robot.name}`,
          presentation: 'modal',
        }}
      />
      <RobotForm robot={robot} />
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});