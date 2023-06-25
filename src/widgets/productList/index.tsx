import React, { FC } from "react";
import './styles.scss';
import { Product } from "../../entities/product/model";
import ProductCard from "../../entities/product/ui/productCard/ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {


  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} features={[

        ]} />
      ))}
    </div>
  )
}

export default ProductList;