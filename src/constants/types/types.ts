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
  techStacks: string[];
  favoriteCompanies: string[];
}

export type ModifyUserData = {
  introduction: string;
  email: string;
  nickname: string;
  profileImage: string;
};

export interface Project {
  createdAt: string;
  description: string;
  githubName: string;
  id: number;
  name: string;
  url: string;
}
export interface ProjectDefaultInfo {
  name: string;
  treeData: ProjectInfo;
}
export interface ProjectInfo {
  sha: string;
  tree: Tree;
  truncated: boolean;
  url: string;
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

export type ModifyBasketData = {
  title: string;
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
  programmingLanguages: string[];
  jobPostings: JobPosting[];
  profileUrl: string;
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
  tags: string[];
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string;
  title: string;
}

export interface Schedule {
  id: number;
  scheduleName: string;
  date: string; // ISO 날짜 형식 (예: "2025-04-19")
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitInfo {
  id: number;
  title: string;
  description: string;
  schedules: Schedule[];
  createdAt: string;
  updatedAt: string;
}

export interface Baskets {
  id: number;
  isCompanyProb: boolean;
  problemIds: string[];
  minutes: number;
  title: string;
  company: string;
  language: string;
}

export interface BasketBody {
  isCompanyProb: boolean;
  problemIds: number[];
  minutes: number;
  title: string;
  companyName: string;
  language: string;
}

export interface TestCase {
  id: number;
  input: string;
  output: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProblemInfo {
  id: number;
  title: string;
  description: string;
  level: number;
  memory: number;
  timeLimit: number;
  tags: string[];
  testCases: TestCase[];
  createdAt: string;
  updatedAt: string;
}

export interface Techs {
  id: number;
  techStack: string;
}

export interface CompilerBody {
  userId: number;
  problemId: number;
  problemSetId: number;
  code: string;
  language: string;
  solvingTime: number;
}

export interface CompilerResponse {
  code: string;
  error: string;
  errorDetails: string;
  errorType: string;
  language: string;
  message: string;
  status: number | string;
  timestamp: string;
}

export interface SubmitBody {
  userId: number;
  problemId: number;
  problemSetId: number;
  code: string;
  language: string;
  isCorrect: boolean;
  solvingTime: number;
  additionalInfo: string;
  memoryUsage: number;
  executionTime: number;
  status: string | number;
  description: string;
}

export interface ResultsInfo {
  problemSetId: number;
  problemSetName: string;
  problems: ResultsProblems[];
  userId: number;
}

export interface ResultsProblems {
  level: number;
  problemDescription: string;
  problemId: number;
  problemTitle: string;
  solution: Solution[];
}

export interface Solution {
  additionalInfo: string;
  code: string;
  createdAt: string;
  description: string;
  executionTime: number;
  id: number;
  isCorrect: boolean;
  language: string;
  memoryUsage: number;
  problemId: number;
  problemSetId: number;
  solvingTime: number;
  status: string;
  updatedAt: string;
  userId: number;
  userName: string;
}
