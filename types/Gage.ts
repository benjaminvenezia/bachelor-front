/**
 * Gage is the ultimate object who is stored in database.
 */
export type Gage = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  cost: number;
  category: string;
  day: number;
  month: number;
  year: number;
  date_string: string;
  user_id?: string;
  user_name?: string;
  user_points?: number;
};
