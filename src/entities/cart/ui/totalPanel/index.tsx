import React, { useState, FC } from 'react';
import { useAppSelector } from '../../../../app/store';
import { CartProduct } from '../../model';
import './styles.scss';

const TotalPanel: FC = () => {
  const [discount, setDiscount] = useState(10);
  const { cart } = useAppSelector(state => state.cart);

  function getTotalQty(cart: CartProduct[]) {
    const totalQty = cart.reduce((sum, curProduct) => {
      return sum + curProduct.qty 
    }, 0);
    return totalQty;
  }

  function getTotal(cart: CartProduct[]) {
    const total = cart.reduce((sum, curProduct) => {
      return sum + curProduct.qty * curProduct.price 
    }, 0);
    return total;
  }

  return (
    <div className='total-panel'>
      <table>
        <tbody>
          <tr>
            <td className='left-col'>Quantity</td>
            <td>{getTotalQty(cart)}</td>
          </tr>
          <tr>
            <td className='left-col'>Total</td>
            <td>{getTotal(cart)}$</td>
          </tr>
          <tr>
            <td className='left-col'>Discount</td>
            <td>-{discount}$</td>
          </tr>
          <tr>
            <td className='left-col total-row'>Total</td>
            <td className='total-row total'>{getTotal(cart) - discount}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TotalPanel;