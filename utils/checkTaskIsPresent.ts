import { Task } from "../store/slices/allTasksSlice";

/**
 * Check if a task object is present in an array of tasks objects.
 * @param arrayToCheck An array who contains tasks objects.
 * @param taskToAdd    The task we want check before add it.
 * @returns true if the task is present.
 */
export const checkTaskIsPresent = (arrayToCheck: Task[], taskToAdd: Task): boolean => {
  let isExisting = false;

  arrayToCheck.some((t: Task) => {
    isExisting = t.title === taskToAdd.title && t.associatedDay === taskToAdd.associatedDay;
  });

  return isExisting;
};
