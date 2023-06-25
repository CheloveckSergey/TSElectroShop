import React from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import Home from './home/index';

const HomePage = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main'>
        <Home />
      </div>
      <Righter />
    </div>
  );
}

export default HomePage;
