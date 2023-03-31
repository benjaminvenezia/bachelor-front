import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";
import { Category } from "../../types/Category";

type CategoriesState = {
  categories: Category[];
};

const initialState: CategoriesState = {
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
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
});

export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
