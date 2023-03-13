import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";

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
};

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */
export type GageTask = {
  id: number;
  title: string;
  description: string;
  cost: number;
  category: string;
};

export type Gages = {
  gages: Gage[];
  gagesTask: GageTask[];
  gagesTaskFiltered: any;
};

const initialState: Gages = {
  gages: [],
  gagesTask: [
    {
      id: 1,
      title: "Nettoyer la chambre",
      description: "Nettoyer la chambre et s'y appliquer!",
      cost: 200,
      category: CATEGORIES.ROOM,
    },
    {
      id: 2,
      title: "Passer l'aspirateur",
      description: "Passer l'aspirateur dans la chambre",
      cost: 150,
      category: CATEGORIES.ROOM,
    },
    {
      id: 3,
      title: "Laver les vitres",
      description: "Nettoyer les vitres de la cuisine",
      cost: 20,
      category: CATEGORIES.KITCHEN,
    },
    {
      id: 4,
      title: "Faire la lessive",
      description: "Laver toutes les machines de linge",
      cost: 5,
      category: CATEGORIES.ROOM,
    },
  ],
  gagesTaskFiltered: [],
};

const initialStateOfGagesTaskFiltered = () => {
  const category = CATEGORIES.KITCHEN;
  const filteredGagesTask = initialState.gagesTask.filter((gageTask) => gageTask.category === category);
  initialState.gagesTaskFiltered = filteredGagesTask;
};
initialStateOfGagesTaskFiltered();

const gagesSlice = createSlice({
  name: "gages",
  initialState: initialState,
  reducers: {
    addGage: (state, action) => {
      state.gages.push(action.payload);
    },
    /** Used in GageScreen to dynamically update the gageTask when user select a category. */
    filterGageTask: (state, action) => {
      state.gagesTaskFiltered = state.gagesTask.filter((item) => item.category === action.payload.category);
    },
  },
});

export const { addGage, filterGageTask } = gagesSlice.actions;
export default gagesSlice.reducer;
