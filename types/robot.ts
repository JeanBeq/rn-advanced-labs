// Types pour le modèle Robot

export enum RobotType {
  INDUSTRIAL = 'industrial',
  SERVICE = 'service',
  MEDICAL = 'medical',
  EDUCATIONAL = 'educational',
  OTHER = 'other'
}

export interface Robot {
  id: string;
  name: string;
  label: string;
  year: number;
  type: RobotType;
}

export interface RobotInput {
  name: string;
  label: string;
  year: number;
  type: RobotType;
}

// Utilitaires pour les types
export const ROBOT_TYPE_LABELS: Record<RobotType, string> = {
  [RobotType.INDUSTRIAL]: 'Industriel',
  [RobotType.SERVICE]: 'Service',
  [RobotType.MEDICAL]: 'Médical',
  [RobotType.EDUCATIONAL]: 'Éducatif',
  [RobotType.OTHER]: 'Autre'
};

export const ROBOT_TYPES = Object.values(RobotType);
