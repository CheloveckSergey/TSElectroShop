import React, { FC } from 'react';
import './styles.scss';

interface HeaderProps {
  title: string,
  text: string,
}

const Header: FC<HeaderProps> = ({ title, text }) => {
  return (
    <div className='header'>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

export default Header;