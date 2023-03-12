import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";

export type Category = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export type GenericsTasksState = {
  categories: Category[];
  categoryGageSelection: string;
};

const initialState: GenericsTasksState = {
  categories: [
    {
      id: 1,
      title: "Cuisine",
      category: CATEGORIES.KITCHEN,
      description: "Toutes les tâches relatives à l'univers de la cuisine",
    },
    {
      id: 2,
      title: "Chambre",
      category: CATEGORIES.ROOM,
      description: "Un grand lit, la couverture en boule, on est bien dans la chambre.",
    },
    {
      id: 3,
      title: "Salle de bain",
      category: CATEGORIES.ROOM,
      description: "Test poulet  machin rigolo",
    },
  ],
  categoryGageSelection: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategoryGageSelection: (state, action) => {
      state.categoryGageSelection = action.payload.categoryTitle;
    },
  },
});

export const { setCategoryGageSelection } = categoriesSlice.actions;
export default categoriesSlice.reducer;
