import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import styles from "./MainPage.module.css";
import BasicHeader from "../../../../layouts/Components/BasicHeader";

const MainPage = () => {
  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          <div className={styles.chatGuidelines}>
            <div className={styles.contents}></div>
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
