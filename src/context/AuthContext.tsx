import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types";

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
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(!!storedToken);
      setToken(storedToken);
    }
  }, []);

  const loginToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, loginToken, setIsLoggedIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
