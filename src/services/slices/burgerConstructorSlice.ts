import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

interface BurgerConstructorInitialState {
  error: string | unknown;
  bunsForBurger: TIngredient[];
  ingredientsForBurger: TIngredient[];
  ingredientsForOrder: TIngredient['name'][];
  order: TOrder | null;
  isLoading: boolean;
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    error: '',
    bunsForBurger: [],
    ingredientsForBurger: [],
    ingredientsForOrder: [],
    order: null,
    isLoading: false
  } as BurgerConstructorInitialState,
  reducers: {
    setBunsForBurger(state, action: PayloadAction<TIngredient>) {
      state.bunsForBurger = [action.payload];
    },
    addIngredientForBurger(state, action: PayloadAction<TIngredient>) {
      state.ingredientsForBurger = [
        action.payload,
        ...state.ingredientsForBurger
      ];
    },
    removeIngredientForBurger(state, action: PayloadAction<number>) {
      state.ingredientsForBurger = state.ingredientsForBurger.filter(
        (_, index) => index !== action.payload
      );
    },
    sortIngredients(state, action) {
      const newArr = state.ingredientsForBurger.filter(
        (item, index) => index !== action.payload.ingredientDrop.index
      );
      const arrStart = newArr.slice(0, action.payload.index);
      const arrEnd = newArr.slice(action.payload.index);
      state.ingredientsForBurger = [
        ...arrStart,
        action.payload.ingredientDrop.item,
        ...arrEnd
      ];
    },
    setIngredientsForOrder(state) {
      const bunID = state.bunsForBurger.map((item) => item._id);
      const ingredientID = state.ingredientsForBurger.map((item) => item._id);
      state.ingredientsForOrder = [...bunID, ...ingredientID, ...bunID];
    },
    clearBurgerConstructor(state) {
      state.bunsForBurger = [];
      state.ingredientsForBurger = [];
    },
    setOrder(state, action: PayloadAction<null | TOrder>) {
      state.order = action.payload;
    },
    clearErrorMessage(state) {
      state.error = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        console.log(state.error);
      });
  }
});

export const orderBurgerThunk = createAsyncThunk(
  'order/makeOrder',
  async (order: TIngredient['name'][], thunkApi) => {
    try {
      const res = await orderBurgerApi(order);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
export default burgerConstructorSlice.reducer;
export const burgerConstructorActions = burgerConstructorSlice.actions;
