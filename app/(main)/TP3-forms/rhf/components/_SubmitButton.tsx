import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  loadingText = 'Chargement...',
}) => {
  const isDisabled = disabled || loading;
  const displayText = loading ? loadingText : title;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[
        styles.buttonText,
        isDisabled && styles.buttonTextDisabled
      ]}>
        {displayText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#999',
  },
});

export default SubmitButton;