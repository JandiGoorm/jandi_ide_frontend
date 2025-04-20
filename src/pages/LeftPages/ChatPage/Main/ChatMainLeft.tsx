import styles from "./ChatMainLeft.module.css";
import ChatRoomButton from "./components/ChatRoomButton";
import LeftPart from "../../../../layouts/Components/LeftPart";
import useChatting from "../../../../hooks/useChatting";
import { useEffect } from "react";

const ChatMainLeft = () => {
  const { chatRooms, getChatRooms } = useChatting();

  useEffect(() => {
    getChatRooms();
  }, [getChatRooms]);

  if (chatRooms === null) return null;

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.title_div}>
          <div className={styles.title}>Welcome to</div>
          <div className={styles.title}>Chat page!</div>
          <div className={styles.sub_title}>채팅방을 선택해주세요.</div>
        </div>

        <div className={styles.chat_button_list}>
          {chatRooms.map((chatRoom) => (
            <ChatRoomButton
              chatName={chatRoom.name}
              chatId={chatRoom.roomId}
              key={chatRoom.roomId}
            />
          ))}
        </div>
      </div>
    </LeftPart>
  );
};

export default ChatMainLeft;
