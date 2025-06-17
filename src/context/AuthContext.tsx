import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types";
import Cookies from "js-cookie"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
type AuthProviderType = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get( "token");
    if (storedToken) {
      setIsLoggedIn(!!storedToken);
      setToken(storedToken);
    }
  }, []);

  const loginToken = (token: string) => {
    Cookies.set("token", token);
    setToken(token);
    setIsLoggedIn(!!token);
  };
  const logOut = () => {
    Cookies.remove("token");
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, loginToken, setIsLoggedIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
