import styles from "./ProjectEditPage.module.css";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/CodeEditPage/ProjectLeft";
import Editor from "@monaco-editor/react";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProjectDetails from "../../../../hooks/useProjectDetails";

const ProjectEditPage = () => {
  const { isDarkMode } = useDarkModeContext();
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : undefined;
  const { projectFileTree, fileContent, projectLink, getProjectCode } =
    useProjectDetails({
      id: numericId as number,
    });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !selectedFile) return;

    const matchedFile = projectFileTree.find((file) => {
      const fileName = file.path.split("/").pop();
      return fileName === selectedFile;
    });

    console.log(matchedFile);
    if (!matchedFile) return;

    const fethchCodes = async (sha: string) => {
      if (!sha) return;

      await getProjectCode({ sha });
    };

    fethchCodes(matchedFile.sha);
  }, [selectedFile, id, projectFileTree, getProjectCode]);

  return (
    <BaseLayout>
      <Sidebar.Provider className={styles.Code_layout}>
        <Sidebar.Panel>
          <LeftSide
            fileTree={projectFileTree}
            selectedFile={selectedFile}
            projectLink={projectLink ?? null}
            setSelectedFile={setSelectedFile}
          />
        </Sidebar.Panel>

        <Sidebar.Content fullWidth>
          <div className={styles.container}>
            <Editor
              height="100%"
              theme={isDarkMode ? "vs-dark" : "light"}
              defaultLanguage="java"
              path="file.java"
              value={fileContent}
              options={{
                readOnly: true,
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
