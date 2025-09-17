import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface FormDebugInfoProps {
  isValid: boolean;
  termsAccepted: boolean;
  additionalInfo?: Record<string, boolean | string>;
}

export const FormDebugInfo: React.FC<FormDebugInfoProps> = ({
  isValid,
  termsAccepted,
  additionalInfo,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Formulaire valide: {isValid ? '✅' : '❌'}
      </Text>
      <Text style={styles.text}>
        CGU acceptées: {termsAccepted ? '✅' : '❌'}
      </Text>
      {additionalInfo && Object.entries(additionalInfo).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key}: {typeof value === 'boolean' ? (value ? '✅' : '❌') : value}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default FormDebugInfo;