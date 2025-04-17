import LeftPart from "../../../layouts/Components/LeftPart";
import { buildTree } from "../../../utils/buildTree";
import styles from "./ProjectLeft.module.css";
import FileTree from "./Components/FileTree";
import Button from "../../../components/Button/Button";
import { Tree } from "../../../constants/types/types";

interface ProjectLeftProps {
  fileTree: Tree[] | null;
}

const ProjectLeft: React.FC<ProjectLeftProps> = ({ fileTree }) => {
  const fileData = fileTree ? buildTree(fileTree) : [];

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.project_name}> PROJECT 1 </div>
        <FileTree tree={fileData} />
        <Button style={{ marginTop: "2rem" }}>GitHub 보기</Button>
      </div>
    </LeftPart>
  );
};

export default ProjectLeft;
