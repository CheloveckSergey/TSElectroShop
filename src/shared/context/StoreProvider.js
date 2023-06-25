import React, { createContext, useState } from 'react';
import LSService from './LSService';

export const ProductContext = createContext();

const StoreProvider = ({ children }) => {
  const [addedProducts, setAddedProducts] = useState(LSService.getProductsFromLS());


  function useProductStatus(id) {
    const product = findProductById(id);
    return { isInBasket: product ? true : false }
  }


  function addProduct(product) {
    if (addedProducts.find(curProduct => product.id === curProduct.id)) {
      const newAddedProducts = addedProducts.map(curProduct => {
        if (curProduct.id === product.id) {
          return {...curProduct, qty: curProduct.qty + 1}
        }
        return curProduct;
      });
      setAddedProducts(newAddedProducts);
      LSService.setProductsIntoLS(newAddedProducts);
      return
    }
    setAddedProducts([...addedProducts, {...product, qty: 1}]);
    LSService.setProductsIntoLS([...addedProducts, {...product, qty: 1}]);
  }


  function deleteProduct(product) {
    const newAddedProducts = addedProducts.filter((curProduct) => {
      return curProduct.id !== product.id
    });
    setAddedProducts(newAddedProducts);
    LSService.setProductsIntoLS(newAddedProducts);
  }


  function deleteSingleProduct(product) {
    if (product.qty === 1) {
      return
    }

    const newAddedProducts = addedProducts.map(curProduct => {
      if (curProduct.id === product.id) {
        return {...curProduct, qty: curProduct.qty - 1}
      }
      return curProduct;
    });
    setAddedProducts(newAddedProducts);
    LSService.setProductsIntoLS(newAddedProducts);
    return
  }


  function findProductByName(name) {
    const product = addedProducts.find((product) => product.name === name);
    return product;
  }


  function findProductById(id) {
    const product = addedProducts.find(product => product.id === id);
    return product
  }


  function _isInBasket(id) {
    const product = findProductById(id);
    return product ? true : false;
  }


  function toggleProduct(product) {
    if (_isInBasket(product.id)) {
      deleteProduct(product)
    } else {
      addProduct(product)
    }
  }


  return (
    <ProductContext.Provider 
      value={{
        addedProducts,
        addProduct,
        deleteProduct,
        deleteSingleProduct,
        findProductByName,
        toggleProduct,
        _isInBasket,
        useProductStatus
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default StoreProvider;
