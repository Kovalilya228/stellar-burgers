import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice/ingredientsSlice';
import constructorSlice from './slices/constructorSlice/constructorSlice';
import feedsSlice from './slices/feedsSlice/feedsSlice';
import profileSlice from './slices/profileSlice/profileSlice';
import ordersSlice from './slices/ordersSlice/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  profile: profileSlice,
  feeds: feedsSlice,
  orders: ordersSlice
});
