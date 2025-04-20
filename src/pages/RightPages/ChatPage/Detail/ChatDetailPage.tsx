import styles from "./ChatDetailPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/ChatPage/Detail/ChatDetailLeft";
import ChatHeader from "../../../../layouts/Components/ChatHeader";
import Button from "../../../../components/Button/Button";
import Chatting from "./Components/Chatting";
import useChatting from "../../../../hooks/useChatting";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../../../../hooks/useChat";

const ChatDetailPage = () => {
  const { chatRoomInfo, getChatRoomInfo, getChatRoomParticipants } =
    useChatting();
  const { messages, enterChatRoom } = useChat();
  const [chatPeoples, setChatPeoples] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const initializedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || initializedRef.current) return;

      initializedRef.current = true;
      await enterChatRoom(id);
      await getChatRoomInfo(id);
      const count = await getChatRoomParticipants(id);
      setChatPeoples(count);
    };

    fetchData();
  }, [getChatRoomInfo, getChatRoomParticipants, id]);

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
              {messages?.map((chat, index) => (
                <Chatting chat={chat} key={index} />
              ))}
            </div>
            <div className={styles.chat_input_container}>
              <div className={styles.chat_input_box}>
                <textarea
                  className={styles.description_content}
                  placeholder="건전한 대화를 위해 타인에게 불쾌감을 줄 수 있는 글은 삼가주세요. 도배, 광고, 홍보 목적의 메시지는 제한되며, 반복 시 이용이 제한될 수 있습니다."
                />
              </div>
              <div className={styles.send_button_box}>
                <Button size="md">보내기</Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default ChatDetailPage;
