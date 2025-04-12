import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import styles from "./ChatDetailLeft.module.css";
import LogoDemo from "../../../public/LogoDemo.png";

const ChatDetailLeft = () => {
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
            <div className={styles.title}>Share Your</div>
            <div className={styles.title}>thinking!</div>
            <div className={styles.sub_title}>OOO 채팅방에 입장하셨습니다.</div>
          </div>
          <div className={styles.chat_count_div}>현재 2345명 채팅중</div>
        </div>
      )}
    </div>
  );
};

export default ChatDetailLeft;
