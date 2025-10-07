import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../../../app/hooks';
import { RobotForm } from '../../../../components/RobotForm';
import { selectRobotById } from '../../../../features/robots/selectors';

export default function EditRobotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const robot = useAppSelector((state) => selectRobotById(id)(state));

  if (!robot) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Robot non trouvé</Text>
      </View>
    );
  }

  return <RobotForm robot={robot} useRedux />;
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
  },
});
