import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '../../../utils/types';

interface IngredientsInitialState {
  ingredients: TIngredient[];
  fetchIngredientsPending: boolean;
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    fetchIngredientsPending: false
  } as IngredientsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.fetchIngredientsPending = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.fetchIngredientsPending = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.fetchIngredientsPending = false;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try {
      const res = await getIngredientsApi();
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export default ingredientsSlice.reducer;
export const ingredientsActions = ingredientsSlice.actions;
