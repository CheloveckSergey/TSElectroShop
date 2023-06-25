import React, { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../shared/userContext';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { logoutThunk } from '../../../../entities/user/model';

interface SidebarProps {
  showSidebar: boolean,
  setShowsidebar: React.Dispatch<React.SetStateAction<boolean>>,
}

const Sidebar: FC<SidebarProps> = ({showSidebar, setShowsidebar}) => {
  // const { isAuth, logout } = useContext(UserContext);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <div
      className={`sidebar ${showSidebar ? 'opened' : 'closed'}`}
      onClick={(e: React.MouseEvent) => {
        let element = e.target as HTMLElement;
        if (element.tagName == 'A') {
          setShowsidebar(false);
        };
      }}
    >
      <h4>Burger Menu</h4>
      <h3><Link className='cansel' to='/' >Home</Link></h3>
      <h3><Link className='cansel' to='/adminBoard' >Admin Board</Link></h3>
      <h3><Link className='cansel' to='/catalog' >All Products</Link></h3>
      <h3><Link className='cansel' to='/favourites' >Favourites</Link></h3>
      {user?.login && (
        <div className='user-menu'>
          <h3><Link className='cansel' to='/userSettings' >User Settings</Link></h3>
          <h3><Link className='cansel' to='/favourites' >Favourites</Link></h3>
        </div>
      )}
      <div className='auth-point'>
        {user?.login? (
          <h3 onClick={() => {
            dispatch(logoutThunk({}))
            .unwrap()
            .then(() => navigate('/authPage'))
            .catch((error) => 'Ошибка при клике логаута');
          }}>Logout</h3>
        ) : (
          <h3><Link className='cansel' to='/authPage' >Authorization</Link></h3>
        )}
      </div>
    </div>
  );
}

export default Sidebar;