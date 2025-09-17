import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Robot, RobotInput } from '../types/robot';

// Génération d'UUID simple pour l'ID
const generateId = (): string => {
  return 'robot-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
};

// Interface du store
interface RobotsState {
  robots: Robot[];
  selectedId?: string;
  
  // Actions CRUD
  create: (robotInput: RobotInput) => Robot;
  update: (id: string, robotInput: RobotInput) => Robot | null;
  remove: (id: string) => boolean;
  getById: (id: string) => Robot | undefined;
  
  // Actions utilitaires
  setSelectedId: (id?: string) => void;
  getAllRobots: () => Robot[];
  isNameUnique: (name: string, excludeId?: string) => boolean;
}

export const useRobotsStore = create<RobotsState>()(
  persist(
    (set, get) => ({
      robots: [],
      selectedId: undefined,

      // Créer un nouveau robot
      create: (robotInput: RobotInput) => {
        const newRobot: Robot = {
          id: generateId(),
          ...robotInput,
        };

        set((state) => ({
          robots: [...state.robots, newRobot],
        }));

        return newRobot;
      },

      // Mettre à jour un robot existant
      update: (id: string, robotInput: RobotInput) => {
        const { robots } = get();
        const robotIndex = robots.findIndex(robot => robot.id === id);
        
        if (robotIndex === -1) {
          return null;
        }

        const updatedRobot: Robot = {
          ...robots[robotIndex],
          ...robotInput,
        };

        set((state) => ({
          robots: state.robots.map(robot => 
            robot.id === id ? updatedRobot : robot
          ),
        }));

        return updatedRobot;
      },

      // Supprimer un robot
      remove: (id: string) => {
        const { robots } = get();
        const robotExists = robots.some(robot => robot.id === id);
        
        if (!robotExists) {
          return false;
        }

        set((state) => ({
          robots: state.robots.filter(robot => robot.id !== id),
          selectedId: state.selectedId === id ? undefined : state.selectedId,
        }));

        return true;
      },

      // Récupérer un robot par ID
      getById: (id: string) => {
        const { robots } = get();
        return robots.find(robot => robot.id === id);
      },

      // Sélectionner un robot
      setSelectedId: (id?: string) => {
        set({ selectedId: id });
      },

      // Récupérer tous les robots
      getAllRobots: () => {
        return get().robots;
      },

      // Vérifier l'unicité du nom
      isNameUnique: (name: string, excludeId?: string) => {
        const { robots } = get();
        return !robots.some(robot => 
          robot.name.toLowerCase() === name.toLowerCase() && 
          robot.id !== excludeId
        );
      },
    }),
    {
      name: 'robots-storage', // nom de la clé dans AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      // Ne persiste que les données nécessaires
      partialize: (state) => ({ 
        robots: state.robots,
        selectedId: state.selectedId 
      }),
    }
  )
);
