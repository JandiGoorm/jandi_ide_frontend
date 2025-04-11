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
      {/* 버튼 리스트 */}
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

      {/* 경고 문구 */}
      {selectedItems.length === 0 && (
        <p className={styles.warning}>ERR: 최소 1개 이상 선택해야 합니다.</p>
      )}
    </div>
  );
};

export default SelectButtonList;
