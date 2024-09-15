import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getOrdersApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrdersInitialState {
  orders: TOrder[];
  fetchOrdersPending: boolean;
  orderByNumber: TOrder | null;
  orderBurger: {
    order: TOrder;
    name: string;
  } | null;
  orderRequest: boolean;
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    fetchOrdersPending: false,
    orderByNumber: null,
    orderBurger: null,
    orderRequest: false
  } as OrdersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchOrdersPending = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.fetchOrdersPending = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchOrdersPending = false;
        console.log(action.payload);
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.fetchOrdersPending = true;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<{ orders: TOrder[] }>) => {
          state.fetchOrdersPending = false;
          state.orderByNumber = action.payload.orders[0];
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.fetchOrdersPending = false;
        console.log(action.payload);
      })

      .addCase(fetchOrderBurger.pending, (state) => {
        state.fetchOrdersPending = true;
        state.orderRequest = true;
      })
      .addCase(
        fetchOrderBurger.fulfilled,
        (state, action: PayloadAction<{ order: TOrder; name: string }>) => {
          state.fetchOrdersPending = false;
          state.orderBurger = action.payload;
        }
      )
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.fetchOrdersPending = false;
        state.orderRequest = false;
        console.log(action.payload);
      });
  }
});

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkApi) => {
    try {
      const res = await getOrdersApi();
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number, thunkApi) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchOrderBurger = createAsyncThunk(
  'orders/fetchOrderBurger',
  async (data: string[], thunkApi) => {
    try {
      const res = await orderBurgerApi(data);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export default ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;
