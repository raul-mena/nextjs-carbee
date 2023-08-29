"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AUTH_TOKEN_KEY } from "../../global/constants";

export const AuthContext = createContext({
  successLogin: (authToken: string) => {},
  successLogout: () => {},
  isLoggedIn: false,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const authTokenInSessionStorage = typeof window !== 'undefined' ? window?.sessionStorage?.getItem(AUTH_TOKEN_KEY) : null;
  const [authToken, setAuthToken] = useState<string | null>(
    authTokenInSessionStorage === null
      ? null
      : authTokenInSessionStorage
  );
  const successLogin = useCallback((authToken: string) => {
    if (typeof window !== 'undefined') {
      window?.sessionStorage?.setItem(AUTH_TOKEN_KEY, authToken);
      setAuthToken(authToken);
    }
  }, []);

  const successLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window?.sessionStorage?.removeItem(AUTH_TOKEN_KEY);
      setAuthToken(null);
    }
  }, []);

  const value = {
      successLogin,
      successLogout,
      authToken,
      isLoggedIn: authToken !== null,
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}