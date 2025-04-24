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
import { useState } from "react";
import { PageEndPoints } from "../../constants/api";

import { AiFillHome } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

interface LeftLayoutProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const menuItems = [
  // 아직 소개 공간이 없어서 임의 공간으로 이동
  { key: "채용 달력", navi: PageEndPoints.HOME },
  { key: "코딩 테스트", navi: PageEndPoints.ALGO_MAIN },
  { key: "오픈 채팅방", navi: PageEndPoints.CHAT_MAIN },
  { key: "나의 관심 기업", navi: PageEndPoints.MY_COMPANY },
  { key: "나의 프로젝트", navi: PageEndPoints.MY_PROJECT },
  { key: "코딩 문제집", navi: PageEndPoints.MY_ALGO },
];

const LeftPart: React.FC<LeftLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebar();
  const { isDarkMode } = useDarkModeContext();
  const logo = isDarkMode ? "/logo_white.png" : "/logo_black.png";
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { signOut } = useAuth();

  const handleLogout = () => {
    // 로그아웃 진행...
    signOut();
    // 로그아웃 후 랜딩 페이지로 이동
    navigate(PageEndPoints.HOME);
  };

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
                <div className={styles.drawer_body}>
                  <div className={styles.line}>
                    {hoveredIndex !== null && (
                      <div
                        className={styles.indicator}
                        style={{
                          top: `${hoveredIndex * 2.3}rem`, // 메뉴 위치에 맞게 조정
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.navi}>
                    {menuItems.map((item, idx) => (
                      <div
                        key={item.key}
                        className={clsx(
                          styles.menu_item,
                          hoveredIndex === idx && styles.active
                        )}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => navigate(item.navi)}
                      >
                        {item.key}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.drawer_footer}>
                  <Tooltip text={"마이 페이지"}>
                    <p
                      className={styles.drawer_icon}
                      onClick={() => navigate(PageEndPoints.MYPAGE)}
                    >
                      <AiFillHome />
                    </p>
                  </Tooltip>
                  <Tooltip text={"설정"}>
                    <p
                      className={styles.drawer_icon}
                      onClick={() => navigate(PageEndPoints.SETTING)}
                    >
                      <MdSettings />
                    </p>
                  </Tooltip>
                  <Tooltip text={"로그아웃"}>
                    <p
                      className={styles.drawer_icon}
                      // 아직 로그아웃이 없어서 임의 공간으로 이동
                      onClick={handleLogout}
                    >
                      <MdLogout />
                    </p>
                  </Tooltip>
                </div>
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
