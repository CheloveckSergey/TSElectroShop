import React, { FC } from 'react';
import './styles.scss';
import { useAppSelector } from '../../../app/store';
import ProductCheck from '../../../entities/cart/ui/productCheck';
import { Cart } from '../../../features/cart';

// interface ProductCheckProps {
//   product: CartProduct
// }

// const ProductCheck: FC<ProductCheckProps> = ({ product }) => {

//   const URL: string = 'http://localhost:5000/';

//   return (
//     <div className='product-check'>
//       <div className='something'>
//         <img src={URL + product.img} alt="IMG" />
//         <div className='fuck'>
//           <h4>Name</h4>
//           <h3 className='name'>{product.name}</h3>
//           <h4>ID: {product.id}</h4>
//         </div>
//         <div>
//           <h4>Price</h4>
//           <h3>{product.price}$</h3>
//         </div>
//       </div>
//       <div className='something'>
//         <div className='cock'>
//           <h4>Quantity</h4>
//           <div className='qty'>
//             <button
//               onClick={() => {}}
//             >
//               <AiOutlineMinusCircle size={20} />
//             </button>
//             <h3>{product.qty}</h3>
//             <button
//               onClick={() => {}}
//             >
//               <AiOutlinePlusCircle size={20} />
//             </button>
//           </div>
//         </div>
//         <div className='fuck'>
//           <h4>Cost</h4>
//           <h3>{product.price * product.qty}$</h3>
//         </div>
//       </div>
//       <button
//         className='close-button'
//         onClick={() => {}}
//       >
//         <GrClose size={20} />
//       </button>
//     </div>
//   );
// }


const BasketProducts: FC = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className='basket-page'>
      {
        cart.map((product, index) => 
          <ProductCheck 
            key={index}
            product={product} 
            actions={{
              deleteSingleProduct: <Cart.Actions.DeleteSingleProductButton product={product} />,
              addSingleProduct: <Cart.Actions.AddSingleProductButton product={product} />
            }}
          />
        )
      }
    </div>
  );
}

export default BasketProducts;

// const ProductCheck = ({ product, deleteProduct, deleteSingleProduct, addProduct }) => {

//   const URL = 'http://localhost:5000/';

//   return (
//     <div className='product-check'>
//       <div className='something'>
//         <img src={URL + product.img} alt="IMG" />
//         <div className='fuck'>
//           <h4>Name</h4>
//           <h3 className='name'>{product.name}</h3>
//           <h4>ID: {product.id}</h4>
//         </div>
//         <div>
//           <h4>Price</h4>
//           <h3>{product.price}$</h3>
//         </div>
//       </div>
//       <div className='something'>
//         <div className='cock'>
//           <h4>Quantity</h4>
//           <div className='qty'>
//             <button
//               onClick={() => deleteSingleProduct(product)}
//             >
//               <AiOutlineMinusCircle size={20} />
//             </button>
//             <h3>{product.qty}</h3>
//             <button
//               onClick={() => addProduct(product)}
//             >
//               <AiOutlinePlusCircle size={20} />
//             </button>
//           </div>
//         </div>
//         <div className='fuck'>
//           <h4>Cost</h4>
//           <h3>{product.price * product.qty}$</h3>
//         </div>
//       </div>
//       <button
//         className='close-button'
//         onClick={() => deleteProduct(product)}
//       >
//         <GrClose size={20} />
//       </button>
//     </div>
//   );
// }


// const BasketProducts = () => {
//   const {addedProducts, deleteProduct, deleteSingleProduct, addProduct} = useContext(ProductContext);

//   return (
//     <div className='basket-page'>

//       {
//         addedProducts.map((product, index) => 
//           <ProductCheck 
//             key={index}
//             product={product} 
//             deleteProduct={deleteProduct} 
//             deleteSingleProduct={deleteSingleProduct}
//             addProduct={addProduct}
//           />
//         )
//       }
//     </div>
//   );
// }

// export default BasketProducts;
