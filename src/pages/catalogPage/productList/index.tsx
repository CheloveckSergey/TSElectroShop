import React, { FC, useState, useEffect } from 'react';
import { ArrayParam, useQueryParam } from 'use-query-params';
import { useQuery } from 'react-query';
import ProductCard from '../../../entities/product/ui/productCard/ProductCard';
import productService from '../../../shared/api/productService';
import './styles.scss';
import Pagination from './Pagination';
import { Cart } from '../../../features/cart';
import { useAppDispatch } from '../../../app/store';
import { loadFavourites } from '../../../entities/favourite/model';
import { Favourites } from '../../../features/favourites';


const ProductList: FC = () => {
  const dispatch = useAppDispatch();

  const [curPageNumber, setCurPageNumber] = useState<number>(1);

  const [brandFilters, setBrands] = useQueryParam('brands', ArrayParam);
  const [categoryFilters, setCategories] = useQueryParam('categories', ArrayParam);

  const {data, isLoading, error, refetch} = useQuery(
    ['getProductsWithFilters', curPageNumber, brandFilters, categoryFilters],
    () => {
      return productService.getAllProductsWithFilter(
        categoryFilters as string[], 
        brandFilters as string[], 
        curPageNumber
      )
    }
  );

  useEffect(() => {
    dispatch(loadFavourites({}))
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error!!!</p>
  }

  if (!data?.data) {
    return <p>Bad data!!!</p>
  }
 
  return (
    <div className='catalog'>
      <div className='product-list'>
        {data?.data?.products.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product} 
            features={[
              Cart.Actions.ToggleProductButton,
              Cart.Actions.AddProductButton,
              Favourites.Actions.ToggleFavourite,
            ]}
          />
        ))}
      </div>
      {data?.data?.pageQty > 1 && 
        <Pagination 
          pageQty={data.data.pageQty} 
          curPageNumber={curPageNumber} 
          setCurPageNumber={setCurPageNumber} 
        />
      }
    </div>
  );
}

export default ProductList;
