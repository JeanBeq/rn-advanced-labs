import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

interface FormSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
  touched?: boolean;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
  label,
  value,
  onValueChange,
  error,
  touched,
}) => {
  const hasError = touched && error;

  const handleValueChange = (newValue: boolean) => {
    onValueChange(newValue);
    // Haptique léger pour le switch
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={handleValueChange}
          trackColor={{ false: '#767577', true: '#007AFF' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default FormSwitch;