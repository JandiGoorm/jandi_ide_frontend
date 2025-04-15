export type Node = {
  name: string;
  type: "blob" | "tree";
  children?: Node[];
};

export const buildTree = (
  items: { path: string; type: "blob" | "tree" }[]
): Node[] => {
  const root: Node[] = [];

  for (const item of items) {
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
          type: index === parts.length - 1 ? item.type : "tree",
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
