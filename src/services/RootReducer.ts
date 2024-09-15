import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';
import feedsSlice from './slices/feedsSlice';
import profileSlice from './slices/profileSlice';
import ordersSlice from './slices/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  profile: profileSlice,
  feeds: feedsSlice,
  orders: ordersSlice
});
