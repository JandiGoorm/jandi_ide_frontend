import styles from "./ChatRoomButton.module.css";
const RED = "#E74C3C" as const;
const YELLOW = "#F2C138" as const;
const GREEN = "#15653E" as const;

interface ChatRoomButtonProps {
  chatName: string;
  chatParticipant: number;
}

const ChatRoomButton: React.FC<ChatRoomButtonProps> = ({
  chatName,
  chatParticipant,
}) => {
  const chatDotColor =
    chatParticipant > 100 ? RED : chatParticipant > 50 ? YELLOW : GREEN;

  return (
    <button className={styles.chat_button}>
      <p className={styles.chat_name}>{chatName + " 오픈 채팅"}</p>

      <div className={styles.chat_status}>
        <div
          className={styles.status_dot}
          style={{ backgroundColor: chatDotColor }}
        ></div>
        <p className={styles.chat_explain}>{chatParticipant + "명 소통중"}</p>
      </div>
    </button>
  );
};

export default ChatRoomButton;
