import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import BasketPage from './basketPage';
import CatalogPage from './catalogPage';
import HomePage from './homePage/index';
import ProductPage from './productPage';
import AdminBoard from './adminBoard';
import './styles.scss';
import AuthPage from './authPage';
import UserSettings from './userSettings';
import { UserContext } from '../shared/userContext';
import { useAppSelector } from '../app/store';
import FavouritesPage from './favouritesPage';

const Routing = () => {
  const { user } = useAppSelector(state => state.user);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/catalog' element={<CatalogPage />} />
      <Route path='/product/:name' element={<ProductPage />} />
      <Route path='/basket' element={<BasketPage />} />
      <Route path='/adminBoard' element={<AdminBoard />} />
      <Route path='/authPage' element={<AuthPage />} />
      <Route path='/favourites' element={<FavouritesPage />} />
      {user?.login && (
        <Route path='/userSettings' element={<UserSettings />} />
      )}
      
    </Routes>
  );
}

export default Routing;
