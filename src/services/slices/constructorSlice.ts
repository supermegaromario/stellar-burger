import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { RootState } from '../store';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid(), count: 1 }
      })
    },
    moveBurgerIngredient: (state, action) => {
      const { index, step } = action.payload;
      [state.ingredients[index], state.ingredients[index + step]] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    removeBurgerIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (ingredientIndex !== -1) {
        const ingredient = state.ingredients[ingredientIndex];
        if (ingredient.count > 1) {
          ingredient.count -= 1;
        } else {
          state.ingredients.splice(ingredientIndex, 1);
        }
      }
    },
    resetBurgerIngredient: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const selectIngredientCount = (state: RootState, id: string) => {
  if (state.burgerConstructor.bun?._id === id) {
    return 1;
  }
  return state.burgerConstructor.ingredients.filter((item) => item._id === id)
    .length;
};

export const {
  addBurgerIngredient,
  moveBurgerIngredient,
  removeBurgerIngredient,
  resetBurgerIngredient
} = burgerConstructorSlice.actions;

export const selectBurgerIngredients = (state: RootState) =>
  state.burgerConstructor;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
