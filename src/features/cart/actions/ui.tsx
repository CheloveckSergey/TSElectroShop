import React, { useContext, useState, FC } from 'react';
import { ProductContext } from '../../../shared/context/StoreProvider';
import { BsFillCartFill, BsCart } from 'react-icons/bs';
import { useNotes } from '../../../shared/customAlert/model/store';
import { Product } from '../../../entities/product/model';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { BiCartAdd } from 'react-icons/bi';
import { addProduct, deleteProduct, useProductStatus, deleteSingleProduct } from '../../../entities/cart/model';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const useToggleProduct = (product: Product) => {
  const { cart } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const productStatus = useProductStatus(product);

  const handleToggleProduct = (): void => {
    if (productStatus) {
      dispatch(deleteProduct(product))
    } else {
      dispatch(addProduct(product))
    }
  }

  return { handleToggleProduct, isInCart: productStatus }

  // const { toggleProduct, useProductStatus } = useContext(ProductContext);
  // const { isInBasket } = useProductStatus(product.id); 
  // const { showNote } = useNotes();

  // function handleToggleProduct() {
  //   const message = isInBasket ? 'Removed from basket' : 'Added to basket';
  //   toggleProduct(product);
  //   showNote(product.name, message);
  // }

  // return { handleToggleProduct, isInBasket }
}

interface ProductProps {
  product: Product
}

export const ToggleProductButton: FC<ProductProps> = ({ product }) => {
  const { handleToggleProduct, isInCart } = useToggleProduct(product)

  const Icon = isInCart ? BsFillCartFill : BsCart;

  return (
    <button onClick={() => handleToggleProduct()}>
      <Icon size={30} />
    </button>
  );
}

export const AddProductButton: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
 
  return (
    <button
      className='add-button'
      onClick={() => dispatch(addProduct(product))}
    >
      <BiCartAdd />
    </button>
  )
}

export const AddSingleProductButton: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(addProduct(product))}
    >
      <AiOutlinePlusCircle size={20} />
    </button>
  )
}

export const DeleteSingleProductButton: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(deleteSingleProduct(product));
      }}
    >
      <AiOutlineMinusCircle size={20} />
    </button>
  )
}

// export const AddProductButton: FC<ProductProps> = ({ product }) => {
//   const dispatch = useAppDispatch();
 
//   return (
//     <button
//       className='add-button'
//       onClick={() => dispatch(addProduct(product))}
//     >
//       <BiCartAdd />
//     </button>
//   )
// }