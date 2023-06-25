import { FC, useState } from "react";
import { AuthContainerProps, pages, validation } from "..";
import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
// import { useNotes } from "../../../shared/customAlert/model/store";
import { registerThunk } from "../../../entities/user/model";
import CustomInput from "../ui/input";

const RegisterContainer: FC<AuthContainerProps> = ({ nowPage }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const [authError, setAuthError] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // const { showNote } = useNotes();

  async function handleClick() {
    setAuthError('');

    const validationResult = validation(
      login, 
      setLoginError, 
      password, 
      setPasswordError, 
      confirmPassword, 
      setConfirmPasswordError
    );
    if (!validationResult) {
      return
    }

    dispatch(registerThunk({username: login, password}))
    .unwrap()
    .then((result) => {
      console.log(result);
      navigate('/');
      // window.location.reload();
    })
    .catch(() => console.log('ОШИБКА В КЛИКЕ РЕГИСТРАЦИИ'));
  }

  return (
    <div className={`form-container ${nowPage == pages.REGISTRATION ? 'showen' : ''}`}>
      <h1>Registration</h1>
      <div className='div-form'>
        <CustomInput 
          type="text"
          header="Login"
          name="login"
          value={login}
          setValue={setLogin}
          error={loginError}
          setError={setLoginError}
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
        <CustomInput 
          type="password"
          header="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={confirmPasswordError}
          setError={setConfirmPasswordError}
        />
        <button onClick={handleClick}>
          Registrate
        </button>
        <h3 className="error">
          {authError}
        </h3>
      </div>
    </div>
  )
}

export default RegisterContainer;