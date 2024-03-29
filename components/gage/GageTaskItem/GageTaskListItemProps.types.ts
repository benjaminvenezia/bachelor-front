export type GageTaskItemProps = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  cost: number;
  category: string | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date_string: string | null;
  user_id?: string | null;
  user_points?: number | undefined;
  user_name?: string | undefined;
  key: number;
  children: any;
  isSelected: boolean;
};
