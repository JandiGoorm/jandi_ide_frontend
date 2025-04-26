import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";
import { ChatMessages } from "../constants/types/types";

const API_URL = import.meta.env.VITE_WS_URL;
///채팅(socket연결)관리 hooks
const useChat = () => {
  const [messages, setMessages] = useState<ChatMessages[]>([]);

  const { fetchData: joinApi } = useAxios();
  const { fetchData: getMessagePageApi, loading: getMessageLoading } =
    useAxios();

  const clientRef = useRef<Client | null>(null);
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

  // 페이지별 채팅 메시지 불러오는 함수
  const getChatMessagePages = useCallback(
    async (
      id: string,
      page: number,
      setPrevMessages: Dispatch<SetStateAction<ChatMessages[]>>
    ) => {
      return await getMessagePageApi({
        method: "GET",
        url: buildPath(APIEndPoints.CHAT_MESSAGE_PAGE, { id }),
        params: {
          page,
          size: 10,
        },
      })
        .then((res) => {
          console.log("res", res);
          const newMessages = res?.data.content.filter(
            (msg: ChatMessages) =>
              !receivedMsgIds.current.has(`${msg.timestamp}_${msg.message}`)
          );

          newMessages.forEach((msg: ChatMessages) => {
            receivedMsgIds.current.add(`${msg.timestamp}_${msg.message}`);
          });
          setPrevMessages((prev) => [...prev, ...newMessages]);
          return res;
        })
        .catch((err) => {
          console.log(err + "채팅내역오류");
        });
    },
    [getMessagePageApi]
  );

  //소켓 연결
  const connectWebSocket = useCallback(async (roomId: string) => {
    console.log("소켓 연결 시도");
    const token = localStorage.getItem(`accessToken`);

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
  }, []);

  //채팅방 구독 함수
  const subscribeRoom = (roomId: string) => {
    console.log("채팅방 구독하기");
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    clientRef.current.subscribe(`/topic/chat/room/${roomId}`, (message) => {
      console.log("hit", message);
      const newMessage = JSON.parse(message.body);
      console.log("수신된 메시지:", newMessage);

      setMessages((prev) => [newMessage, ...prev]);
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

  const sendEnterMessage = (roomId: string, sender: string) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }
    const payload = {
      roomId,
      type: "ENTER",
      sender,
      message: "",
    };

    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify(payload),
    });
  };

  const sendLeaveMessage = (roomId: string, sender: string) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    const payload = {
      roomId,
      type: "LEAVE",
      sender,
      message: "",
    };

    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify(payload),
    });
  };

  return {
    getMessageLoading,
    enterChatRoom,
    getChatMessagePages,
    connectWebSocket,
    sendMessage,
    sendEnterMessage,
    sendLeaveMessage,
    messages,
  };
};

export default useChat;
