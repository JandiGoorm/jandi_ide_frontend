import { useCallback, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
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
  const API_URL = import.meta.env.VITE_WS_URL;

  const { fetchData: joinApi } = useAxios();
  const { fetchData: getMessageApi } = useAxios();
  const { fetchData: getMessagePageApi } = useAxios();
  const [allmessages, setAllMessages] = useState<ChatMessages[]>([]);
  const [messages, setMessages] = useState<ChatMessages[]>([]);

  const clientRef = useRef<Client | null>(null);
  const receivedMsgIds = useRef<Set<string>>(new Set()); // 중복 메시지 처리를 위한 ID 저장소

  const enterChatRoom = async (newRoomId: string) => {
    try {
      // 먼저 메시지 상태와 중복 메시지 필터 초기화
      setMessages([]);
      setAllMessages([]);
      receivedMsgIds.current.clear();

      try {
        // 기존 구독이 있으면 먼저 해제

        await joinApi({
          method: "POST",
          url: buildPath(APIEndPoints.CHATROOM_JOIN, { id: newRoomId }),
        })
          .then(() => {
            console.log(`새 채팅방 ${newRoomId}에 입장 성공`);
            connectWebSocket(newRoomId);
          })
          .catch(() => {
            console.error("채팅방 입장 실패");
          });
        // getChatMessages(newRoomId);
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
          setAllMessages(res?.data);
        })
        .catch((err) => {
          console.log(err + "채팅내역오류");
        });
    },
    [getMessageApi]
  );

  const getChatMessagePages = useCallback(
    async (id: string, page: number) => {
      await getMessagePageApi({
        method: "GET",
        url: buildPath(APIEndPoints.CHAT_MESSAGE_PAGE, { id }),
        params: {
          page: page,
          size: 20,
        },
      })
        .then((res) => {
          console.log(res?.data);
          setMessages(res?.data.content);
        })
        .catch((err) => {
          console.log(err + "채팅내역오류");
        });
    },
    [getMessageApi]
  );

  //소켓 연결
  const connectWebSocket = useCallback(
    async (roomId: string) => {
      console.log("소켓 연결 시도");
      const token = localStorage.getItem(`accessToken`);
      console.log(token);

      const socket = new SockJS(`${API_URL}`);
      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          subscribeRoom(roomId);
        },
        onStompError: (frame) => {
          console.error("STOMP 에러:", frame);
        },
        onDisconnect: () => {
          console.log("연결 해제됨");
        },
      });

      client.activate();
      clientRef.current = client;
    },
    [API_URL]
  );

  //채팅방 구독 함수
  const subscribeRoom = (roomId: string) => {
    console.log("채팅방 구독하기");
    if (!clientRef.current || !clientRef.current.connected) {
      console.log("ㄴㄴ");
      return;
    }

    clientRef.current.subscribe(`/topic/chat/room/${roomId}`, (message) => {
      const newMessage = JSON.parse(message.body);
      console.log("수신된 메시지:", newMessage);

      setMessages((prev) => [...prev, newMessage]);
      setAllMessages((prev) => [...prev, newMessage]);
    });
  };

  //메시지 전송
  const sendMessage = (roomId: string, message: string, sender: string) => {
    console.log("메시지 보내기 시도");
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    const payload = {
      roomId,
      message,
      type: "TALK",
      sender,
    };

    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify(payload),
    });
  };

  return {
    enterChatRoom,

    allmessages,
    messages,
    getChatMessages,
    getChatMessagePages,
    connectWebSocket,
    sendMessage,
  };
};

export default useChat;
