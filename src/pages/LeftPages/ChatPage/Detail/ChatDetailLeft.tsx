import styles from "./ChatDetailLeft.module.css";
import LeftPart from "../../../../layouts/Components/LeftPart";
import { ChatRoom } from "../../../../constants/types/types";

interface ChatDetailLeftProps {
  chatRoomInfo: ChatRoom | null;
}
const ChatDetailLeft: React.FC<ChatDetailLeftProps> = ({ chatRoomInfo }) => {
  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.title_div}>
          <div className={styles.title}>Share Your</div>
          <div className={styles.title}>thinking!</div>
          <div className={styles.sub_title}>
            {chatRoomInfo?.name} 채팅방에 입장하셨습니다.
          </div>
        </div>
        <div className={styles.chat_count_div}>현재 2345명 채팅중</div>
      </div>
    </LeftPart>
  );
};

export default ChatDetailLeft;
