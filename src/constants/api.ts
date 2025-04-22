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
  ALGO_COMPANY_TEST: "/algo/test/company/:id",
  ALGO_CUSTOM_TEST: "/algo/test/custom/:id",

  GITHUB_PROJECT: "/project/:id",
};

export const APIEndPoints = {
  LOGIN: "/users/login",
  REFRESH: "/users/refresh",

  //내정보
  MY_INFO: "/users/me",
  MY_PROJECT: "/users/:id/projects",
  GIT_REPO: "/users/:id/repos",
  MODIFY_PROFILE: "/users/:id",

  ADD_PROJECT: "/projects",
  MANAGE_PROJECT: "/projects/:id",
  PROJECT_BLOB: "/projects/:id/blob",

  MANAGE_BASKETS: "problem-set",

  //기업
  COMPANY: "/companies",
  MANAGE_COMPANY: "/companies/:id",
  COMPANY_POSTING: "/companies/:id/job-posting",
  //체용공고
  SCHEDULES: "/schedules",

  //채팅
  ALL_CHATROOMS: "/chat/rooms",
  CHATROOM_MANAGE: "/chat/rooms/:id",
  CHATROOM_JOIN: "/chat/rooms/:id/join",
  CHATROOM_LEAVE: "/chat/rooms/:id/leave",
  CHATROOM_PARTICIPANTS: "/chat/rooms/:id/participants",
  CHAT_MESSAGE: "/chat/rooms/rooms/:id/messages",

  //알고리즘
  ALL_PROBLEMS: "/problems",
};
