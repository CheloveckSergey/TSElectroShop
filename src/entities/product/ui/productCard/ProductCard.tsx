import React, { useContext, FC } from 'react';
import {BiCartAdd} from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store';
import { Cart } from '../../../../features/cart';
import { addProduct, useProductStatus } from '../../../cart/model';
import { Product } from '../../model';
import './styles.scss';

interface FeatureProps {
  product: Product
}

interface ProductCardProps {
  product: Product,
  features: React.FC<FeatureProps>[]
}

const ProductCard: FC<ProductCardProps> = ({ product, features }) => {
  // const {addProduct, findProductByName} = useContext(ProductContext);

  // const addedProduct = findProductByName(product.name);

  const dispatch = useAppDispatch();

  const productStatus = useProductStatus(product);

  return (
    <div className='product-card'>
      <div className='upper-block'>
        <img src={product.img ? `http://localhost:5000/${product.img}` : 'https://www.b17.ru/foto/uploaded/upl_auto_1651487751_340608_1rjw.jpg'} alt="ProductCard" />
        <div className='rate-panel'>
          <div>Rating</div>
          <div>{product.rating}</div>
        </div>
        <div className='buy-panel'>
          {features.map((Feature, index) => (
            <Feature 
              product={product}
            />
          ))}
          {/* <Cart.Actions.ToggleProductButton product={product} />
          <Cart.Actions.AddProductButton product={product} /> */}
          {/* <button className='desc'>
            <NavLink style={{textDecoration: "none", color: 'inherit'}} to={`/product/${product.name}`}>
              <BsEyeFill />
            </NavLink>
          </button>       */}
        </div>
      </div>
      <div className='lower-block'>
        <h6>{product.brand}</h6>
        <NavLink style={{textDecoration: "none", color: 'inherit'}} to={`/product/${product.name}`}>
          <h3 className={productStatus ? 'added' : ''}>{product.name}</h3>
        </NavLink>
        {/* <h3 className={addedProduct && 'added'}>{product.name}</h3> */}
        <h6>{product.category}</h6>
      </div>
    </div>
  );
}

export default ProductCard;