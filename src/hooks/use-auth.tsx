import { createContext, useContext } from "react";
import { UserType } from "../store/userSlice";

export type AuthContextType = {
  token: string | undefined;
  currentUser: UserType | null;
  login: (newToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}
