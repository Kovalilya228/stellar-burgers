import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import feedsSlice from '../slices/feedsSlice';
import profileSlice from '../slices/profileSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  feeds: feedsSlice,
  profile: profileSlice
});
