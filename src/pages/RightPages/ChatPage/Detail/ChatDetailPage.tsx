import styles from "./ChatDetailPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/ChatPage/Detail/ChatDetailLeft";
import ChatHeader from "../../../../layouts/Components/ChatHeader";
import Button from "../../../../components/Button/Button";
import Chatting from "./Components/Chatting";
import useChatting from "../../../../hooks/useChatting";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useChat, { ChatMessages } from "../../../../hooks/useChat";
import { useAuth } from "../../../../contexts/AuthContext";

const ChatDetailPage = () => {
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const [chatPeoples, setChatPeoples] = useState<number | null>(null);

  const initializedRef = useRef(false);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams<{ id: string }>();
  const { chatRoomInfo, getChatRoomInfo, getChatRoomParticipants } =
    useChatting();

  const { enterChatRoom, sendMessage, getChatMessagePages } = useChat();

  const { user } = useAuth();

  const sendTo = useCallback(() => {
    if (!id || !user) return;
    const message = messageInputRef.current?.value?.trim();

    if (!message) return;

    sendMessage(id, message, user?.githubUsername);
    messageInputRef.current!.value = "";
  }, [id, sendMessage, user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || initializedRef.current) return;

      initializedRef.current = true;
      await enterChatRoom(id);
      await getChatRoomInfo(id);

      const count = await getChatRoomParticipants(id);
      setChatPeoples(count);
      const res = await getChatMessagePages(id, 0);
      console.log("res", res);
      if (res && res.data) {
        setMessages(res.data.content);
      }
    };

    fetchData();
  }, [
    enterChatRoom,
    getChatMessagePages,
    getChatRoomInfo,
    getChatRoomParticipants,
    id,
  ]);

  if (chatRoomInfo === null) return null;

  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide chatRoomInfo={chatRoomInfo} chatPeoples={chatPeoples} />
      </Sidebar.Panel>
      <Sidebar.Content header={<ChatHeader />}>
        <div className={styles.content}>
          <div className={styles.flexBox}>
            <div className={styles.chat_container}>
              <div ref={chatEndRef} />
              {messages?.map((chat, index) => (
                <Chatting chat={chat} key={index} />
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
