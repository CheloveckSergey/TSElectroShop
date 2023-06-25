import React, { FC, useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import LoginContainer from './loginContainer';
import RegisterContainer from './registerContainer';

export const pages = {
  SIGNUP: 'sign-up',
  REGISTRATION: 'registration'
}

export interface AuthContainerProps {
  nowPage: string
}


export const validation = (
  login: string, 
  setLoginError: React.Dispatch<React.SetStateAction<string>>, 
  password: string, 
  setPasswordError: React.Dispatch<React.SetStateAction<string>>,
  confirmPassword?: string,
  setConfirmPasswordError?: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  let result: boolean = true;
  if (login.length < 7 || login.length > 15) {
    setLoginError('Логин должен быть не меньше 7-ми и не больше 15-ти символов');
    result = false;
  }
  if (password.length < 7 || password.length > 15) {
    setPasswordError('Пароль должен быть не меньше 7-ми и не больше 15-ти символов');
    result = false;
  }
  if (confirmPassword && setConfirmPasswordError) {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли должны совпадать');
      result = false;
    }
  }
  
  return result;
}


const AuthPage: FC = () => {
  const [nowPage, setNowPage] = useState(pages.SIGNUP);

  const navigate = useNavigate();

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <button 
          className='sign-in'
          onClick={() => setNowPage(pages.SIGNUP)}
        >
          Sign In
        </button>
        <button 
          className='registration'
          onClick={() => setNowPage(pages.REGISTRATION)}
        >
          Registration
        </button>
        <button
          className='back'
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <LoginContainer nowPage={nowPage} />
        <RegisterContainer nowPage={nowPage} />
      </div>
    </div>
  );
}

export default AuthPage;
