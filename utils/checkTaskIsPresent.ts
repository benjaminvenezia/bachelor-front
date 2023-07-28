import { DefaultTask } from "../types/DefaultTask";

/**
 * Check if a task object is present in an array of tasks objects.
 * @param arrayToCheck An array who contains tasks objects.
 * @param taskToAdd    The task we want check before add it.
 * @returns true if the task is present.
 */
export const checkTaskIsPresent = (
  arrayToCheck: DefaultTask[],
  taskToAdd: DefaultTask,
): boolean => {
  return arrayToCheck.some(
    (t: DefaultTask) =>
      t.title === taskToAdd.title &&
      t.associated_day === taskToAdd.associated_day,
  );
};
