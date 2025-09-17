import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Veuillez saisir un email valide')
    .transform(val => val.trim()),
  
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
    ),
  
  confirmPassword: z
    .string()
    .min(1, 'La confirmation du mot de passe est requise'),
  
  displayName: z
    .string()
    .min(1, 'Le nom d\'affichage est requis')
    .min(2, 'Le nom d\'affichage doit contenir au moins 2 caractères')
    .max(50, 'Le nom d\'affichage ne peut pas dépasser 50 caractères')
    .transform(val => val.trim()),
  
  termsAccepted: z
    .boolean()
    .refine(val => val === true, {
      message: 'Vous devez accepter les conditions d\'utilisation',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  termsAccepted: false,
};

// Export par défaut vide pour satisfaire Expo Router
export default {};