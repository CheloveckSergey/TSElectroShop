import React, { useContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import userService from '../../../shared/api/userService';
import { useNotes } from '../../../shared/customAlert/model/store';
import { UserContext } from '../../../shared/userContext';
import './styles.scss';

const UserSettingsPanel = () => {
  const { user, image, refresh } = useContext(UserContext);
  const { showNote } = useNotes();
  
  const [img, setImg] = useState(image);

  const { data, isLoading, error, refetch } = useQuery(
    ['loadAvatar', img],
    () => userService.loadAvatar(formRef.current),
    {
      enabled: false,
      onSuccess: () => {
        console.log('lalala');
        showNote('Аватар', 'Аватар добавлен');
        refresh();
      }
    }
  )

  const formRef = useRef(null);

  return (
    <div className='user-settings-panel'>
      <div className='avatar-section'>
        <img src={img} alt='http://localhost:5000/cDE1NjM1NF8xODk1NjZfMzM3.png' />
        <form ref={formRef}>
          <label>
            <h4>Load image</h4>
            <input 
              name='avatar'
              type="file" 
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.onload = function() {
                  setImg(fileReader.result);
                }
                fileReader.readAsDataURL(e.target.files[0]);
              }}
            />
          </label>
        </form>
        <button className='update-avatar' onClick={() => {
          console.log('hjhjhjh');
          refetch();
        }}>
          Update Avatar
        </button>
      </div>
      
      <div className='info'>
        <h3>Username: {user}</h3>
      </div>
    </div>
  );
}

export default UserSettingsPanel;
