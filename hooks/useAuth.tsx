import React, {
  useState, useEffect, useContext, createContext, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { fetchNewToken, fetchToken, fetchUser } from '../data/auth';
import { User } from '../interfaces';

type AuthContextProps = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateToken: () => void;
}

const AuthContext = createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const router = useRouter();

  const getUser = () => {
    fetchUser(accessToken).then((res) => setUser(res.data));
  };

  const getRefreshToken = (): string => sessionStorage.getItem('refresh');

  const setRefreshToken = (value: string): void => {
    sessionStorage.setItem('refresh', value);
  };

  const login = (username: string, password: string): Promise<void> => (
    fetchToken(username, password).then((res) => {
      const { data } = res;
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
    isAuthenticated,
    user,
    login,
    logout,
    updateToken,
  }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): Partial<AuthContextProps> => useContext(AuthContext);
