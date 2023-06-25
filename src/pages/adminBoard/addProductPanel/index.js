import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import brandService from '../../../shared/api/brandService';
import categoryService from '../../../shared/api/categoryService';
import productService from '../../../shared/api/productService';
import './styles.scss';

const AddProductPanel = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Others');
  const [brand, setBrand] = useState('noname');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);

  const [brands, setBrands] = useState([]);

  const {} = useQuery(
    'getAllBrands',
    () => brandService.getAllBrands(),
    {
      onSuccess: (data) => {
        setBrands(data.data)
        if (data.data.length > 0) {
          setBrand(data.data[0].name)
        }
      },
    }
  );

  const [categories, setCategories] = useState([]);

  const {} = useQuery(
    'getAllCategories',
    () => categoryService.getAllCategories(),
    {
      onSuccess: (data) => {
        setCategories(data.data);
        if (data.data.length > 0) {
          setCategory(data.data[0].name)
        }
      },
    }
  )


  const ref = useRef(null);

  const {data, isLoading, error, refetch} = useQuery(
    ['addProduct', name], 
    () => productService.addProductProbe(new FormData(ref.current)),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data);
      } 
    }
  );

  const defaultImg = 'http://localhost:5000/0e2cd675e52cacec70523aaf9a0ad8c5.jpg';

  return (
    <div className='add-product-panel'>
      <form ref={ref} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='name'>Enter product name</label><br/>
        <input 
          type="text" 
          name='name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <label htmlFor='category'>Choose category</label><br/>
        <select 
          name='category'
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.length > 0 ? categories.map((category, index) =>
            <option value={category.name} key={index}>{category.name}</option>
          ) : (
            <option value="Others" key={0}>Others</option>
          )}
        </select>
        <br/>
        <label htmlFor='brand'>Choose brand</label><br/>
        <select 
          name='brand'
          value={brand} 
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.length > 0 ? brands.map((brand, index) =>
            <option value={brand.name} key={index}>{brand.name}</option>
          ) : (
            <option value="noname" key={0}>Noname</option>
          )}
        </select>
        <br/>
        <label htmlFor='price'>Enter price</label><br/>
        <input 
          type="text" 
          name='price'
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
        /><br/>
        <label htmlFor='img'>Add Image</label>
        <input 
          type="file" 
          name='img' 
          onChange={(e) => {
            const fileReader = new FileReader();
            fileReader.onload = function() {
              setImg(fileReader.result);
            }
            fileReader.readAsDataURL(e.target.files[0]);
          }}
        />
        <br/>
        <button
          onClick={() => refetch()}
        >
          Добавить продукт
        </button>
      </form>
      <img src={`${img ? img : defaultImg}`} alt="IMG" />
    </div>
  );
}

export default AddProductPanel;
