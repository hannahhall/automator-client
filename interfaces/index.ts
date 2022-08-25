import { AxiosResponse, AxiosError } from 'axios';

export interface User {
  id: string;
  email: string;
  first_name: string;
  username: string;
  last_name: string;
}

export interface TokenResponse {
  access: string;
  refresh: number;
}

interface ResponseError extends AxiosResponse {
  data: {
    detail: string
  }
}

export interface ApiError extends AxiosError {
  response: ResponseError
}

export interface ICohort {
  id: string;
  name: string;
}
