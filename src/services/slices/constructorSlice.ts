import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

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

const constructorInitialState: IConstructorInitialState = {
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
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
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
    }
  }
});

export const constructorActions = constructorSlice.actions;

export default constructorSlice.reducer;
