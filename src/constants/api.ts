export const PageEndPoints = {
  HOME: "/",
  TEST: "/test",

  LOGIN: "/login",
  CALLBACK: "/callback",
  LOGIN_LANGUAGE: "/register/language",
  LOGIN_COMPANY: "/register/company",
  LOGIN_DONE: "/register/done",

  MYPAGE: "/mypage",
  MY_COMPANY: "/mypage/company",
  MY_PROJECT: "/mypage/project",
  MY_ALGO: "/mypage/algorithm",
  SETTING: "/mypage/setting",

  CHAT_MAIN: "/chat",
  CHAT_DETAIL: "/chat/:id",

  ALGO_MAIN: "/algo",

  GITHUB_PROJECT: "/project/:id",
};

export const APIEndPoints = {
  LOGIN: "/users/login",
  REFRESH: "/users/refresh",

  //내정보
  MY_INFO: "/users/me",
  MY_PROJECT: "/users/:id/projects",
  GIT_REPO: "/users/:id/repos",

  ADD_PROJECT: "/projects",
  MANAGE_PROJECT: "/projects/:id",
  PROJECT_BLOB: "/projects/:id/blob",
};
