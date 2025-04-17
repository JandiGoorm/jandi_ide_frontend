import styles from "./ProjectEditPage.module.css";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/CodeEditPage/ProjectLeft";
import Editor from "@monaco-editor/react";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";
import useAxios from "../../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { buildPath } from "../../../../utils/buildPath";
import { APIEndPoints } from "../../../../constants/api";
import { useParams } from "react-router-dom";
import { Tree } from "../../../../constants/types/types";

const ProjectEditPage = () => {
  const { isDarkMode } = useDarkModeContext();
  const { fetchData: getApi } = useAxios();
  const { id } = useParams<{ id: string }>();
  const [fileTree, setFileTree] = useState<Tree[]>([]);

  useEffect(() => {
    if (!id) return;

    getApi({
      method: "GET",
      url: buildPath(APIEndPoints.MANAGE_PROJECT, { id }),
    }).then((res) => {
      console.log(res?.data);
      setFileTree(res?.data.tree);
    });
  }, [getApi]);
  return (
    <BaseLayout>
      <Sidebar.Provider className={styles.Code_layout}>
        <Sidebar.Panel>
          <LeftSide fileTree={fileTree} />
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
