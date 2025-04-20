import { Node } from "../../../../utils/buildTree";
import styles from "./FileTree.module.css";
import { useState } from "react";
import { FaFile, FaFolder } from "react-icons/fa";

type Props = {
  tree: Node[];
  selectedFile: string | null;
  setSelectedFile: (file: string | null) => void;
};

const FileTree: React.FC<Props> = ({ tree, selectedFile, setSelectedFile }) => {
  return (
    <ul className={styles.tree}>
      {tree.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      ))}
    </ul>
  );
};

type TreeNodeProps = {
  node: Node;
  selectedFile: string | null;
  setSelectedFile: (file: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selectedFile,
  setSelectedFile,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren =
    node.type === "tree" && node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      setSelectedFile(node.name); // 파일일 경우 선택 처리
    }
  };

  const isSelected = node.type === "blob" && node.name === selectedFile;

  return (
    <li>
      <div
        className={`${styles.node} ${node.type === "tree" ? styles.folder : styles.file} ${
          hasChildren ? (isOpen ? styles.expanded : styles.collapsed) : ""
        } ${isSelected ? styles.selected : ""}`}
        onClick={handleClick}
      >
        <span className={styles.icon}>
          {node.type === "tree" ? <FaFolder /> : <FaFile />}
        </span>
        <span className={styles.name}>{node.name}</span>
      </div>
      {hasChildren && isOpen && (
        <ul className={styles.tree}>
          {node.children!.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTree;
