import React, { useState } from 'react';
import Sidebar from './sidebar/index';
import { GrMenu, GrClose } from 'react-icons/gr';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import './styles.scss';
import UserCard from '../../../entities/user/ui/userCard';

const Lefter = () => {
  const [showSidebar, setShowsidebar] = useState(false);

  return (
    <div className="left-panel">
      <button 
        className='sidebar-button'
        onClick={() => setShowsidebar(!showSidebar)}
      >
        {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}     
      </button>
      <Sidebar showSidebar={showSidebar} setShowsidebar={setShowsidebar} />
      <div className='user-card-container'>
        <UserCard />
      </div>
    </div>
  );
}

export default Lefter;