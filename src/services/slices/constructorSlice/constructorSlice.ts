import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../../../utils/types';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorInitialState {
  constructorItems: {
    bun: {
      price: number;
      _id: string;
    };
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  orderIngredients: string[];
}

export const constructorInitialState: IConstructorInitialState = {
  constructorItems: {
    bun: {
      price: 0,
      _id: ''
    },
    ingredients: []
  },
  orderModalData: null,
  orderIngredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: constructorInitialState,
  reducers: {
    setBuns(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredientForBurger(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    clearBurgerConstructor(state) {
      state.constructorItems.bun = { price: 0, _id: '' };
      state.constructorItems.ingredients = [];
    },
    setOrderModalData(state, action: PayloadAction<null | TOrder>) {
      state.orderModalData = action.payload;
    },
    setOrderIngredients(state) {
      const bunId = [state.constructorItems.bun._id];
      const ingredientId = state.constructorItems.ingredients.map(
        (item) => item._id
      );
      state.orderIngredients = [...bunId, ...ingredientId, ...bunId];
    },
    sortIngredients(state, action) {
      const newArr = state.constructorItems.ingredients.filter(
        (item, index) => index !== action.payload.ingredientDrop.index
      );
      const arrStart = newArr.slice(0, action.payload.index);
      const arrEnd = newArr.slice(action.payload.index);
      state.constructorItems.ingredients = [
        ...arrStart,
        action.payload.ingredientDrop.item,
        ...arrEnd
      ];
    }
  }
});

export const constructorActions = constructorSlice.actions;

export default constructorSlice.reducer;
