import { createContext, useContext } from "react";
import { User } from "../constants/types/types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (data: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signIn: async () => {},
  signOut: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
