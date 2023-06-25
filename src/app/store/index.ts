import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { cartSlice } from "../../entities/cart/model";
import { userSlice } from "../../entities/user/model";
import { favouriteSlice } from "../../entities/favourite/model";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    favourites: favouriteSlice.reducer,
  }
})

export const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  favourites: favouriteSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;