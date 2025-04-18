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

export interface ProjectInfo {
  sha: string;
  tree: Tree;
}

export interface Tree {
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
}

export type ProjectData = {
  projectName: string;
  description: string;
  selectedRepo: string;
  selectedHtmlUrl: string;
};
