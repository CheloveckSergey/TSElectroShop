import React, { FC } from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import FilterBar from './filterBar';
import ProductList from './productList/index';
import Header from '../../widgets/header';

const CatalogPage: FC  = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main'>
        <Header 
          title='Catalog' 
          text='Here you can see all out products with filters' 
        />
        <FilterBar />
        <ProductList />
      </div>
      <Righter />
    </div>
  );
}

export default CatalogPage;
