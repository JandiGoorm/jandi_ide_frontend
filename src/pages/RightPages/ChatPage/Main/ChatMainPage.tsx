import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/ChatMainLeft";
import styles from "./ChatMainPage.module.css";

const ChatMainPage = () => {
  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content>
          <div className={styles.content}>예시 페이지 입니다.</div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default ChatMainPage;
