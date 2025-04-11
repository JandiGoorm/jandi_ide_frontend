import styles from "./SelectListButton.module.css";

//component
import Button from "../Button/Button";

interface SelectButtonListProps {
  type: string;
  selectedItems: string[];
  onClickItem: (item: string) => void;
}

const languageList = [
  "Python",
  "C/C++",
  "JavaScript",
  "C#",
  "Go",
  "Fortran",
  "Delphi/Object Pascal",
  "SQL",
  "MATLAB",
  "Rust",
  "R",
  "Ruby",
];
const companyList = [
  "삼성전자",
  "네이버",
  "카카오",
  "라인플러스",
  "우아한형제들",
  "구글",
  "애플",
  "아마존",
  "마이크로소프트",
  "메타",
  "하이퍼커넥트",
  "비바리퍼블리카",
  "당근마켓",
];

const SelectButtonList: React.FC<SelectButtonListProps> = ({
  type,
  selectedItems,
  onClickItem,
}) => {
  const list = type == "lang" ? languageList : companyList;
  return (
    <div className={styles.itemButtons}>
      {list.map((item, index) => (
        <Button
          key={index}
          variant="lang"
          onClick={() => onClickItem(item)}
          isClicked={selectedItems.includes(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default SelectButtonList;
