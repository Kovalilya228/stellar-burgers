import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';

interface FeedsInitialState {
  orders: TOrder[];
  fetchFeedsPending: boolean;
  total: number;
  totalToday: number;
}

export const feedsInitialState: FeedsInitialState = {
  orders: [],
  fetchFeedsPending: false,
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: feedsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.fetchFeedsPending = true;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.fetchFeedsPending = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.fetchFeedsPending = false;
        console.log(action.payload);
      });
  }
});

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async (_, thunkApi) => {
    try {
      const res = await getFeedsApi();
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export default feedsSlice.reducer;
export const feedsActions = feedsSlice.actions;
