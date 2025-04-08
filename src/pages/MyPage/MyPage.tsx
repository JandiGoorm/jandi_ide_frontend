import { Sidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "./LeftSide";
import styles from "./Mypage.module.css";

const MyPage = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.panner}>
        <LeftSide />
      </Sidebar.Panel>

      <Sidebar.Content>
        <div className={styles.content}>예시 페이지 입니다.</div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default MyPage;
