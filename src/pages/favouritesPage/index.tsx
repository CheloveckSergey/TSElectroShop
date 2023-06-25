import React, { FC } from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import Header from '../../widgets/header';
import FavouriteList from './favouriteList';

const FavouritesPage: FC = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main'>
        <Header 
          title='Favourites' 
          text='Here you can see your most favourite products!'
        />
        <FavouriteList />
      </div>
      <Righter />
    </div>
  );
}

export default FavouritesPage;
