import api from "./http";
import { UserData } from "../../entities/user/model";
import { AxiosResponse } from "axios";

class UserService {
  async registration(login: string, password: string) {
    console.log('REGISTRATION');
    const response = await api.post<UserData>(
      '/user/registration',
      { login, password } 
    );
    return response;
  }

  async login(login: string, password: string) {
    console.log('LOGIN');
    const response = await api.post<UserData>(
      '/user/login',
      { login, password } 
    );
    // console.log(response);
    return response;
  }

  async logout() {
    console.log('LOGOUT');
    const response = await api.post(
      '/user/logout',
    );
    return response;
  }

  async refresh() {
    console.log('REFRESH');
    const response = await api.post<UserData>(
      '/user/refresh',
    );
    // console.log(response);
    return response;
  }

  async loadAvatar(form: HTMLFormElement){
    let formData = new FormData(form);
   
    const response = await api.post(
      '/user/loadAvatar',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }
}

export default new UserService();