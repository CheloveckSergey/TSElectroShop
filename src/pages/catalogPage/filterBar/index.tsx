import React, {FC} from 'react';
import BrandSection from './BrandSection';
import CategorySection from './CategorySection';
import './styles.scss';
import FilterSection from './FilterSection';
import brandService from '../../../shared/api/brandService';
import categoryService from '../../../shared/api/categoryService';



const FilterBar: FC = () => {
  return (
    <div className='filter-section'>
      <FilterSection name='Brands' queryName='brands' queryService={brandService.getAllBrands} />
      <FilterSection name='Categories' queryName='categories' queryService={categoryService.getAllCategories} />
      {/* <BrandSection />
      <CategorySection /> */}
    </div>
  );
}

export default FilterBar;