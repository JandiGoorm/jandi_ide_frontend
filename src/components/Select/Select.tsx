import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

interface CustomSelectProps {
  options: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  options,
  value,
  defaultValue,
  onChange,
}: CustomSelectProps) => {
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

  // 클릭 바깥 감지 → 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
};

export default Select;
