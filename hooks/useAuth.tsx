import {
  useState, useEffect, useContext, createContext, useMemo, ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { fetchNewToken, fetchToken, fetchUser } from '../data/auth';
import { User } from '../interfaces';

type AuthContextProps = {
  getIsAuthenticated: () => boolean;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const router = useRouter();

  const getUser = () => {
    fetchUser(accessToken).then((res) => setUser(res.data));
  };

  const getIsAuthenticated = (): boolean => isAuthenticated;

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
      getUser();
    }
  }, [accessToken]);

  const value = useMemo(() => ({
    getIsAuthenticated,
    user,
    login,
    logout,
    updateToken,
    setRefreshToken,
    setAccessToken,
  }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): Partial<AuthContextProps> => useContext(AuthContext);
