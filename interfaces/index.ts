import { AxiosResponse, AxiosError } from 'axios';

export interface User {
  email: string;
  first_name: string;
  username: string;
  last_name: string;
  is_staff: boolean;
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

export interface IUserForm {
  email: string;
  username: string;
  password: string;
  is_staff: number;
  instructor_password?: string;
  first_name?: string;
  last_name?: string;
  cohort?: number;
  image?: File | string;
  bio?: string;
  favorite_quote?: string;
  podcast_link?: string;
  resume_link?: string;
  linkedin?: string;
  github_handle?: string;
}

export interface Tech {
  id?: number;
  text: string;
  icon?: File | string;
  square_icon?: string;
}

export interface Program {
  id?: number;
  name: string;
  techs?: (number | Tech)[];
}
