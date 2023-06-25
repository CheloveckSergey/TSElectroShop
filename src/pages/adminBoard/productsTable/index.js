import React, {useEffect} from 'react';
import { useQuery } from 'react-query';
import productService from '../../../shared/api/productService';
import { FiEdit2 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const ProductsTable = () => {
  const {data, isLoading, error, refetch} = useQuery(
    'getAllProducts',
    productService.getAllProducts,
    {
      onSuccess: (data) => console.log(data)
    }
  );

  return (
    <div className='products-table'>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error...</p>
      ) : data ? (
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Image</th>
          </thead>
          <tbody>
            {data.data.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <img src={`http://localhost:5000/${product.img}`} alt="IMG" />
                </td>
                <td>
                  <button
                    className='edit-button'
                    style={{marginRight: '10px'}}
                  >
                    <NavLink to={`/product/${product.name}`}>
                      <FiEdit2 size={20} />
                    </NavLink>
                  </button>
                  <button
                    className='delete-button'
                    onClick={async () => {
                      console.log(product.name);
                      await productService.deleteProduct(product.name);
                      refetch();
                    }}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Что-то пошло не так :</p>
      )}
    </div>
  );
}

export default ProductsTable;