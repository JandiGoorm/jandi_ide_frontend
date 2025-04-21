import styles from "./CodeTestPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";

//components
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/CodeTestPage/CodeTestLeft";
import Editor from "@monaco-editor/react";
import Button from "../../../../components/Button/Button";

const CodeTestPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 현재 문제집 번호
  const { isDarkMode } = useDarkModeContext();
  const [totalSeconds, setTotalSeconds] = useState(1800); // 전체 시간: 초 단위
  const minutes = Math.floor(totalSeconds / 60); // 환산된 분
  const seconds = totalSeconds % 60; // 환산된 초
  const formatTime = (time: number) => String(time).padStart(2, "0");

  // 남은 시간에 따라 색상 변경
  const getBorderColor = (minutes: number) => {
    if (minutes < 10) return "#E74C3C";
    if (minutes < 30) return "#F2C138";
    return "#1BF0A2";
  };

  // 타이머 카운트
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //버튼 핸들러
  const handleExit = () => {
    const confirmEnd = confirm("정말 종료하시겠습니까?");
    if (confirmEnd) {
      navigate(`/mypage/problem/${id}`);
    }
  };
  const handleStore = () => {
    console.log("코드 저장!");
    // 코드 저장...
  };
  const handleRun = () => {
    console.log("코드 실행!");
    // 코드 실행...
  };
  const handleSubmit = () => {
    console.log("코드 제출!");
    // 코드 제출...
  };

  return (
    <BaseLayout>
      <Sidebar.Provider className={styles.Code_layout}>
        <Sidebar.Panel>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content fullWidth>
          <div className={styles.container}>
            {/* 헤더 - 시간, 종료버튼 */}
            <div className={styles.code_header}>
              <div
                className={styles.timer}
                style={{ borderColor: getBorderColor(minutes) }}
              >
                {formatTime(minutes)}:{formatTime(seconds)}
              </div>
              <Button onClick={handleExit}>종료</Button>
            </div>

            {/* 코드 편집기 */}
            <div className={styles.code_body}>
              <Editor
                height="100%"
                theme={isDarkMode ? "vs-dark" : "light"}
                defaultLanguage="java"
                path="file.java"
                options={{
                  minimap: {
                    enabled: true,
                  },
                }}
              />
            </div>

            {/* 코드 실행기 */}
            <div className={styles.footer}>
              <div className={styles.buttons}>
                <Button onClick={handleStore}>저장</Button>
                <Button onClick={handleRun}>실행</Button>
                <Button onClick={handleSubmit}>제출</Button>
              </div>
              <div className={styles.result}>
                <p>결과결과</p>
              </div>
            </div>
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default CodeTestPage;
