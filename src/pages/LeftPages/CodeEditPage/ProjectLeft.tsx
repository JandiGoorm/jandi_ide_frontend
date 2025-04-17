import LeftPart from "../../../layouts/Components/LeftPart";
import { buildTree } from "../../../utils/buildTree";
import styles from "./ProjectLeft.module.css";
import FileTree from "./Components/FileTree";
import Button from "../../../components/Button/Button";

const fileStructure: { path: string; type: "blob" | "tree" }[] = [
  { path: "index.html", type: "blob" },
  { path: "package.json", type: "blob" },
  { path: "src", type: "tree" },
  { path: "src/app.jsx", type: "blob" },
  { path: "src/app.css", type: "blob" },
  { path: "src/component", type: "tree" },
  { path: "src/component/Best.jsx", type: "blob" },
  { path: "src/component/BuyList.jsx", type: "blob" },
  { path: "src/component/Confirm.jsx", type: "blob" },
  { path: "src/component/Footer.jsx", type: "blob" },
];

const ProjectLeft = () => {
  const fileData = buildTree(fileStructure);

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
