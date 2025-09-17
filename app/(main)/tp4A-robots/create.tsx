import { Stack } from 'expo-router';
import React from 'react';
import { RobotForm } from '../../../components/RobotForm';

export default function CreateRobotScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Nouveau Robot',
          presentation: 'modal',
        }}
      />
      <RobotForm />
    </>
  );
}