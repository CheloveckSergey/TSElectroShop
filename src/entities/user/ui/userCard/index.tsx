import React, { useContext } from 'react';
import { UserContext } from '../../../../shared/userContext';
import './styles.scss';
import { useAppSelector } from '../../../../app/store';

const UserCard = () => {
  // const { user, image } = useContext(UserContext);
  const { user } = useAppSelector(state => state.user);

  let avatar;
  if (user?.avatar) {
    avatar = 'http://localhost:5000/' + user.avatar;
  }

  return (
    <div className='user-card'>
      <img src={avatar || 'https://konstruktortestov.ru/files/2d17/7260/2a22/e099/c153/7ce8/c2a8/3f9a/3673985913.jpg'} alt="IMG" />
      <h3>{user?.login}</h3>
    </div>
  );
}

export default UserCard;
