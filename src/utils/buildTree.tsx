import { Tree } from "../constants/types/types"; // Tree 타입 불러온다고 가정

export type Node = {
  name: string;
  type: "blob" | "tree";
  children?: Node[];
};

export const buildTree = (items: Tree[]): Node[] => {
  const root: Node[] = [];

  for (const item of items) {
    // 타입 안전하게 처리
    const type =
      item.type === "tree" || item.type === "blob" ? item.type : "blob";
    const parts = item.path.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      const existing = currentLevel.find((node) => node.name === part);

      if (existing) {
        if (!existing.children) {
          existing.children = [];
        }
        currentLevel = existing.children;
      } else {
        const newNode: Node = {
          name: part,
          type: index === parts.length - 1 ? type : "tree",
        };
        if (newNode.type === "tree") {
          newNode.children = [];
        }

        currentLevel.push(newNode);

        if (newNode.children) {
          currentLevel = newNode.children;
        }
      }
    });
  }

  return root;
};
