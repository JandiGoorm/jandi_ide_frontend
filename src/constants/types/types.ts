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

export type ModifyProjectData = {
  projectName: string;
  description: string;
};

export interface Schedule {
  id: number;
  scheduleName: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  schedules: Schedule[];
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  companyName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  levels: number[];
  timeInMinutes: number;
  programmingLanguages: string;
  jobPostings: JobPosting[];
}

export interface ChatRoom {
  roomId: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  participants: string[];
}

// interface ChatMessage {
//   type: string; // 문자열로 변경 (enum값 사용)
//   roomId: string;
//   sender: string;
//   message: string;
//   timestamp: string;
// }

export interface Problems {
  id: number;
  description: string;
  level: number;
  memory: number;
  timeLimit: number;
  tagName: string[];
  createdAt: string;
  updatedAt: string;
}
