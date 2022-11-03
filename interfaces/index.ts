import { AxiosResponse, AxiosError } from 'axios';
import { ReactNode } from 'react';

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
  id: number;
  name: string;
  graduation_date?: string;
}

export type TUserForm = {
  email: string;
  username: string;
  password: string;
  is_staff: number;
  instructor_password?: string;
  first_name?: string;
  last_name?: string;
  cohort?: number | string;
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
  icon?: File[] | File | string;
  square_icon?: string;
}

export type Program = {
  id?: number;
  name: string;
  techs?: (string | Tech)[];
  cohorts?: ICohort[];
}

export interface TableRow {
  key: string;
  data: ReactNode[];
}

export interface TableProps {
  headers: string[];
  footers: string[];
  rows: TableRow[];
}
