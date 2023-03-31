import { SetStateAction } from "react";

export type GageTaskDropdownItemProps = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  cost: number;
  category: string | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date_string: string;
  user_id?: string | null;
  user_points?: number | undefined;
  user_name?: string | undefined;
  key: number;
  children: any;
  isSelected: boolean;
};
