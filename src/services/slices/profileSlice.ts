import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUserApi,
  registerUserApi,
  TRegisterData,
  TLoginData,
  loginUserApi,
  logoutApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';

interface ProfileInitialState {
  data: TUser | null;
  isLogin: boolean;
  fetchProfilePending: boolean;
  error: string | unknown;
  email: string;
  name: string;
  message: string;
  isEmailForResetSent: boolean;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    fetchProfilePending: false,
    error: '',
    isLogin: false,
    email: '',
    name: '',
    message: '',
    isEmailForResetSent: false
  } as ProfileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLogin = true;
        state.fetchProfilePending = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchLogin.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLogin = true;
        state.fetchProfilePending = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchLogout.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.data = null;
        state.isLogin = false;
        state.fetchProfilePending = false;
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchGetUser.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.fetchProfilePending = false;
        state.isLogin = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchUpdateUser.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.fetchProfilePending = false;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchForgotPassword.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isEmailForResetSent = true;
        state.fetchProfilePending = false;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchResetPassword.pending, (state) => {
        state.fetchProfilePending = true;
        state.error = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.isEmailForResetSent = false;
        state.fetchProfilePending = false;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.fetchProfilePending = false;
        state.error = action.payload;
        console.log(state.error);
      });
  }
});

export const fetchRegister = createAsyncThunk(
  'profile/fetchRegister',
  async (data: TRegisterData, thunkApi) => {
    try {
      const res = await registerUserApi(data);
      setCookie('accessToken', res.accessToken);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  async (data: TLoginData, thunkApi) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  async (data: { email: string }, thunkApi) => {
    try {
      const res = await forgotPasswordApi(data);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  async (data: { password: string; token: string }, thunkApi) => {
    try {
      const res = await resetPasswordApi(data);
      return res;
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  'profile/fetchGetUser',
  async (_, thunkApi) => {
    try {
      const res = await getUserApi();
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  async (data: Partial<TRegisterData>, thunkApi) => {
    try {
      const res = await updateUserApi(data);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  async (_, thunkApi) => {
    try {
      const res = await logoutApi();
      deleteCookie('accessToken');
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export default profileSlice.reducer;
export const profileActions = profileSlice.actions;
