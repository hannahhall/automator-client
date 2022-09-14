import '@testing-library/jest-dom';
import mockAxios from 'jest-mock-axios';
import { fetchToken, fetchNewToken, fetchUser, registerUser } from '../../data/auth';
const API_BASE = 'http://localhost:8000';


describe('Auth Data', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should make a post request when fetchToken is called', () => {
    const url = API_BASE + '/auth/token/';
    const username = 'username';
    const password = 'password';

    const response = fetchToken(username, password);
    expect(mockAxios.post).toHaveBeenCalledWith(url, { username, password });
    expect(response.status).toEqual('pending');
  });

  it('should make a post request when fetchNewToken is called', () => {
    const url = API_BASE + '/auth/token/refresh/';
    const refresh = 'refresh';

    const response = fetchNewToken(refresh);
    expect(mockAxios.post).toHaveBeenCalledWith(url, { refresh });
    expect(response.status).toEqual('pending');
  });

  it('should make a get request when fetchUser is called', () => {
    const url = API_BASE + '/api/users/profile';
    const token = 'token';

    const response = fetchUser(token);
    expect(mockAxios.get).toHaveBeenCalledWith(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toEqual('pending');
  });

  it('should make a post request when registerUser is called', () => {
    const url = API_BASE + '/api/register';
    const user = {
      username: 'username',
      password: 'password'
    };

    const response = registerUser(user);
    expect(mockAxios.post).toHaveBeenCalledWith(url, user);
    expect(response.status).toEqual('pending');
  });
});
