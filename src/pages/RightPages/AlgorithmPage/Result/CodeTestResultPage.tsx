import styles from "./CodeTestResultPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/CodeTestPage/CodeTestLeft";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkModeContext } from "../../../../contexts/DarkmodeContext";
import useCodeTest from "../../../../hooks/useCodeTest";
import { useEffect, useState } from "react";
import { ProblemInfo } from "../../../../constants/types/types";
import useBaskets from "../../../../hooks/useBaskets";
import { getEditorLanguage, getFilePath } from "../../../../utils/codeTestSet";
import { highlightErrorText } from "../../../../utils/resultText";
import Button from "../../../../components/Button/Button";
import { PageEndPoints } from "../../../../constants/api";
import { buildPath } from "../../../../utils/buildPath";

const CodeTestResultPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const basketId = Number(id);
  const { isDarkMode } = useDarkModeContext();
  const { getBasketResults } = useCodeTest();
  const { getBasket } = useBaskets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [language, setLanguage] = useState<string>();
  const editorLanguage = getEditorLanguage(language || "");
  const filePath = getFilePath(language || "");
  //각각 문제 및 결과 각각 저장
  const [problemCodeMap, setProblemCodeMap] = useState<{
    [id: number]: string;
  }>({});
  const [problemResultMap, setProblemResultMap] = useState<{
    [id: number]: string;
  }>({});

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && problems[currentIndex]) {
      const id = problems[currentIndex].id;
      setProblemCodeMap((prev) => ({ ...prev, [id]: value }));
    }
  };

  useEffect(() => {
    const getResults = async () => {
      if (!user) return;

      const data = await getBasket(basketId);
      setProblems(data.problems);
      setLanguage(data.language);

      const result = await getBasketResults(user.id, basketId);
      console.log(result);

      const codeMap: { [id: number]: string } = {};
      const resultMap: { [id: number]: string } = {};
      result.problems.forEach(
        (problem: {
          problemId: number;
          solution?: {
            code?: string;
            additionalInfo?: string;
            status?: string;
          };
        }) => {
          codeMap[problem.problemId] = problem.solution?.code || "";
          resultMap[problem.problemId] =
            problem.solution?.additionalInfo || problem.solution?.status || "";
        }
      );
      setProblemCodeMap(codeMap);
      setProblemResultMap(resultMap);
    };

    getResults();
  }, [getBasketResults, getBasket, basketId, user]);

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
              <div>결과확인</div>
              <Button
                onClick={() => {
                  navigate(
                    buildPath(PageEndPoints.ALGO_TEST, { id: basketId })
                  );
                }}
              >
                다시 풀기
              </Button>
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
                  readOnly: true,
                  minimap: {
                    enabled: true,
                  },
                }}
              />
            </div>

            {/* 코드 실행기 */}
            <div className={styles.footer}>
              <div className={styles.title_box}>
                <div className={styles.title}>채점 결과</div>
              </div>
              <div className={styles.result}>
                {highlightErrorText(
                  problemResultMap[problems[currentIndex]?.id] ||
                    "결과가 없습니다."
                )}
              </div>
            </div>
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default CodeTestResultPage;
