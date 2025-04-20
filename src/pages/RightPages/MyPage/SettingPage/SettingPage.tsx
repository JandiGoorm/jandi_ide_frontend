import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import styles from "./SettingPage.module.css";
import defaultUser from "../../../../../public/defaultUser.webp";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import SelectButtonList from "../../../../components/SelectListButton/SelectListButton";
import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useUserSetting from "../../../../hooks/useUserSetting";

const SettingPage = () => {
  const { user } = useAuth();
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [nickname, setNickname] = useState(user.nickName || "");
  const [introduction, setIntroduction] = useState(user.nickName || "");

  const { modifyUser } = useUserSetting(); // 유저 정보 수정 API

  // 언어 버튼 클릭 시 selectedLangs에 추가 or 삭제
  const handleLanguageClick = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // 닉네임 수정
  const handleUpdateNickname = async () => {
    if (!user) return;

    console.log("변경할 닉네임:", nickname);
    await modifyUser(user.id, {
      introduction: user.introduction,
      email: user.email,
      nickname: nickname,
      profileImage: user.profileImage,
    });
  };

  const handleUpdateIntro = async () => {
    if (!user) return;
    console.log("변경할 소개글:", introduction);
    await modifyUser(user.id, {
      introduction: introduction,
      email: user.email,
      nickname: nickname,
      profileImage: user.profileImage,
    });
  };

  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide user={user} />
      </Sidebar.Panel>

      <Sidebar.Content header={<BasicHeader />}>
        <div className={styles.content}>
          <div className={styles.basicInfo_container}>
            <div className={styles.basicInfo_header}>
              <p className={styles.title}>기본정보 수정</p>
              <Button onClick={handleUpdateNickname}>닉네임 변경</Button>
            </div>
            <div className={styles.basicInfo_content}>
              <Input
                style={{
                  boxSizing: "border-box",
                  width: "40%",
                  minWidth: "15rem",
                }}
                inputSize="lg"
                value={user.email}
                readOnly
              />
              <Input
                style={{
                  boxSizing: "border-box",
                  width: "30%",
                  minWidth: "10rem",
                }}
                inputSize="lg"
                onChange={(e) => setNickname(e.target.value)}
                placeholder={user.nickName}
              />
            </div>
          </div>
          <div className={styles.selectLanguage_container}>
            <div className={styles.basicInfo_header}>
              <p className={styles.title}>선호 언어 선택</p>
              <Button>언어 변경 완료</Button>
            </div>
            <div className={styles.selectLanguage_content}>
              <SelectButtonList
                type={"lang"}
                selectedItems={selectedLangs}
                onClickItem={handleLanguageClick}
              />
            </div>
          </div>
          <div className={styles.profileModify_container}>
            <div className={styles.basicInfo_header}>
              <p className={styles.title}>프로필 수정</p>
              <div className={styles.basicInfo_button_div}>
                <Button>프로필 초기화</Button>
                <Button onClick={handleUpdateIntro}>소개글 변경</Button>
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
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder={
                    user.introduction
                      ? user.introduction
                      : "자기소개를 적어주세요!"
                  }
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
