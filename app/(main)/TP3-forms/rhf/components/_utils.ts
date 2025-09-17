import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export interface FormSubmitData {
  email: string;
  displayName: string;
}

export const handleFormSubmit = async (
  data: FormSubmitData,
  resetForm: () => void
): Promise<void> => {
  try {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Haptique de succès
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Message de confirmation
    Alert.alert(
      'Succès !',
      `Compte créé avec succès pour ${data.displayName} (${data.email})`,
      [{ text: 'OK' }]
    );
    
    // Reset du formulaire
    resetForm();
  } catch (error) {
    // Haptique d'erreur
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    
    Alert.alert(
      'Erreur',
      'Une erreur est survenue lors de la création du compte',
      [{ text: 'OK' }]
    );
  }
};

// Export par défaut vide pour satisfaire Expo Router
export default {};