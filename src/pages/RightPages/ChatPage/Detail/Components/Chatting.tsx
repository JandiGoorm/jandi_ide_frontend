import Button from "../../../../../components/Button/Button";
import { formatDay } from "../../../../../utils/format";
import styles from "./Chatting.module.css";
import { MdMoreHoriz } from "react-icons/md";

interface ChattingProps {
  chat: {
    type: string; // 문자열로 변경 (enum값 사용)
    roomId: string;
    sender: string;
    message: string;
    timestamp: string;
  };
}

const Chatting = ({ chat }: ChattingProps) => {
  return (
    <div className={`${styles.chat_bubble}`}>
      {chat.type === "ENTER" ? (
        <div className={styles.chat_content}>
          <div className={styles.enter_name}>
            {chat.sender}님이 접속하셨습니다.
          </div>
        </div>
      ) : (
        <div className={styles.chat_content}>
          <div className={styles.chat_sub_info_box}>
            <div className={styles.chat_name}>{chat.sender}</div>
            <div>
              <Button size="lg" variant="none">
                <MdMoreHoriz />
              </Button>
            </div>
          </div>
          <div className={styles.chat_text}>{chat.message}</div>
          <div className={styles.chat_sub_info_box}>
            <div>
              <Button size="lg" variant="none">
                +
              </Button>
            </div>
            <div className={styles.chat_date}>{formatDay(chat.timestamp)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatting;
