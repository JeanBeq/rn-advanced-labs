import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const selectRobots = (state: RootState) => state.robots.items;

export const selectRobotById = (id: string) => (state: RootState) =>
  state.robots.items.find(robot => robot.id === id);

export const selectRobotsSortedByName = createSelector(
  [selectRobots],
  (robots) => [...robots].sort((a, b) => a.name.localeCompare(b.name))
);
