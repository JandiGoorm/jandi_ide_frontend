import styles from "./SelectListButton.module.css";

//component
import Button from "../Button/Button";

// lang, company
interface SelectButtonListProps {
  listItem: string[];
  selectedItems: string[];
  onClickItem: (item: string) => void;
}

const SelectButtonList: React.FC<SelectButtonListProps> = ({
  listItem,
  selectedItems,
  onClickItem,
}) => {
  return (
    <div className={styles.itemButtons}>
      {/* 버튼 리스트 */}
      {listItem.map((item, index) => (
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
