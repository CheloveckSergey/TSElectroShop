import { FC, useState } from "react";
import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
// import { useNotes } from "../../../shared/customAlert/model/store";
import { MyRejectValue, loginThunk } from "../../../entities/user/model";
import { AuthContainerProps, pages, validation } from "..";
import CustomInput from "../ui/input";


const LoginContainer: FC<AuthContainerProps> = ({ nowPage }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [authError, setAuthError] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  
  // const { showNote } = useNotes();

  function handleClick() {
    setAuthError('');

    const validationResult: boolean = validation(
      username,
      setUsernameError,
      password,
      setPasswordError
    );
    if (!validationResult) {
      return;
    }

    dispatch(loginThunk({username, password}))
    .unwrap()
    .then(() => {
      navigate('/');
      // window.location.reload();
    } )
    .catch((error: MyRejectValue) => {
      console.log('ОШИБКА В КЛИКЕ ЛОГИНА');
      if (error.status === 400) {
        setAuthError(error.message);
      }
    });
    // showNote(username, `Пользователь ${username} вошёл`);
  }

  return (
    <div className={`form-container ${nowPage == pages.SIGNUP ? 'showen' : ''}`}>
      <h1>Sign Up</h1>
      <div className='div-form'>
        <CustomInput 
          type="text"
          header="Username"
          name="username"
          value={username}
          setValue={setUsername}
          error={usernameError}
          setError={setUsernameError}
        />
        <CustomInput 
          type="password"
          header="Password"
          name="password"
          value={password}
          setValue={setPassword}
          error={passwordError}
          setError={setPasswordError}
        />
        <button onClick={handleClick}>
          Sign Up
        </button>
        <h3 className="error">
          {authError}
        </h3>
      </div>
    </div>
  )
}

export default LoginContainer;