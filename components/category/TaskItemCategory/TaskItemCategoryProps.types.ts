import { Task } from "../../../types/Task";

export type TaskItemCategoryProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  category: string;
  /**
   * use state passé en props
   */
  setActivatedTasks?: any;
  activatedTasks: Task[];
  path_icon_todo: string;
  days: string[];
};
