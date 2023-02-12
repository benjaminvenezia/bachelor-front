import { Task } from "../store/slices/allTasksSlice";

export const checkTaskIsPresent = (arrayToCheck: Task[], taskToAdd: Task): boolean => {
  let isExisting = false;

  arrayToCheck.some((t: Task) => {
    isExisting = t.title === taskToAdd.title && t.associatedDay === taskToAdd.associatedDay;
  });

  return isExisting;
};
