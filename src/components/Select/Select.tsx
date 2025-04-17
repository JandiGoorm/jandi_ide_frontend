import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./Select.module.css";

interface CustomSelectProps {
  options: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

// 부모에서 사용할 ref의 타입 정의
export interface SelectRef {
  value: string;
}

const Select = forwardRef<SelectRef, CustomSelectProps>(
  ({ options, value, defaultValue, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue || options[0]);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value !== undefined) {
        setSelected(value);
      }
    }, [value]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
      setSelected(option);
      setIsOpen(false);
      onChange?.(option);
    };

    // 여기에서 부모가 ref로 접근할 수 있게 설정
    useImperativeHandle(ref, () => ({
      value: selected,
    }));

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className={styles.selectContainer} ref={selectRef}>
        <div className={styles.selected} onClick={toggleDropdown}>
          {selected}
          <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <ul className={styles.optionList}>
            {options.map((option, idx) => (
              <li
                key={idx}
                className={`${styles.option} ${
                  option === selected ? styles.selectedOption : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Select;
