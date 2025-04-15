import styles from "./ProjectEditPage.module.css";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import LeftSide from "../../../LeftPages/CodeEditPage/ProjectLeft";

const ProjectEditPage = () => {
  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          <div className={styles.container}>ㄴㄴ</div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default ProjectEditPage;
