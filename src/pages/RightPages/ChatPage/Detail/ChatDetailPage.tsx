import styles from "./ChatDetailPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/ChatDetailLeft";

const ChatDetailPage = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide />
      </Sidebar.Panel>

      <Sidebar.Content>
        <div>dd</div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default ChatDetailPage;
