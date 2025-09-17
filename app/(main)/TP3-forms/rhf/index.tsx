import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Stack } from 'expo-router';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { FormContainer } from './components/_FormContainer';
import { FormDebugInfo } from './components/_FormDebugInfo';
import { FormInput } from './components/_FormInput';
import { FormSwitch } from './components/_FormSwitch';
import { SubmitButton } from './components/_SubmitButton';
import { handleFormSubmit } from './components/_utils';
import { defaultValues, FormData, formSchema } from './validation/_schema';

export default function RHFFormScreen() {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const displayNameRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, touchedFields },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Surveiller la valeur du switch pour la validation
  const termsAccepted = watch('termsAccepted');

  const onSubmit = async (data: FormData) => {
    await handleFormSubmit(
      { email: data.email, displayName: data.displayName },
      reset
    );
  };

  const isFormValid = isValid && termsAccepted;

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Formulaire RHF + Zod',
          headerRight: () => (
            <Link href="/TP3-forms/formik" asChild>
              <TouchableOpacity style={styles.switchButton}>
                <Text style={styles.switchButtonText}>Formik</Text>
              </TouchableOpacity>
            </Link>
          ),
        }} 
      />
      <FormContainer
        title="Créer un compte"
        subtitle="React Hook Form + Zod"
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Email"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              touched={touchedFields.email}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              ref={passwordRef}
              label="Mot de passe"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              touched={touchedFields.password}
              placeholder="Au moins 8 caractères"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              ref={confirmPasswordRef}
              label="Confirmer le mot de passe"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              touched={touchedFields.confirmPassword}
              placeholder="Répétez votre mot de passe"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => displayNameRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              ref={displayNameRef}
              label="Nom d'affichage"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.displayName?.message}
              touched={touchedFields.displayName}
              placeholder="Votre nom d'affichage"
              returnKeyType="done"
              onSubmitEditing={() => {
                if (isFormValid) {
                  handleSubmit(onSubmit)();
                }
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="termsAccepted"
          render={({ field: { onChange, value } }) => (
            <FormSwitch
              label="J'accepte les conditions d'utilisation *"
              value={value}
              onValueChange={onChange}
              error={errors.termsAccepted?.message}
              touched={touchedFields.termsAccepted}
            />
          )}
        />

        <SubmitButton
          title="Créer le compte"
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
          loading={isSubmitting}
          loadingText="Création en cours..."
        />

        <FormDebugInfo
          isValid={isValid}
          termsAccepted={termsAccepted}
        />
      </FormContainer>
    </>
  );
}

const styles = StyleSheet.create({
  switchButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  switchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});