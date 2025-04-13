import styles from "./ChatMainLeft.module.css";

//components
import ChatRoomButton from "./components/ChatRoomButton";
import LeftPart from "../../../../layouts/Components/LeftPart";

const ChatMainLeft = () => {
  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.title_div}>
          <div className={styles.title}>Welcome to</div>
          <div className={styles.title}>Chat page!</div>
          <div className={styles.sub_title}>채팅방을 선택해주세요.</div>
        </div>

        <div className={styles.chat_button_list}>
          <ChatRoomButton chatName={"네이버"} chatParticipant={101} />

          <ChatRoomButton chatName={"카카오"} chatParticipant={67} />

          <ChatRoomButton chatName={"라인"} chatParticipant={24} />
        </div>
      </div>
    </LeftPart>
  );
};

export default ChatMainLeft;
