import React, { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { RxTextAlignBottom } from 'react-icons/rx';
import { useQuery } from 'react-query';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { AxiosResponse } from 'axios';

interface Checkbox {
  name: string,
  checked: boolean,
}

interface Option {
  name: string,
  id: number,
}


const MyFiltersParam = withDefault(ArrayParam, []);

interface FilterSectionProps {
  name: string,
  queryName: string,
  queryService: () => any
}

const FilterSection: FC<FilterSectionProps> = ({ name, queryName, queryService }) => {

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([]);
  const [queryOptions, setQueryOptions] = useQueryParam(queryName, MyFiltersParam);

  const { error, isLoading } = useQuery(
    'get-' + name,
    () => queryService(),
    {
      onSuccess: (data: AxiosResponse<Option[]>) => {
        setCheckboxes(data.data.map(option => {
          let checked: boolean;
          if ((queryOptions as string[]).includes(option.name)) {
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
    setQueryOptions(newCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name));
  }

  return (
    <div 
      className='filter-panel'  
    >
      <div 
        className='filter-name'
      >
        <h3>
          {name}
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

export default FilterSection;
