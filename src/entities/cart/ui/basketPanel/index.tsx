import React, { FC } from 'react';
import { SlBasket } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../app/store';
import './styles.scss';

const BasketPanel: FC = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className='basket-panel'>
      <NavLink to='/basket' className='basket' style={{textDecoration: 'none', color: 'inherit'}}>
        <SlBasket size={35} />
        {cart.length > 0 && (
          <div className='qty'>
            {cart.length}
          </div>
        )}
      </NavLink>
    </div>
  );
}

export default BasketPanel;