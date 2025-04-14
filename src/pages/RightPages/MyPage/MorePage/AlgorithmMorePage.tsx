import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./AlgorithmMorePage.module.css";

//icons
import { BsPinAngleFill } from "react-icons/bs";

//components
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import AlgorithmBox from "../Components/AlgorithmBox/AlgorithmBox";

const MainPage = () => {
  const langs = ["Python", "C/C++", "JavaScript", "C#", "Go"];
  const algorithms = [
    "네이버 대비 알고리즘",
    "알고리즘 연습",
    "PS 연습",
    "네이버 대비 알고리즘",
    "알고리즘 연습",
    "PS 연습",
    "네이버 대비 알고리즘",
    "알고리즘 연습",
    "PS 연습",
    "네이버 대비 알고리즘",
    "알고리즘 연습",
    "PS 연습",
  ];

  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          {/* 알고리즘 정보 */}
          <section className={styles.algorithmSection}>
            <Button className={styles.algorithmMore}>
              <BsPinAngleFill /> 알고리즘 문제
            </Button>
            {algorithms.length > 0 ? (
              <div className={styles.algorithmList}>
                {algorithms.map((algorithm, i) => (
                  <AlgorithmBox
                    id={i + 1}
                    key={"project" + i}
                    title={algorithm}
                    problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                    duration={60}
                    problemCount={2 * (i + 1)}
                    lang={langs[i]}
                    levelImg="/level_5.png"
                  />
                ))}
              </div>
            ) : (
              <p className={styles.no_data}>
                코딩 테스트 기록이 없습니다.
                <br />
                알고리즘 문제를 풀고 새로운 성장을 시작해보세요!
              </p>
            )}
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
