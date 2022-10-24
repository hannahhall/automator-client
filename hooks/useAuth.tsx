import {
  useState, useEffect, useContext, createContext, useMemo, ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { fetchNewToken, fetchToken, fetchUser } from '../data/auth';
import { User } from '../interfaces';

type AuthContextProps = {
  getIsAuthenticated: () => boolean;
  getAccessToken: () => string;
  getUser: () => User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateToken: () => void;
  setRefreshToken: (token: string) => void;
  setAccessToken: (token: string) => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>('');
  const router = useRouter();

  const getUser = () => user;
  const getIsAuthenticated = (): boolean => isAuthenticated;
  const getAccessToken = (): string => accessToken;

  const getRefreshToken = (): string => sessionStorage.getItem('refresh');

  const setRefreshToken = (value: string): void => {
    sessionStorage.setItem('refresh', value);
  };

  const login = (username: string, password: string): Promise<void> => (
    fetchToken(username, password).then((res) => {
      const { data } = res;
      setIsAuthenticated(true);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
    })
  );

  const logout = (): void => {
    setAccessToken('');
    setRefreshToken('');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const updateToken = (): void => {
    setIsAuthenticated(true);
    fetchNewToken(getRefreshToken()).then((res) => {
      const { data } = res;
      setAccessToken(data.access);
    }).catch(() => {
      logout();
    });
  };

  useEffect(() => {
    if (!['/login', '/register'].includes(router.pathname)) {
      updateToken();
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUser(accessToken).then((res) => setUser(res.data));
    }
  }, [accessToken]);

  const value = useMemo(() => ({
    getIsAuthenticated,
    getAccessToken,
    getUser,
    login,
    logout,
    updateToken,
    setRefreshToken,
    setAccessToken,
  }), [isAuthenticated, accessToken, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): Partial<AuthContextProps> => useContext(AuthContext);
