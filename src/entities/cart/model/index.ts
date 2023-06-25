import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { useAppSelector } from "../../../app/store";
import { Product } from "../../product/model";

export interface CartProduct extends Product {
  qty: number,
}

interface State {
  cart: CartProduct[],
}

const initialState: State = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      if (state.cart.find(curProduct => curProduct.id === action.payload.id)) {
        state.cart = state.cart.map(curProduct => {
          if (curProduct.id === action.payload.id) {
            return { ...curProduct, qty: curProduct.qty + 1 }
          }
          return curProduct
        })
      } else {
        state.cart.push({ ...action.payload, qty: 1 })
      }
    },

    deleteProduct(state, action: PayloadAction<Product>) {
      state.cart = state.cart.filter(curProduct => curProduct.id !== action.payload.id);
    },

    deleteSingleProduct(state, action: PayloadAction<Product>) {
      state.cart = state.cart.filter(curProduct => {
        if (curProduct.id === action.payload.id) {
          if (curProduct.qty > 1) {
            return { ...curProduct, qty: curProduct.qty-- }
          } else if (curProduct.qty === 1) {
            return false
          }
        }
        return curProduct;
      });
    },
  }
})

export const { addProduct, deleteProduct, deleteSingleProduct } = cartSlice.actions;

export const useProductStatus = (product: Product): CartProduct | undefined => {
  const { cart } = useAppSelector(state => state.cart);
  const productInCart = cart.find(curProduct => curProduct.id === product.id);
  return productInCart ? productInCart : undefined;
}