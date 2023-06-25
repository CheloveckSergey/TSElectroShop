import React, { useContext } from 'react';
import { ProductContext } from '../../../shared/context/StoreProvider';
import BasketPanel from '../../../entities/cart/ui/basketPanel';
import TotalPanel from '../../../entities/cart/ui/totalPanel';
import './styles.scss';
import { useAppSelector } from '../../../app/store';

const Righter = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className='right-panel'>
      <BasketPanel />
      {cart.length > 0 && (
        <div>
          <TotalPanel />
          <div className='checkout'>
            CHECKOUT
          </div>
        </div>
      )}      
    </div>
  );
}

export default Righter;
