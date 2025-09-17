import { Link, Stack } from 'expo-router';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { FormContainer } from './components/_FormContainer';
import { FormDebugInfo } from './components/_FormDebugInfo';
import { FormInput } from './components/_FormInput';
import { FormSwitch } from './components/_FormSwitch';
import { SubmitButton } from './components/_SubmitButton';
import { handleFormSubmit } from './components/_utils';
import { FormValues, initialValues, validationSchema } from './validation/_schema';

export default function FormikFormScreen() {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const displayNameRef = useRef<TextInput>(null);

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    await handleFormSubmit(
      { email: values.email, displayName: values.displayName },
      resetForm
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Formulaire Formik + Yup',
          headerRight: () => (
            <Link href="/TP3-forms/rhf" asChild>
              <TouchableOpacity style={styles.switchButton}>
                <Text style={styles.switchButtonText}>RHF</Text>
              </TouchableOpacity>
            </Link>
          ),
        }} 
      />
      <FormContainer
        title="Créer un compte"
        subtitle="Formik + Yup"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, isSubmitting }) => (
            <>
              <FormInput
                label="Email"
                required
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <FormInput
                ref={passwordRef}
                label="Mot de passe"
                required
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                placeholder="Au moins 8 caractères"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />

              <FormInput
                ref={confirmPasswordRef}
                label="Confirmer le mot de passe"
                required
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                placeholder="Répétez votre mot de passe"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => displayNameRef.current?.focus()}
              />

              <FormInput
                ref={displayNameRef}
                label="Nom d'affichage"
                required
                value={values.displayName}
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                error={errors.displayName}
                touched={touched.displayName}
                placeholder="Votre nom d'affichage"
                returnKeyType="done"
                onSubmitEditing={() => {
                  if (isValid && values.termsAccepted) {
                    handleSubmit();
                  }
                }}
              />

              <FormSwitch
                label="J'accepte les conditions d'utilisation *"
                value={values.termsAccepted}
                onValueChange={(value) => setFieldValue('termsAccepted', value)}
                error={errors.termsAccepted}
                touched={touched.termsAccepted}
              />

              <SubmitButton
                title="Créer le compte"
                onPress={() => handleSubmit()}
                disabled={!isValid || !values.termsAccepted}
                loading={isSubmitting}
                loadingText="Création en cours..."
              />

              <FormDebugInfo
                isValid={isValid}
                termsAccepted={values.termsAccepted}
              />
            </>
          )}
        </Formik>
      </FormContainer>
    </>
  );
}

const styles = StyleSheet.create({
  switchButton: {
    backgroundColor: '#34C759',
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