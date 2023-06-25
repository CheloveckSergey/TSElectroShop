import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import userService from "../../../shared/api/userService";
import { AxiosError } from "axios";


export interface UserData {
  id: number,
  login: string,
  avatar: string,
  roleID: number,
  accessToken: string,
}

export interface User {
  id: number | undefined,
  login: string | undefined,
  avatar: string | undefined,
  roleID: number | undefined,
}

export interface MyRejectValue {
  message: string | undefined,
  status: number | undefined,
}

export interface UserState {
  user: User | undefined,
  loading: boolean,
  error: MyRejectValue | undefined,
}

const initialState: UserState = {
  user: undefined,
  loading: false,
  error: undefined,
}


export const registerThunk = createAsyncThunk<
  UserData, 
  {username: string, password: string},
  {rejectValue: MyRejectValue}
>(
  'auth/register',
  async ({username, password}, thunkAPI) => {
    console.log('РЕИСТЕРСАНК');
    try {
      const response = await userService.registration(username, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<string>;
      return thunkAPI.rejectWithValue({ message: err.response?.data, status: err.response?.status });
    }
  }
);

export const loginThunk = createAsyncThunk<
  UserData, 
  {username: string, password: string},
  {rejectValue: MyRejectValue}
>(
  'auth/login',
  async ({username, password}, thunkAPI) => {
    console.log('ЛОГИНСАНК');
    try {
      console.log('ЮЗЕРНЕЙМ: ' + username);
      const response = await userService.login(username, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<string>;
      return thunkAPI.rejectWithValue({ message: err.response?.data, status: err.response?.status });
    }
  }
);

export const refreshThunk = createAsyncThunk<
  UserData, 
  {},
  {rejectValue: MyRejectValue}
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    console.log('РЕФРЕШСАНК');
    try {
      const response = await userService.refresh();
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<string>;
      return thunkAPI.rejectWithValue({ message: err.response?.data, status: err.response?.status });
    }
  }
);

export const logoutThunk = createAsyncThunk<
  UserData, 
  {},
  {rejectValue: MyRejectValue}
>(
  'auth/logout',
  async (_, thunkAPI) => {
    console.log('ЛОГАУТСАНК');
    try {
      const response = await userService.logout();
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      const err = error as AxiosError<string>;
      return thunkAPI.rejectWithValue({ message: err.response?.data, status: err.response?.status });
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(registerThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(refreshThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(logoutThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});