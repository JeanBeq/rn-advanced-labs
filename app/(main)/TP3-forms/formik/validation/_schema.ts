import * as Yup from 'yup';

export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  termsAccepted: boolean;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('L\'email est requis')
    .email('Veuillez saisir un email valide')
    .trim(),
  
  password: Yup.string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
    ),
  
  confirmPassword: Yup.string()
    .required('La confirmation du mot de passe est requise')
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
  
  displayName: Yup.string()
    .required('Le nom d\'affichage est requis')
    .min(2, 'Le nom d\'affichage doit contenir au moins 2 caractères')
    .max(50, 'Le nom d\'affichage ne peut pas dépasser 50 caractères')
    .trim(),
  
  termsAccepted: Yup.boolean()
    .required('Vous devez accepter les conditions d\'utilisation')
    .oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
});

export const initialValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  termsAccepted: false,
};

// Export par défaut vide pour satisfaire Expo Router
export default {};