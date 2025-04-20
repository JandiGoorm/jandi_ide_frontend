import { useNavigate } from "react-router-dom";
import styles from "./ChatRoomButton.module.css";
import { PageEndPoints } from "../../../../../constants/api";
import { buildPath } from "../../../../../utils/buildPath";

interface ChatRoomButtonProps {
  chatName: string;
  chatId: string;
}

const ChatRoomButton: React.FC<ChatRoomButtonProps> = ({
  chatName,
  chatId,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={styles.chat_button}
      onClick={() =>
        navigate(buildPath(PageEndPoints.CHAT_DETAIL, { id: chatId }))
      }
    >
      <p className={styles.chat_name}>{chatName + " 오픈 채팅"}</p>

      <div className={styles.chat_status}>
        <div className={styles.status_dot}></div>
      </div>
    </button>
  );
};

export default ChatRoomButton;
