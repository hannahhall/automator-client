import '@testing-library/jest-dom';
import axios from "axios";

import { fetchToken, fetchNewToken, fetchUser, registerUser } from '../../data/auth';
const API_BASE = 'http://localhost:8000';


jest.mock("axios");

describe('Auth Data', () => {
  it('should make a post request when fetchToken is called', () => {
    const url = API_BASE + '/auth/token/';
    const username = 'username';
    const password = 'password';
    fetchToken(username, password);
    expect(axios.post).toHaveBeenCalledWith(url, { username, password });
  });

  it('should make a post request when fetchNewToken is called', () => {
    const url = API_BASE + '/auth/token/refresh/';
    const refresh = 'refresh';

    fetchNewToken(refresh);
    expect(axios.post).toHaveBeenCalledWith(url, { refresh });
  });

  it('should make a get request when fetchUser is called', () => {
    const url = API_BASE + '/api/users/profile';
    const token = 'token';

    fetchUser(token);
    expect(axios.get).toHaveBeenCalledWith(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('should make a post request when registerUser is called', () => {
    const url = API_BASE + '/api/register';
    const user = {
      username: 'username',
      password: 'password'
    };

    registerUser(user);
    expect(axios.post).toHaveBeenCalledWith(url, user);
  });
});
