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
