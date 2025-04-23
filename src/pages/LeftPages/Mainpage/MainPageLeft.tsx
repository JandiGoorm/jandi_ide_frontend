import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import LeftPart from "../../../layouts/Components/LeftPart";
import LangTag from "./components/LangTag";
import Button from "../../../components/Button/Button";
import { User } from "../../../constants/types/types";
import { PageEndPoints } from "../../../constants/api";

interface MainPageLeftProps {
  user: User | null;
}

const MainPageLeft: React.FC<MainPageLeftProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <LeftPart>
      <div className={styles.container}>
        {/* 유저 프로필 */}
        {user && (
          <>
            <div className={styles.info}>
              <img className={styles.user_profile} src={user.profileImage} />
              <p className={styles.user_name}>{user.nickName}</p>
              <p className={styles.user_email}>{user.email}</p>
            </div>
            <hr />

            {/* 유저 설명란 */}
            <div className={styles.explains}>
              <p className={styles.user_intro}>{user.introduction}</p>
            </div>
            <hr />

            {/* 유저 선호언어 */}
            <div>
              <LangTag langList={user.techStacks} />
            </div>

            {/* 버튼 */}
            <div className={styles.button_list}>
              <Button
                onClick={() => {
                  navigate(PageEndPoints.CHAT_MAIN);
                }}
              >
                오픈채팅 가기
              </Button>
              <Button
                onClick={() => {
                  navigate(PageEndPoints.ALGO_MAIN);
                }}
              >
                알고리즘 문제풀기
              </Button>
              <Button
                onClick={() => {
                  navigate(PageEndPoints.MYPAGE);
                }}
              >
                내 프로필 보기
              </Button>
              <Button
                onClick={() => {
                  navigate(PageEndPoints.SETTING);
                }}
              >
                회원 정보 수정
              </Button>
            </div>
          </>
        )}
      </div>
    </LeftPart>
  );
};

export default MainPageLeft;
