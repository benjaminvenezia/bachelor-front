/**
 * Gage is the ultimate object who is stored in database.
 */
export type Gage = {
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
  user_id?: string;
  user_name?: string;
  user_points?: number;
};
