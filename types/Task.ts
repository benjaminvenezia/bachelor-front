export type Task = {
  id: string;
  title: string;
  category: string;
  description: string;
  reward: number;
  is_done: boolean;
  associated_day: string;
  path_icon_todo: string;
};
