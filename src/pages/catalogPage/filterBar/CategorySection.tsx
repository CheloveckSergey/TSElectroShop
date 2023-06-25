import React, { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { RxTextAlignBottom } from 'react-icons/rx';
import { useQuery } from 'react-query';
import { ArrayParam, useQueryParam } from 'use-query-params';
import categoryService from '../../../shared/api/categoryService';


interface Checkbox {
  name: string,
  checked: boolean,
}


const CategorySection: FC = () => {

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([]);
  const [categories, setCategories] = useQueryParam('categories', ArrayParam);

  const { error, isLoading } = useQuery(
    'getCategories',
    () => categoryService.getAllCategories(),
    {
      onSuccess: data => {
        setCheckboxes(data.data.map((option) => ({name: option.name, checked: false})))
      },
    }
  );
  

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newCheckboxes = checkboxes.map(checkbox => {
      if (checkbox.name === e.target.name) {
        return {...checkbox, checked: !checkbox.checked}
      }
      return checkbox
    });
    setCheckboxes(newCheckboxes);
    setCategories(newCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name));
    // setOptions(newCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name));
  }

  // function useBrandFilter() {
  //   const [brands, setBrands] = useQueryParam('brands', ArrayParam);
  //   return {brands, setBrands};
  // }

  return (
    <div 
      className='filter-panel'  
    >
      <div 
        className='filter-name'
      >
        <h3>
          Categories
        </h3>
        <button>
          <RxTextAlignBottom size={20} />
        </button>
      </div>
      <div className='options-container' >
        {checkboxes.map((checkbox, index) => 
          <div key={index} className='option'>
            <label htmlFor={checkbox.name}>
              <input checked={checkbox.checked} name={checkbox.name} type="checkbox" onChange={(e) => handleChange(e)}/>
              {checkbox.name}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySection;