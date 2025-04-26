import styles from "./ChatDetailPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/ChatPage/Detail/ChatDetailLeft";
import ChatHeader from "../../../../layouts/Components/ChatHeader";
import Button from "../../../../components/Button/Button";
import Chatting from "./Components/Chatting";
import useChatRoom from "../../../../hooks/useChatRoom";
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { useParams } from "react-router-dom";
import useChat from "../../../../hooks/useChat";
import { useAuth } from "../../../../contexts/AuthContext";
import Loading from "../../../../components/Loading/Loading";
import { ChatMessages } from "../../../../constants/types/types";

const ChatDetailPage = () => {
  const [prevMessages, setPrevMessages] = useState<ChatMessages[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [chatPeoples, setChatPeoples] = useState<number | null>(null);

  const initializedRef = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams<{ id: string }>();
  const { chatRoomInfo, getChatRoomInfo, getChatRoomParticipants } =
    useChatRoom();

  const {
    enterChatRoom,
    sendMessage,
    getChatMessagePages,
    messages: realtimeMessages,
    getMessageLoading,
    sendEnterMessage,
    sendLeaveMessage,
  } = useChat();

  const { user } = useAuth();

  const sendTo = useCallback(() => {
    if (!id || !user) return;
    const message = messageInputRef.current?.value?.trim();

    if (!message) return;

    sendMessage(id, message, user?.githubUsername);
    messageInputRef.current!.value = "";
  }, [id, sendMessage, user]);

  // 메시지를 더 불러오는 함수
  const fetchCallback = useCallback(async () => {
    if (!id || (totalPages > 0 && currentPage >= totalPages)) return;
    console.log("메시지 더 불러오기");

    const nextPage = currentPage + 1;
    const res = await getChatMessagePages(id, currentPage, setPrevMessages);
    if (res && res.data) {
      setCurrentPage(nextPage);
      setTotalPages(res.data.totalPages);
    }
  }, [id, currentPage, totalPages, getChatMessagePages]);

  // 스크롤 이벤트 핸들러
  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const chatContainer = chatContainerRef.current;
      if (!chatContainer) return;
      const { deltaY } = event;

      const maxScrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
      if (deltaY < 0 && chatContainer.scrollTop <= -maxScrollTop) {
        fetchCallback();
      }
    },
    [fetchCallback]
  );

  // 첫 렌더링 시 제일 아래로 스크롤 이동
  useEffect(() => {
    if (!chatEndRef.current) return;
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatEndRef]);

  // 채팅방 입장 및 데이터 페칭
  useEffect(() => {
    const fetchData = async () => {
      if (!id || initializedRef.current || !user) return;

      initializedRef.current = true;
      await enterChatRoom(id);
      setTimeout(() => {
        sendEnterMessage(id, user.githubUsername);
      }, 1500);

      await getChatRoomInfo(id);

      const count = await getChatRoomParticipants(id);
      setChatPeoples(count);
      fetchCallback();
    };

    fetchData();
  }, [
    enterChatRoom,
    fetchCallback,
    getChatRoomInfo,
    getChatRoomParticipants,
    id,
    sendEnterMessage,
    user,
  ]);

  useEffect(() => {
    return () => {
      if (id && user) {
        try {
          sendLeaveMessage(id, user?.githubUsername);
        } catch (err) {
          console.error("채팅방 퇴장 처리 중 오류", err);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chatRoomInfo === null) return null;

  console.log("prevMessages", prevMessages);

  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide chatRoomInfo={chatRoomInfo} chatPeoples={chatPeoples} />
      </Sidebar.Panel>
      <Sidebar.Content header={<ChatHeader />}>
        <div className={styles.content}>
          <div className={styles.flexBox}>
            {getMessageLoading && <Loading />}
            <div
              className={styles.chat_container}
              onWheel={(e) => handleWheel(e)}
              ref={chatContainerRef}
            >
              <div ref={chatEndRef} />
              {/* 실시간 메시지 */}
              {realtimeMessages?.map((chat) => {
                return (
                  <Chatting
                    chat={chat}
                    key={`rt_${chat.timestamp}_${chat.message}`}
                  />
                );
              })}

              {/* 불러온 메시지 */}
              {prevMessages?.map((chat) => (
                <Chatting
                  chat={chat}
                  key={`prev_${chat.timestamp}_${chat.message}`}
                />
              ))}
            </div>

            <div className={styles.chat_input_container}>
              <div className={styles.chat_input_box}>
                <textarea
                  ref={messageInputRef}
                  className={styles.description_content}
                  placeholder="건전한 대화를 위해 타인에게 불쾌감을 줄 수 있는 글은 삼가주세요. 도배, 광고, 홍보 목적의 메시지는 제한되며, 반복 시 이용이 제한될 수 있습니다."
                />
              </div>
              <div className={styles.send_button_box}>
                <Button size="md" onClick={sendTo}>
                  보내기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default ChatDetailPage;
