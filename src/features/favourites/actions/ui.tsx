import React, { FC } from 'react';
import { Product } from '../../../entities/product/model';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { addFavourite, deleteFavourite } from '../../../entities/favourite/model';
import favouriteService from '../../../shared/api/favouriteService';

const useIsFavourite = (product: Product): boolean => {
  const { products, loading, error } = useAppSelector(state => state.favourites);

  const candidate = products.find(candidate => candidate.id === product.id);
  if (candidate) {
    return true
  }
  return false
}

interface FavouriteActionProps {
  product: Product,
}

export const ToggleFavourite: FC<FavouriteActionProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const isFavourite = useIsFavourite(product);
  
  return (
    <>
      {isFavourite ? (
        <button 
          style={{color: 'red'}}
          onClick={() => {
            dispatch(deleteFavourite(product));
            favouriteService.deleteFavourite(product.id);
          }}
        >
          <AiFillHeart size={35} />
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(addFavourite(product));
            favouriteService.addFavourite(product.id);
          }}
        >
          <AiOutlineHeart size={35} />
        </button>
      )}
    </>
  )
}