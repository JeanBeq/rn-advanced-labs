import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { Robot, RobotInput } from '../../types/robot';

interface RobotsState {
  items: Robot[];
}

const initialState: RobotsState = {
  items: [],
};

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    createRobot: (state, action: PayloadAction<RobotInput>) => {
      const nameExists = state.items.some(
        robot => robot.name.toLowerCase() === action.payload.name.toLowerCase()
      );

      if (!nameExists) {
        const newRobot: Robot = {
          id: uuid.v4() as string,
          ...action.payload,
        };
        state.items.push(newRobot);
      }
    },

    updateRobot: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<RobotInput> }>
    ) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex(robot => robot.id === id);

      if (index !== -1) {
        if (changes.name) {
          const nameExists = state.items.some(
            robot =>
              robot.id !== id &&
              robot.name.toLowerCase() === changes.name!.toLowerCase()
          );

          if (nameExists) {
            return;
          }
        }

        state.items[index] = {
          ...state.items[index],
          ...changes,
        };
      }
    },

    deleteRobot: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(robot => robot.id !== action.payload);
    },
  },
});

export const { createRobot, updateRobot, deleteRobot } = robotsSlice.actions;
export default robotsSlice.reducer;
