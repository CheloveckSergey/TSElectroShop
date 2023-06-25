import React from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import AddBrandPanel from './addBrandPanel';
import AddCategoryPanel from './addCategoryPanel';
import AddProductPanel from './addProductPanel';
import ProductsTable from './productsTable';
import './styles.scss';
import SummaryPanel from './summaryPanel';

const BasketPage = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main admin-board-page'>
        <AddProductPanel />
        <AddBrandPanel />
        <AddCategoryPanel />
        <SummaryPanel />
        <ProductsTable />
      </div>
      <Righter />
    </div>
  );
}

export default BasketPage;
