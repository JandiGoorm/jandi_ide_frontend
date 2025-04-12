import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sidebar,
  useSidebar,
} from "../../../layouts/SidebarLayout/SidebarLayout";
import styles from "./MainPage.module.css";
import LogoDemo from "../../../../public/LogoDemo.png";
import LangTag from "./components/LangTag";
import Button from "../../../components/Button/Button";
import { useDarkModeContext } from "../../../contexts/DarkmodeContext";

const MainPageLeft = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { isDarkMode } = useDarkModeContext();
  const userData = {
    profile: isDarkMode
      ? "/user_profile_green.png"
      : "/user_profile_yellow.png",
    name: "User name",
    email: "useremail@exaple.com",
    intro:
      "작은 기능 하나에도 이유를 담고 싶습니다. 개발은 저에게 단순한 구현이 아니라, 끊임없이 배우고 성장하는 과정입니다. 기록과 공유를 통해 더 나은 개발자가 되기 위해 꾸준히 나아가고 있습니다. 오늘보다 나은 내일의 나를 꿈꿉니다.",
    lang: ["#Python", "#Java", "#C/C++"],
  };

  const handleLogout = () => {
    // 로그아웃 진행...

    // 로그아웃 후 랜딩 페이지로 이동
    navigate("/");
  };

  const handleSetting = () => {
    // 설정 페이지로 이동
    navigate("/mypage");
  };

  const handleViewProfile = () => {
    // 프로필 페이지로 이동
    navigate("/mypage/profile");
  };

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
          {/* 유저 프로필 */}
          <div className={styles.info}>
            <img className={styles.user_profile} src={userData.profile} />
            <p className={styles.user_name}>{userData.name}</p>
            <p className={styles.user_email}>{userData.email}</p>
          </div>
          <hr />

          {/* 유저 설명란 */}
          <div className={styles.explains}>
            <p className={styles.user_intro}>{userData.intro}</p>
          </div>
          <hr />

          {/* 유저 선호언어 */}
          <div>
            <LangTag className={styles.user_langs} langList={userData.lang} />
          </div>

          {/* 버튼 */}
          <div className={styles.button_list}>
            <Button onClick={handleLogout}>로그아웃</Button>
            <Button onClick={handleSetting}>회원 정보 수정</Button>
            <Button onClick={handleViewProfile}>내 프로필 보기</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPageLeft;
