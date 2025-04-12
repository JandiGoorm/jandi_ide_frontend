import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import styles from "./ChatMainLeft.module.css";
import LogoDemo from "../../../public/LogoDemo.png";

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

          <button className={styles.chat_button}>
            <p className={styles.chat_name}>네이버 오픈 채팅</p>
            <div className={styles.chat_status}>
              <div className={styles.status_dot}></div>
              <p className={styles.chat_explain}>2321명 소통중</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMainLeft;
