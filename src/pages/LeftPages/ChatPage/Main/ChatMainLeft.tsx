import styles from "./ChatMainLeft.module.css";
import ChatRoomButton from "./components/ChatRoomButton";
import LeftPart from "../../../../layouts/Components/LeftPart";
import useChatRoom from "../../../../hooks/useChatRoom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatRoom, ChatRoomType } from "../../../../constants/types/types";
import Button from "../../../../components/Button/Button";

const ChatMainLeft = () => {
  const [selectedType, setSelectedType] = useState<ChatRoomType>(
    ChatRoomType.COMPANY
  );
  const { chatRooms, getChatRooms } = useChatRoom();

  const roomsByType = useMemo(() => {
    const roomsByType: Record<string, ChatRoom[]> = {};
    chatRooms.forEach((room) => {
      const type = room.roomType;
      if (!roomsByType[type]) {
        roomsByType[type] = [];
      }
      roomsByType[type].push(room);
    });

    return roomsByType;
  }, [chatRooms]);

  const handleTypeChange = useCallback((type: ChatRoomType) => {
    setSelectedType(type);
  }, []);

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
          <div className={styles.type_button_list}>
            <Button
              variant="solid"
              size="lg"
              onClick={() => handleTypeChange(ChatRoomType.COMPANY)}
              style={{
                flex: 1,
              }}
            >
              회사별
            </Button>
            <Button
              variant="solid"
              size="lg"
              onClick={() => handleTypeChange(ChatRoomType.TECH_STACK)}
              style={{
                flex: 1,
              }}
            >
              기술스택
            </Button>
          </div>
        </div>

        <div className={styles.chat_button_list}>
          {roomsByType[selectedType]?.map((chatRoom) => (
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
