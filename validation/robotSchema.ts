import { z } from 'zod';
import { RobotType } from '../types/robot';

// Année courante pour validation
const CURRENT_YEAR = new Date().getFullYear();

// Schema de validation pour Robot avec Zod
export const robotSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut dépasser 50 caractères')
    .trim(),
  
  label: z
    .string()
    .min(3, 'Le libellé doit contenir au moins 3 caractères')
    .max(100, 'Le libellé ne peut dépasser 100 caractères')
    .trim(),
    
  year: z
    .number({
      message: 'L\'année doit être un nombre'
    })
    .int('L\'année doit être un nombre entier')
    .min(1950, 'L\'année ne peut être antérieure à 1950')
    .max(CURRENT_YEAR, `L'année ne peut être postérieure à ${CURRENT_YEAR}`),
    
  type: z.nativeEnum(RobotType, {
    message: 'Type de robot invalide'
  })
});

// Schema avec validation d'unicité du nom (sera utilisé dans le formulaire)
export const createRobotSchemaWithUniqueValidation = (
  existingRobots: { name: string }[], 
  currentRobotId?: string
) => {
  return robotSchema.refine(
    (data) => {
      const existingNames = existingRobots
        .filter(robot => 'id' in robot ? (robot as any).id !== currentRobotId : true)
        .map(robot => robot.name.toLowerCase());
      return !existingNames.includes(data.name.toLowerCase());
    },
    {
      message: 'Ce nom de robot existe déjà',
      path: ['name']
    }
  );
};

export type RobotFormData = z.infer<typeof robotSchema>;
