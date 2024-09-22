import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './RootReducer';

describe('rootReducer', () => {
  it('should initialize the root state correctly', () => {
    const store = configureStore({
      reducer: rootReducer,
    });
    const state = store.getState();

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        fetchIngredientsPending: false
      },
      burgerConstructor: {
        constructorItems: {
          bun: {
            price: 0,
            _id: ''
          },
          ingredients: []
        },
        orderModalData: null,
        orderIngredients: []
      },
      profile: {
        data: null,
        fetchProfilePending: false,
        error: '',
        isLogin: false,
        email: '',
        name: '',
        message: '',
        isEmailForResetSent: false
      },
      feeds: {
        orders: [],
        fetchFeedsPending: false,
        total: 0,
        totalToday: 0
      },
      orders: {
        orders: [],
        fetchOrdersPending: false,
        orderByNumber: null,
        orderBurger: null,
        orderRequest: false
      }
    });
  });
});