import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../SidebarLayout/SidebarLayout";
import styles from "./LeftPart.module.css";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";

interface LeftLayoutProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const LeftPart: React.FC<LeftLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebar();
  const { isDarkMode } = useDarkModeContext();
  const logo = isDarkMode ? "/logo_white.png" : "/logo_black.png";

  return (
    <div className={styles.sidebar}>
      <div className={clsx(styles.top_section, isOpen && styles.open)}>
        <div className={styles.menu}>
          <div className={styles.icon_box}>
            <GiHamburgerMenu size={28} />
          </div>

          {isOpen && (
            <div className={styles.logo_box}>
              <img src={logo} alt="Logo" className={styles.logo} />
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

      <div className={styles.contents}>{isOpen && children}</div>
    </div>
  );
};

export default LeftPart;
