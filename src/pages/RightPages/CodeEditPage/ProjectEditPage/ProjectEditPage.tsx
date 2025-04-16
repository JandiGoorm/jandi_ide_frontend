import styles from "./ProjectEditPage.module.css";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/CodeEditPage/ProjectLeft";
import Editor from "@monaco-editor/react";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";

const ProjectEditPage = () => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <BaseLayout>
      <Sidebar.Provider className={styles.Code_layout}>
        <Sidebar.Panel>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content fullWidth>
          <div className={styles.container}>
            <Editor
              height="100%"
              theme={isDarkMode ? "vs-dark" : "light"}
              defaultLanguage="java"
              path="file.java"
              options={{
                // readOnly: true,
                minimap: {
                  enabled: true,
                },
              }}
            />
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default ProjectEditPage;
