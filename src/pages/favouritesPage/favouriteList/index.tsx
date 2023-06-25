import React, { FC, useEffect } from 'react';
import ProductList from '../../../widgets/productList';
import { useQuery } from 'react-query';
import favouriteService from '../../../shared/api/favouriteService';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { loadFavourites } from '../../../entities/favourite/model';

const FavouriteList: FC = () => {
  const { products, loading, error } = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadFavourites({}));
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : !products ? (
        <div>Something went wrong</div>
      ) : (
        <ProductList
          products={products}
        />
      )}
    </>
  )

  // const { data, isLoading, error } = useQuery(
  //   'getAllFavourites',
  //   () => favouriteService.getAll(),
  // )

  // return (
  //   <>
  //     {isLoading ? (
  //       <div>Loading...</div>
  //     ) : error ? (
  //       <div>Error</div>
  //     ) : !data ? (
  //       <div>Something went wrong</div>
  //     ) : (
  //       <ProductList
  //         products={data.data}
  //       />
  //     )}

  //   </>
  // )
}

export default FavouriteList;