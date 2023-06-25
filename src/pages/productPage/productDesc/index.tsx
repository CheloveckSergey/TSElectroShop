import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../../shared/api/productService';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { ProductContext } from '../../../shared/context/StoreProvider';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import './styles.scss';
import { Product } from '../../../entities/product/model';
import { Cart } from '../../../features/cart';
import { useProductStatus } from '../../../entities/cart/model';

interface DescPanelProps {
  product: Product
}

const DescPanel: FC<DescPanelProps> = ({ product }) => {


  const URL = 'http://localhost:5000/';

  const productInCart = useProductStatus(product);

  // const addedProduct = findProductByName(product.name);

  // function handleDeleteClick() {
  //   if (!addedProduct) return;

  //   if (addedProduct.qty == 1) {
  //     deleteProduct(product);
  //     return;
  //   }

  //   deleteSingleProduct(product);
  // }

  // function handleAddClick() {
  //   addProduct(product)
  // }

  const navigate = useNavigate();

  return (
    <div className='desc-panel'>
      <img src={URL + product.img} alt="IMG" />
      <div className='right'>
        <button 
          className='close-button'
          onClick={() => navigate(-1)}
        >
          <IoMdClose size={30} />
        </button>
        <div className='base'>
          <h4>{product.category}</h4>
          <h1>{product.name}</h1>
          <h4>{product.brand}</h4>
          <table>
            <thead>
              <th>Quantity</th>
              <th>Price</th>
            </thead>
            <tbody>
              <tr key="0">
                <td>
                  <div className='qty'>
                    {/* <button
                      onClick={handleDeleteClick}
                    >
                      <AiOutlineMinusCircle size={20} />
                    </button> */}
                    <Cart.Actions.DeleteSingleProductButton product={product} />
                    <p>
                      {productInCart ? productInCart?.qty : 0 }
                    </p>
                    {/* <button
                      onClick={handleAddClick}
                    >
                      <AiOutlinePlusCircle size={20} />
                    </button> */}
                    <Cart.Actions.AddSingleProductButton product={product} />
                  </div>
                </td>
                <td>{product.price}$</td>
              </tr>
            </tbody>
          </table>
          <p>
            Here must be some description. 
            But I'm too lazy to make one more field in database. 
            That's why you're going to see the same text whatever product you choose.
          </p>
        </div>
      </div>
    </div>
  );
}


const ProductDesc: FC = () => {
  const { name } = useParams();

  const { data, isLoading, error } = useQuery(
    ['getProduct', name],
    () => productService.getProductByName(name as string)
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : data ? (
        <DescPanel product={data.data} />
      ) : (
        <p>Something went wrong</p>
      )} 
    </>
  );
}

export default ProductDesc;
