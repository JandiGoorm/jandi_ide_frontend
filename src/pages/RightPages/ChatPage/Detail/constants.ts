export interface ChatMessage {
  id: number;
  profileImage: string;
  username: string;
  message: string;
  date: string;
  isMine: boolean;
}

export const chatDummyData: ChatMessage[] = [
  {
    id: 1,
    profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
    username: "소연",
    message: "완전 좋죠! 국밥 고고!",
    date: "2025-04-11 11:07",
    isMine: true,
  },
  {
    id: 2,
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    username: "민수",
    message: "오늘은 국밥 어때요?",
    date: "2025-04-11 11:05",
    isMine: false,
  },
  {
    id: 3,
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "현우",
    message: "점심은 뭐 먹을까요? 😋",
    date: "2025-04-11 11:03",
    isMine: false,
  },
  {
    id: 4,
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "지혜",
    message:
      "회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~회의 전에 자료 정리해서 올릴게요~",
    date: "2025-04-11 09:26",
    isMine: false,
  },
  {
    id: 5,
    profileImage: "https://randomuser.me/api/portraits/men/34.jpg",
    username: "민수",
    message: "좋아요! 오후 3시에 회의하는 걸로 하죠.",
    date: "2025-04-11 09:25",
    isMine: false,
  },
  {
    id: 6,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
  {
    id: 7,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
  {
    id: 8,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
  {
    id: 9,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
  {
    id: 10,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
  {
    id: 11,
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "소연",
    message: "안녕하세요! 오늘 일정 공유드릴게요.",
    date: "2025-04-11 09:23",
    isMine: true,
  },
];
