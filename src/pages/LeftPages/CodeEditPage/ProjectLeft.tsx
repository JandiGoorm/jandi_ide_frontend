import LeftPart from "../../../layouts/Components/LeftPart";
import { buildTree } from "../../../utils/buildTree";
import styles from "./ProjectLeft.module.css";
import FileTree from "./Components/FileTree";
import Button from "../../../components/Button/Button";
import { Tree } from "../../../constants/types/types";

interface ProjectLeftProps {
  fileTree: Tree[] | null;
  selectedFile: string | null;
  projectLink: string | null;
  setSelectedFile: (file: string | null) => void;
}

const ProjectLeft: React.FC<ProjectLeftProps> = ({
  fileTree,
  selectedFile,
  projectLink,
  setSelectedFile,
}) => {
  const fileData = fileTree ? buildTree(fileTree) : [];

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.project_name}> PROJECT 1 </div>
        <FileTree
          tree={fileData}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <Button
          style={{ marginTop: "2rem" }}
          onClick={() => {
            if (projectLink) {
              window.open(projectLink, "_blank");
            }
          }}
        >
          GitHub 보기
        </Button>
      </div>
    </LeftPart>
  );
};

export default ProjectLeft;
