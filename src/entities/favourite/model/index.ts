import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favouriteService from "../../../shared/api/favouriteService";
import { AxiosError } from "axios";

export interface Product {
  id: number,
  name: string,
  price: number,
  rating: number,
  createdAt: any,
  img: string,
  brandID: number,
  categoryID: number,
  brand: string,
  category: string,
}

interface FavouriteState {
  products: Product[],
  loading: boolean,
  error: string | undefined,
} 

const initialState: FavouriteState = {
  products: [],
  loading: false,
  error: undefined,
}

interface MyRejectValue {
  message: string | undefined,
  status: number | undefined,
}

export const loadFavourites = createAsyncThunk<
  Product[],
  {},
  {
    rejectValue: MyRejectValue,
  }
>(
  'favourite/load',
  async ({}, thunkAPI) => {
    try {
      const response = await favouriteService.getAll();
      return response.data
    } catch (error) {
      const err = error as AxiosError<string>;
      return thunkAPI.rejectWithValue({message: err.message, status: err.status});
    }
  }
);

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Product>) {
      const candidate = state.products.find(product => product.id === action.payload.id);
      if (!candidate) {
        state.products.push(action.payload)
      }
    },
    deleteFavourite(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(product => product.id !== action.payload.id);
    },
    setFavourites(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadFavourites.pending, (state, action) => {
        state.products = [];
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadFavourites.rejected, (state, action) => {
        state.products = [];
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(loadFavourites.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = undefined;
      })
  },
});

export const { addFavourite, deleteFavourite, setFavourites } = favouriteSlice.actions;