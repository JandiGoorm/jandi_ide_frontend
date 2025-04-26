import Button from "../../../../../components/Button/Button";
import { Nullable } from "../../../../../constants/types/types";
import { useDarkModeContext } from "../../../../../contexts/DarkmodeContext";
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
    profileImage: Nullable<string>;
  };
}

const Chatting = ({ chat }: ChattingProps) => {
  const { isDarkMode } = useDarkModeContext();
  const noneUserImage = isDarkMode
    ? "/user_profile_green.png"
    : "/user_profile_yellow.png";

  const isEnterOrLeave = chat.type === "ENTER" || chat.type === "LEAVE";

  return (
    <div className={styles.chat_bubble}>
      {isEnterOrLeave ? (
        <div className={styles.center}>
          <div className={styles.enter_content}>
            <div className={styles.enter_name}>
              <img
                src={chat.profileImage ?? noneUserImage}
                alt="profile"
                className={styles.profile_img}
              />
              <div className={styles.enter_name_box}>
                <p className={styles.enter_name_text}>{chat.sender}</p>
                <p>
                  {chat.type === "ENTER"
                    ? " 님이 입장하셨습니다."
                    : " 님이 퇴장하셨습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.chat_content}>
          <div className={styles.chat_sub_info_box}>
            <div className={styles.chat_name_box}>
              <img
                src={chat.profileImage ?? noneUserImage}
                className={styles.profile_img}
              />
              <div className={styles.chat_name}>{chat.sender}</div>
            </div>
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
