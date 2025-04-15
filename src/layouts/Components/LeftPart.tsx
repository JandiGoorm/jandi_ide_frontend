import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../SidebarLayout/SidebarLayout";
import styles from "./LeftPart.module.css";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "../../components/Drawer/Drawer";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../components/Tooltip/Tooltip";

interface LeftLayoutProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const LeftPart: React.FC<LeftLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebar();
  const { isDarkMode } = useDarkModeContext();
  const logo = isDarkMode ? "/logo_white.png" : "/logo_black.png";
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div className={clsx(styles.top_section, isOpen && styles.open)}>
        <div className={styles.menu}>
          <div className={styles.icon_box}>
            <Drawer>
              <DrawerTrigger>
                <GiHamburgerMenu size={28} style={{ cursor: "pointer" }} />
              </DrawerTrigger>
              <DrawerContent>
                <div>d</div>
              </DrawerContent>
            </Drawer>
          </div>

          {isOpen && (
            <div className={styles.logo_box}>
              <img
                src={logo}
                alt="Logo"
                className={styles.logo}
                onClick={() => navigate("/")}
              />
            </div>
          )}
        </div>

        <Sidebar.ToggleButton className={styles.toggle_button}>
          {(isOpen) =>
            isOpen ? (
              <div className={styles.icon_box}>
                <Tooltip text="접기">
                  <FaLongArrowAltLeft size={20} />
                </Tooltip>
              </div>
            ) : (
              <div className={styles.icon_box}>
                <Tooltip text="열기">
                  <FaLongArrowAltRight size={20} />
                </Tooltip>
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
