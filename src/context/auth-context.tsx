import React, { createContext, useContext, useState } from "react";
import * as auth from "auth_provider";
import { User } from "types/user";

interface AuthForm {
  username: string;
  password: string;
}
const AuthContext = createContext<
  | {
      user: User | null;
      login: (param: AuthForm) => Promise<User | null>;
      register: (param: AuthForm) => Promise<User | null>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (form: AuthForm) => {
    try {
      const result = await auth.login(form);
      setUser(result);
      return Promise.resolve(result);
    } catch (e) {
      setUser(null);
      return Promise.reject(null);
    }
  };
  const register = async (form: AuthForm) => {
    try {
      const result = await auth.register(form);
      return Promise.resolve(result);
    } catch (e) {
      setUser(null);
      return Promise.resolve(null);
    }
  };
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("当前自组件必须包裹在AuthContext.Provider中");
  }
  return context;
};
