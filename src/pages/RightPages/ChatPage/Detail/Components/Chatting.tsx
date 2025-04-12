import Button from "../../../../../components/Button/Button";
import styles from "./Chatting.module.css";
import { MdMoreHoriz } from "react-icons/md";

interface ChattingProps {
  chat: {
    id: number;
    profileImage: string;
    username: string;
    message: string;
    date: string;
    isMine: boolean;
  };
}

const Chatting = ({ chat }: ChattingProps) => {
  return (
    <div className={`${styles.chat_bubble}`}>
      <img
        src={chat.profileImage}
        alt="profile"
        className={styles.profile_img}
      />
      <div className={styles.chat_content}>
        <div className={styles.chat_sub_info_box}>
          <div className={styles.chat_name}>{chat.username}</div>
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
          <div className={styles.chat_date}>{chat.date}</div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
