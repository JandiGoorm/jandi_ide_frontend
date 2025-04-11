import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import styles from "./SimpleProfile.module.css";
import LogoDemo from "../../../public/LogoDemo.png";
import defaultUser from "../../../public/defaultUser.webp";

const SimpleProfile = () => {
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
          <div className={styles.UserInfo}>
            <img src={defaultUser} alt="Logo" className={styles.UserProfile} />
            <div>
              <p className={styles.UserIntro}>Lorem Ipsum...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleProfile;
