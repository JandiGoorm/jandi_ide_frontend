import { createContext, useContext } from "react";

export type UserRole = "ADMIN" | "USER";

interface User {
  id: number;
  githubId: string;
  profileImage: string;
  introduction: string;
  email: string;
  nickName: string;
  githubUsername: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  signIn: (data: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
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
