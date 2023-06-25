import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  if (localStorage.getItem('accessToken')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
})

api.interceptors.response.use(config => {
  return config
}, async (error) => {
  console.log('СРАБАТЫВАНИЕ ИНТЕРЦЕПТОРА: ' + error);
  const originalRequest = error.config;
  if (error.response.status == 401 && !originalRequest.isFuckingRetry) {
    originalRequest.isFuckingRetry = true;
    console.log('РЕФРЕШ В ИНТЕРЦЕПТОРЕ');
    const data = await axios.post('http://localhost:5000/user/refresh', {}, {withCredentials: true});
    console.log('РЕФРЕШ В ИНТЕРЦЕПТОРЕ ПРОШЁЛ УСПЕШНО');
    localStorage.setItem('accessToken', data.data.accessToken);
    return api.request(originalRequest);
  }
  throw error;
});

export default api;