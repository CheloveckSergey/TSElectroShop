import { useEffect } from "react";
import Routing from "../pages";
import './styles.scss';
import { useAppDispatch } from "./store";
import { refreshThunk } from "../entities/user/model";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshThunk({}))
    .unwrap()
    .then((result) => {
      console.log('Начальный рефреш прошёл успешно');
    })
    .catch((error) => {
      if (error?.status === 401) {
        navigate('/authPage');
      } else {
        console.log('Произошла непредвиденная ошибка при начальном рефреше');
      };
    });
  }, []);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
