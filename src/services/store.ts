import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientReducer } from './slices/ingredientSlice';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { feedsReducer } from './slices/feedSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: orderReducer,
  user: userReducer,
  feeds: feedsReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
