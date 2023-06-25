import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import categoryService from '../../../shared/api/categoryService';
import './styles.scss';

const AddCategoryPanel = () => {
  
  const {refetch} = useQuery(
    'addCategory',
    () => categoryService.addCategory(new FormData(ref.current)),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data);
      } ,
    }
  )

  const ref = useRef(null);

  return (
    <div className='add-brand-panel'>
      <form 
        ref={ref}
        onSubmit={(e) => e.preventDefault()}
      >
        <label for='name'>Enter the category's name</label>
        <input type="text" name='name' />
        <button
          onClick={() => refetch()}
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategoryPanel;