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
  detail?: string;
}

export type TStudentForm = {
  user: TUserForm;
  cohort?: number | string;
  image?: File | string;
  bio?: string;
  favorite_quote?: string;
  podcast_link?: string;
  resume_link?: string;
  linkedin?: string;
  github_handle?: string;
  detail?: string;
}

export interface Student {
  student_id: string;
  full_name: string;
  is_complete: boolean;
}

export interface Tech {
  id?: number;
  text: string;
  icon?: File[] | File | string;
  square_icon?: string;
}

export type TCohort = {
  id: number;
  name: string;
  graduation_date?: string;
  program: string;
  techs: (number | Tech)[];
  github_organization: string;
  demo_day: string;
  demo_day_time: string;
  slack_channel: string;
  is_deployed: boolean;
}

export type TCohortErrors = TCohort & {
  message?: string;
}

export type TCohortDetail = TCohort & {
  students: Student[];
  repo_created: boolean;
  student_count: number;
}

export interface CohortRead extends TCohort {
  demo_day_readable: string;
}

export type Program = {
  id: number;
  name: string;
  techs: (number | Tech)[];
  cohorts?: CohortRead[];
}

export type Project = {
  id?: number;
  title: string;
  description: string;
  github_url: string;
  deployed_url: string;
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

interface ExpandedField {
  verbose_name: string,
  value: string | null,
}

export interface IStudentDetail {
  bio: ExpandedField,
  circle_image: ExpandedField,
  cohort_name: ExpandedField,
  email: ExpandedField,
  favorite_quote: ExpandedField,
  first_name: ExpandedField,
  github_handle: ExpandedField,
  last_name: ExpandedField,
  linkedin: ExpandedField,
  podcast_link: ExpandedField,
  resume_link: ExpandedField,
}
