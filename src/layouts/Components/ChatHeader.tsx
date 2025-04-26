import styles from "./ChatHeader.module.css";
import React from "react";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import clsx from "clsx";
import { IoSearch } from "react-icons/io5";

const ChatHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <div className={styles.container}>
      <div className={styles.Input_div}>
        <Input
          style={{ width: "80%", height: "2.5rem" }}
          inputSize="sm"
          placeholder="검색할 단어를 입력하세요"
        />
        <Button
          size="sm"
          style={{
            height: "2.5rem",
          }}
        >
          <IoSearch size={24} color="white" />
        </Button>
      </div>

      <div className={styles.switchContainer}>
        <div
          className={clsx(styles.switch, isDarkMode && styles.switchOn)}
          onClick={toggleDarkMode}
        >
          <div className={styles.switchHandle}>
            {isDarkMode ? (
              <FaMoon size={16} color={"white"} />
            ) : (
              <FaSun size={16} color={"white"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
