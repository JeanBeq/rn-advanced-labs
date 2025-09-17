import { zodResolver } from '@hookform/resolvers/zod';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActionSheetIOS,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useRobotsStore } from '../store/robotsStore';
import { Robot, ROBOT_TYPE_LABELS, ROBOT_TYPES, RobotType } from '../types/robot';
import {
    createRobotSchemaWithUniqueValidation,
    RobotFormData
} from '../validation/robotSchema';

interface RobotFormProps {
  robot?: Robot; // Si fourni, on est en mode édition
  onSuccess?: () => void;
}

export const RobotForm: React.FC<RobotFormProps> = ({ robot, onSuccess }) => {
  const isEditing = !!robot;
  const labelInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  // Alternative au Picker: ActionSheet ou sélecteur simple
  const showTypeSelector = (currentValue: RobotType, onChange: (value: RobotType) => void) => {
    if (Platform.OS === 'ios') {
      const options = [...ROBOT_TYPES.map(type => ROBOT_TYPE_LABELS[type]), 'Annuler'];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
          title: 'Sélectionner un type de robot',
        },
        (buttonIndex) => {
          if (buttonIndex < ROBOT_TYPES.length) {
            onChange(ROBOT_TYPES[buttonIndex]);
          }
        }
      );
    } else {
      const buttons = ROBOT_TYPES.map(type => ({
        text: ROBOT_TYPE_LABELS[type],
        onPress: () => onChange(type),
      }));
      buttons.push({ text: 'Annuler', onPress: () => {} });
      
      Alert.alert('Sélectionner un type de robot', undefined, buttons);
    }
  };
  
  // Store actions
  const createRobot = useRobotsStore((state) => state.create);
  const updateRobot = useRobotsStore((state) => state.update);
  const getAllRobots = useRobotsStore((state) => state.getAllRobots);
  
  // Schema de validation avec unicité du nom
  const allRobots = getAllRobots();
  const validationSchema = createRobotSchemaWithUniqueValidation(
    allRobots, 
    robot?.id
  );

  // Configuration du formulaire
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<RobotFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: robot ? {
      name: robot.name,
      label: robot.label,
      year: robot.year,
      type: robot.type,
    } : {
      name: '',
      label: '',
      year: new Date().getFullYear(),
      type: RobotType.OTHER,
    },
  });

  // Reset si le robot change (en cas de réutilisation du composant)
  useEffect(() => {
    if (robot) {
      reset({
        name: robot.name,
        label: robot.label,
        year: robot.year,
        type: robot.type,
      });
    }
  }, [robot, reset]);

  const onSubmit = async (data: RobotFormData) => {
    try {
      if (isEditing && robot) {
        const updatedRobot = updateRobot(robot.id, data);
        if (updatedRobot) {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert('Succès', 'Robot modifié avec succès !', [
            { 
              text: 'OK', 
              onPress: () => {
                onSuccess?.();
                router.back();
              }
            },
          ]);
        } else {
          throw new Error('Erreur lors de la modification');
        }
      } else {
        createRobot(data);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Succès', 'Robot créé avec succès !', [
          { 
            text: 'OK', 
            onPress: () => {
              onSuccess?.();
              router.back();
            }
          },
        ]);
      }
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          
          {/* Champ Nom */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nom du robot *</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.name && styles.inputError,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ex: R2-D2"
                  returnKeyType="next"
                  onSubmitEditing={() => labelInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          {/* Champ Label */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Libellé *</Text>
            <Controller
              control={control}
              name="label"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={labelInputRef}
                  style={[
                    styles.input,
                    styles.textArea,
                    errors.label && styles.inputError,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Description du robot..."
                  multiline
                  numberOfLines={3}
                  returnKeyType="next"
                  onSubmitEditing={() => yearInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              )}
            />
            {errors.label && (
              <Text style={styles.errorText}>{errors.label.message}</Text>
            )}
          </View>

          {/* Champ Année */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Année de création *</Text>
            <Controller
              control={control}
              name="year"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={yearInputRef}
                  style={[
                    styles.input,
                    errors.year && styles.inputError,
                  ]}
                  value={value.toString()}
                  onChangeText={(text) => {
                    const numValue = parseInt(text, 10);
                    onChange(isNaN(numValue) ? 0 : numValue);
                  }}
                  onBlur={onBlur}
                  placeholder="2024"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              )}
            />
            {errors.year && (
              <Text style={styles.errorText}>{errors.year.message}</Text>
            )}
          </View>

          {/* Champ Type - Picker natif */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Type de robot *</Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={[
                    styles.typeSelector,
                    errors.type && styles.inputError,
                  ]}
                  onPress={() => showTypeSelector(value, onChange)}
                >
                  <Text style={styles.typeSelectorText}>
                    {ROBOT_TYPE_LABELS[value]}
                  </Text>
                  <Text style={styles.typeSelectorArrow}>▼</Text>
                </TouchableOpacity>
              )}
            />
            {errors.type && (
              <Text style={styles.errorText}>{errors.type.message}</Text>
            )}
          </View>

          {/* Bouton Submit */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isValid || isSubmitting) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting 
                ? 'En cours...' 
                : isEditing 
                  ? '✏️ Modifier le robot' 
                  : '🤖 Créer le robot'
              }
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  typeSelector: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  typeSelectorText: {
    fontSize: 16,
    color: '#333',
  },
  typeSelectorArrow: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});