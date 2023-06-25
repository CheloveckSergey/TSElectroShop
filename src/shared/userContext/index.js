import React, { createContext, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import api from '../api/http';
import userService from '../api/userService';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState('Noname');
  const [image, setImage] = useState('http://localhost:5000/cDE1NjM1NF8xODk1NjZfMzM3.png');

  function setDefault() {
    setIsAuth(false);
    setUser('Noname');
    setImage('http://localhost:5000/cDE1NjM1NF8xODk1NjZfMzM3.png');
  }


  const navigate = useNavigate()

  async function login(login, password) {
    try {
      const { data } = await userService.login(login, password);

      setIsAuth(true);
      setUser(data.login);
      data.avatar && setImage('http://localhost:5000/' + data.avatar);
      localStorage.setItem('accessToken', data.accessToken);
      
      navigate('/');
      console.log('login');
    } catch (error) {
      console.log(error);
    }
  }

  async function registration(login, password) {
    try {
      const { data } = await userService.registration(login, password);

      setIsAuth(true);
      setUser(data.login);
      data.avatar && setImage('http://localhost:5000/' + data.avatar);
      localStorage.setItem('accessToken', data.accessToken);
      
      
      navigate('/');
      console.log('registration');
    } catch (error) {
      console.log(error);
    }
  }

  async function refresh() {
    try {
      const { data } = await userService.refresh();

      setIsAuth(true);
      setUser(data.login);
      data.avatar && setImage('http://localhost:5000/' + data.avatar);
      localStorage.setItem('accessToken', data.accessToken);

      console.log('refresh');
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const response = await userService.logout();

      setDefault();
      localStorage.removeItem('accessToken');

      navigate('/');
      console.log('logout');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{
      isAuth,
      setIsAuth,
      user,
      setUser,
      image,
      setImage,
      login,
      registration,
      logout,
      refresh,
    }} >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
