import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/SimpleProfile";
import styles from "./SettingPage.module.css";
import defaultUser from "../../../../../public/defaultUser.webp";
import BasicHeader from "../../../../layouts/Components/BasicHeader";

const languageList = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Go",
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Go",
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Go",
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Go",
  "Java",
];

const SettingPage = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide />
      </Sidebar.Panel>

      <Sidebar.Content header={<BasicHeader />}>
        <div className={styles.content}>
          <div className={styles.basicInfo_container}>
            <div className={styles.basicInfo_header}>
              <p>기본정보 수정</p>
              <Button>닉네임 변경</Button>
            </div>
            <div className={styles.basicInfo_content}>
              <Input
                style={{
                  boxSizing: "border-box",
                  width: "30%",
                }}
                inputSize="lg"
                placeholder="Email"
              />
              <Input
                style={{
                  boxSizing: "border-box",
                  width: "20%",
                }}
                inputSize="lg"
                placeholder="UserName"
              />
            </div>
          </div>
          <div className={styles.selectLanguage_container}>
            <div className={styles.basicInfo_header}>
              <p>선호 언어 선택</p>
              <Button>언어 변경 완료</Button>
            </div>
            <div className={styles.selectLanguage_content}>
              {languageList.map((lang) => (
                <Button key={lang} variant="lang">
                  {lang}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.profileModify_container}>
            <div className={styles.basicInfo_header}>
              <p>프로필 수정</p>
              <div className={styles.basicInfo_button_div}>
                <Button>프로필 초기화</Button>
                <Button>소개글 변경</Button>
              </div>
            </div>
            <div className={styles.profileModify_content}>
              <div className={styles.profile_image_div}>
                <img
                  src={defaultUser}
                  alt="Logo"
                  className={styles.UserProfile}
                />
              </div>
              <div className={styles.profile_description}>
                <textarea
                  className={styles.description_content}
                  placeholder="자기소개를 적어주세요!"
                />
              </div>
            </div>
          </div>
          <div className={styles.userDelete_conainer}>
            <Button>탈퇴하기</Button>
          </div>
        </div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default SettingPage;
