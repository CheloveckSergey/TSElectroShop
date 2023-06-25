import React, { FC, ReactNode } from 'react';
import { GrClose } from 'react-icons/gr';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import './styles.scss';
import { CartProduct, deleteProduct } from '../../model';
import { useAppDispatch } from '../../../../app/store';

interface ProductCheckProps {
  product: CartProduct,
  actions: {
    deleteSingleProduct: ReactNode,
    addSingleProduct: ReactNode,
  }
}

const ProductCheck: FC<ProductCheckProps> = ({ product, actions }) => {
  const dispatch = useAppDispatch()

  const URL: string = 'http://localhost:5000/';

  return (
    <div className='product-check'>
      <div className='something'>
        <img src={URL + product.img} alt="IMG" />
        <div className='fuck'>
          <h4>Name</h4>
          <h3 className='name'>{product.name}</h3>
          <h4>ID: {product.id}</h4>
        </div>
        <div>
          <h4>Price</h4>
          <h3>{product.price}$</h3>
        </div>
      </div>
      <div className='something'>
        <div className='cock'>
          <h4>Quantity</h4>
          <div className='qty'>
            {actions.deleteSingleProduct}
            <h3>{product.qty}</h3>
            {actions.addSingleProduct}
          </div>
        </div>
        <div className='fuck'>
          <h4>Cost</h4>
          <h3>{product.price * product.qty}$</h3>
        </div>
      </div>
      <button
        className='close-button'
        onClick={() => dispatch(deleteProduct(product))}
      >
        <GrClose size={20} />
      </button>
    </div>
  );
}

export default ProductCheck;