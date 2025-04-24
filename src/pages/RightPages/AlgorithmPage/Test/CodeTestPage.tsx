import styles from "./CodeTestPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/CodeTestPage/CodeTestLeft";
import Editor from "@monaco-editor/react";
import Button from "../../../../components/Button/Button";
import useBaskets from "../../../../hooks/useBaskets";
import {
  CompilerResponse,
  ProblemInfo,
} from "../../../../constants/types/types";
import {
  getEditorLanguage,
  getFilePath,
  getDefaultCode,
} from "../../../../utils/codeTestSet";
import { useAuth } from "../../../../contexts/AuthContext";
import useCodeTest from "../../../../hooks/useCodeTest";
import { LuLoader } from "react-icons/lu";
import { highlightErrorText } from "../../../../utils/resultText";
import { buildPath } from "../../../../utils/buildPath";
import { PageEndPoints } from "../../../../constants/api";

const CodeTestPage = () => {
  const navigate = useNavigate();
  const { getBasket } = useBaskets();
  const { getResult, getSubmitResult } = useCodeTest();
  const { user } = useAuth();
  const { id } = useParams(); // 현재 문제집 번호
  const basketId = Number(id);
  const { isDarkMode } = useDarkModeContext();
  const [totalSeconds, setTotalSeconds] = useState(0); // 전체 시간: 초 단위
  const minutes = Math.floor(totalSeconds / 60); // 환산된 분
  const seconds = totalSeconds % 60; // 환산된 초
  const formatTime = (time: number) => String(time).padStart(2, "0");
  const [solvingTime, setSolvingTime] = useState<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [language, setLanguage] = useState<string>();
  const editorLanguage = getEditorLanguage(language || "");
  const filePath = getFilePath(language || "");
  const [currentIndex, setCurrentIndex] = useState(0);
  //각각 문제 및 결과 각각 저장
  const [problemCodeMap, setProblemCodeMap] = useState<{
    [id: number]: string;
  }>({});
  const [problemResultMap, setProblemResultMap] = useState<{
    [id: number]: CompilerResponse;
  }>({});

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && problems[currentIndex]) {
      const id = problems[currentIndex].id;
      setProblemCodeMap((prev) => ({ ...prev, [id]: value }));
    }
  };

  useEffect(() => {
    const getProblem = async () => {
      const data = await getBasket(basketId);
      console.log(data);
      setTotalSeconds(data.solvingTimeInMinutes * 60);
      setSolvingTime(data.solvingTimeInMinutes);
      setProblems(data.problems);
      setLanguage(data.language);

      // 문제별 기본 코드 설정
      const defaultCode = getDefaultCode(data.language);
      const initialCodeMap = data.problems.reduce(
        (acc: { [id: number]: string }, problem: ProblemInfo) => {
          acc[problem.id] = defaultCode;
          return acc;
        },
        {}
      );
      setProblemCodeMap(initialCodeMap);
    };

    getProblem();
  }, [getBasket, basketId]);
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
    if (confirmEnd && user && language && solvingTime) {
      getSubmitResult({
        userId: user?.id,
        problemSetId: basketId,
        language: language?.toLowerCase(),
        solvingTime: solvingTime,
        codes: Object.entries(problemCodeMap).map(([id, code]) => ({
          problemId: Number(id),
          code,
        })),
      });

      navigate(buildPath(PageEndPoints.ALGO_RESULT, { id: basketId }));
    }
  };
  const handleRun = async () => {
    setIsRunning(true);
    console.log("코드 실행!");
    const currentProblem = problems[currentIndex];
    const currentProblemId = currentProblem?.id;
    const currentCode = problemCodeMap[currentProblemId] || "";

    const data = {
      userId: user?.id,
      problemId: currentProblemId,
      code: currentCode,
      problemSetId: basketId,
      language: language?.toLowerCase(),
      solvingTime: currentProblem?.timeLimit,
    };
    const result = await getResult(data);

    setProblemResultMap((prev) => ({
      ...prev,
      [currentProblemId]: result || null,
    }));
    setIsRunning(false);
  };

  return (
    <BaseLayout>
      <Sidebar.Provider className={styles.Code_layout}>
        <Sidebar.Panel>
          <LeftSide
            problems={problems}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
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
                defaultLanguage={editorLanguage}
                path={filePath}
                value={problemCodeMap[problems[currentIndex]?.id] || ""}
                onChange={handleCodeChange}
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
                <div className={styles.title_box}>
                  <div className={styles.title}>실행 결과</div>
                  {isRunning ? (
                    <div className={styles.title_run}>
                      <LuLoader size={"1.125rem"} /> 실행중
                    </div>
                  ) : null}
                </div>
                <Button onClick={handleRun}>실행</Button>
              </div>
              <div className={styles.result}>
                <pre>
                  {problemResultMap[problems[currentIndex]?.id] ? (
                    problemResultMap[problems[currentIndex]?.id].status ===
                    "CORRECT" ? (
                      <div>
                        <p style={{ color: "green" }}>
                          <strong>상태:</strong>{" "}
                          {problemResultMap[problems[currentIndex]?.id].status}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>
                          <strong>에러:</strong>{" "}
                          {problemResultMap[problems[currentIndex]?.id].error}
                        </p>
                        <p>
                          <strong>메시지:</strong>{" "}
                          {problemResultMap[problems[currentIndex]?.id].message}
                        </p>
                        <p>
                          에러내용: <br />
                          <br />
                          {highlightErrorText(
                            problemResultMap[problems[currentIndex]?.id]
                              ?.errorDetails || ""
                          )}
                        </p>
                      </div>
                    )
                  ) : (
                    <p>아직 실행 결과가 없습니다.</p>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default CodeTestPage;
