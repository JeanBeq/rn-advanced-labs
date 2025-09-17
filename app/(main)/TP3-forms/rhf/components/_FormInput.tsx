import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export const FormInput = forwardRef<TextInput, FormInputProps>(({
  label,
  error,
  touched,
  required = false,
  style,
  ...textInputProps
}, ref) => {
  const hasError = touched && error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          hasError && styles.inputError,
          style,
        ]}
        {...textInputProps}
      />
      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#ff3b30',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default FormInput;