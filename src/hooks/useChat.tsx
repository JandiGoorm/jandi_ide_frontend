import { useCallback, useRef, useState } from "react";
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

interface ChatMessages {
  type: string; // 문자열로 변경 (enum값 사용)
  roomId: string;
  sender: string;
  message: string;
  timestamp: string;
}

///채팅(socket연결)관리 hooks
const useChat = () => {
  const { fetchData: joinApi } = useAxios();
  const { fetchData: getMessageApi } = useAxios();
  const [messages, setMessages] = useState<ChatMessages[]>([]);

  const receivedMsgIds = useRef<Set<string>>(new Set()); // 중복 메시지 처리를 위한 ID 저장소

  const enterChatRoom = async (newRoomId: string) => {
    try {
      // 먼저 메시지 상태와 중복 메시지 필터 초기화
      setMessages([]);
      receivedMsgIds.current.clear();

      try {
        // 기존 구독이 있으면 먼저 해제

        await joinApi({
          method: "POST",
          url: buildPath(APIEndPoints.CHATROOM_JOIN, { id: newRoomId }),
        })
          .then(() => {
            console.log(`새 채팅방 ${newRoomId}에 입장 성공`);
          })
          .catch(() => {
            console.error("채팅방 입장 실패");
          });
        getChatMessages(newRoomId);
      } catch (error) {
        console.error("채팅방 입장 중 오류:", error);
        alert("채팅방 입장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("enterChatRoom 처리 중 오류:", error);
    }
  };

  const getChatMessages = useCallback(
    async (id: string) => {
      await getMessageApi({
        method: "GET",
        url: buildPath(APIEndPoints.CHAT_MESSAGE, { id }),
      })
        .then((res) => {
          console.log(res?.data);
          setMessages(res?.data);
        })
        .catch((err) => {
          console.log(err + "채팅내역오류");
        });
    },
    [getMessageApi]
  );

  return {
    enterChatRoom,

    messages,
    getChatMessages,
  };
};

export default useChat;
