import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: function (state) {
      return state.ingredients;
    },
    selectLoadingIngredients: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.ingredients = [];
        state.error = action.error?.message;
      })
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { selectIngredients, selectLoadingIngredients } =
  ingredientSlice.selectors;

export const ingredientReducer = ingredientSlice.reducer;
