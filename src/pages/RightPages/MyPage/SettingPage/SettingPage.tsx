import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import styles from "./SettingPage.module.css";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import SelectButtonList from "../../../../components/SelectListButton/SelectListButton";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useUserSetting from "../../../../hooks/useUserSetting";
import useTech from "../../../../hooks/useTech";
import { useToast } from "../../../../contexts/ToastContext";
import { PageEndPoints } from "../../../../constants/api";
import {
  Modal,
  ModalTrigger,
  ModalContent,
} from "../../../../components/Modal/Modal";

const SettingPage = () => {
  const { user, refreshUser } = useAuth();
  const { techs } = useTech();
  const { getFavoriteTech, favoriteTech, deleteUser } = useUserSetting();
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [nickname, setNickname] = useState(user?.nickName || "");
  const [introduction, setIntroduction] = useState(user?.nickName || "");
  const maxLength = 500;
  const { createToast } = useToast();

  const { modifyUser } = useUserSetting(); // 유저 정보 수정 API

  // 언어 버튼 클릭 시 selectedLangs에 추가 or 삭제
  const handleLanguageClick = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  useEffect(() => {
    getFavoriteTech().then(setSelectedLangs);
  }, [getFavoriteTech]);

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
    refreshUser();
  };

  // 소개글 수정
  const handleUpdateIntro = async () => {
    if (!user) return;
    console.log("변경할 소개글:", introduction);
    await modifyUser(user.id, {
      introduction: introduction,
      email: user.email,
      nickname: user.nickName,
      profileImage: user.profileImage,
    });
    refreshUser();
  };

  const handleUpdateLang = async () => {
    console.log("dd");
    if (!user) return;
    await favoriteTech(selectedLangs);

    refreshUser();
  };

  const handleLeave = async () => {
    if (!user) return;
    try {
      await deleteUser(user.id);

      window.location.href = PageEndPoints.HOME;
    } catch {
      createToast({ type: "error", text: "회원탈퇴에 실패하였습니다!" });
    }
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
                value={user?.email}
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
                placeholder={user?.nickName}
              />
            </div>
          </div>
          <div className={styles.selectLanguage_container}>
            <div className={styles.basicInfo_header}>
              <p className={styles.title}>선호 언어 선택</p>
              <Button onClick={handleUpdateLang}>언어 변경 완료</Button>
            </div>
            <div className={styles.selectLanguage_content}>
              <SelectButtonList
                listItem={techs.map((t) => t.techStack)}
                selectedItems={selectedLangs}
                onClickItem={handleLanguageClick}
              />
            </div>
          </div>
          <div className={styles.profileModify_container}>
            <div className={styles.basicInfo_header}>
              <p className={styles.title}>프로필 수정</p>
              <div className={styles.basicInfo_button_div}>
                <Button onClick={handleUpdateIntro}>소개글 변경</Button>
              </div>
            </div>
            <div className={styles.profileModify_content}>
              <div className={styles.profile_image_div}>
                <img
                  src={user?.profileImage}
                  alt="Logo"
                  className={styles.UserProfile}
                />
              </div>
              <div className={styles.profile_description}>
                <div className={styles.textLengthBox}>
                  <p>{introduction.length}자</p>
                  <p> / </p>
                  <p>{maxLength}자</p>
                </div>
                <textarea
                  className={styles.description_content}
                  onChange={(e) => setIntroduction(e.target.value)}
                  maxLength={maxLength} //글자수 제한
                  placeholder={
                    user?.introduction
                      ? user.introduction
                      : "자기소개를 적어주세요!"
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.userDelete_conainer}>
            <Modal>
              <ModalTrigger>
                <Button>탈퇴하기</Button>
              </ModalTrigger>
              <ModalContent>
                <div className={styles.modal_container}>
                  <div className={styles.modal_title}>
                    정말 탈퇴하시겠습니까?
                  </div>
                  <div className={styles.modal_button}>
                    <Button onClick={handleLeave}> 탈퇴하기 </Button>
                    <Button> 아니요 </Button>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default SettingPage;
