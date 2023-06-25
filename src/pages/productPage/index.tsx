import React, { FC } from 'react';
import Header from './header';
import ProductDesc from './productDesc';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import './styles.scss';

const ProductPage: FC = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main product-page-main'>
        <div className='product-page-container'>
          <Header />
          <ProductDesc />
        </div>
      </div>
      <Righter />
    </div>
  );
}

export default ProductPage;
