import React, { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { RxTextAlignBottom } from 'react-icons/rx';
import { useQuery } from 'react-query';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import brandService from '../../../shared/api/brandService';

interface Checkbox {
  name: string,
  checked: boolean,
}

const MyFiltersParam = withDefault(ArrayParam, []);

const BrandSection: FC = () => {

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([]);
  const [brands, setBrands] = useQueryParam('brands', MyFiltersParam);

  const { error, isLoading } = useQuery(
    'getBrands',
    () => brandService.getAllBrands(),
    {
      onSuccess: data => {
        setCheckboxes(data.data.map(option => {
          let checked;
          if ((brands as string[]).includes(option.name)) {
            checked = true
          } else {
            checked = false
          };
          return {name: option.name, checked}
        }))
      },
    }
  );
  

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const newCheckboxes = checkboxes.map(checkbox => {
      if (checkbox.name === e.target.name) {
        return {...checkbox, checked: !checkbox.checked}
      }
      return checkbox
    });
    setCheckboxes(newCheckboxes);
    setBrands(newCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name));
  }

  return (
    <div 
      className='filter-panel'  
    >
      <div 
        className='filter-name'
      >
        <h3>
          Brands
        </h3>
        <button>
          <RxTextAlignBottom size={20} />
        </button>
      </div>
      <div className='options-container' >
        {checkboxes.map((checkbox, index) => 
          <div key={index} className='option'>
            <label htmlFor={checkbox.name}>
              <input 
                checked={checkbox.checked} 
                name={checkbox.name} 
                type="checkbox" 
                onChange={(e) => handleChange(e)}
              />
              {checkbox.name}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandSection;


// export const useFilterByAuthor = () => {
//   const [authors, setParam] = useQueryParam(
//       "authors",
//       withDefault(DelimitedNumericArrayParam, []),
//   );

//   // Реализуем отдельно, т.к. нужно скрывать параметр из URL
//   const setAuthors: typeof setParam = (value) => {
//       setParam(value?.length ? value : undefined);
//   };

//   // FIXME: types
//   return { authors: authors as number[], setAuthors };
// };