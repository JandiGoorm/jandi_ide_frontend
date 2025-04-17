export type UserRole = "ADMIN" | "USER";

export interface User {
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

export interface Project {
  createdAt: string;
  description: string;
  githubName: string;
  id: number;
  name: string;
  owner: User;
}
