import React, { FC } from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import BasketProducts from './basketProducts';
import Header from './header';

const BasketPage: FC = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main'>
        <Header />
        <BasketProducts />
      </div>
      <Righter />
    </div>
  );
}

export default BasketPage;

// const BasketProducts: FC = () => {
//   return (
//     <div>
//       asdfsadf
//     </div>
//   )
// }
