import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
