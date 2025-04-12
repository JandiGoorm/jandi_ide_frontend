import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sidebar,
  useSidebar,
} from "../../../../layouts/SidebarLayout/SidebarLayout";
import styles from "./ChatMainLeft.module.css";
import LogoDemo from "../../../../../public/LogoDemo.png";

//components
import ChatRoomButton from "./components/ChatRoomButton";

const ChatMainLeft = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={styles.sidebar}>
      <div className={clsx(styles.top_section, isOpen && styles.open)}>
        <div className={styles.menu}>
          <div className={styles.icon_box}>
            <GiHamburgerMenu size={28} />
          </div>

          {isOpen && (
            <div className={styles.logo_box}>
              <img src={LogoDemo} alt="Logo" className={styles.logo} />
            </div>
          )}
        </div>

        <Sidebar.ToggleButton className={styles.toggle_button}>
          {(isOpen) =>
            isOpen ? (
              <div className={styles.icon_box}>
                <FaLongArrowAltLeft size={20} />
                <p>접기</p>
              </div>
            ) : (
              <div className={styles.icon_box}>
                <FaLongArrowAltRight size={20} />
                <p>열기</p>
              </div>
            )
          }
        </Sidebar.ToggleButton>
      </div>

      {isOpen && (
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
      )}
    </div>
  );
};

export default ChatMainLeft;
