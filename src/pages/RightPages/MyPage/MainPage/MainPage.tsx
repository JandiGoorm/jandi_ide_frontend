import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./MainPage.module.css";

//icons
import { BsPinAngleFill } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";

//components
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import SimpleCompanyBox from "../Components/CompanyBox/SimpleCompanyBox";
import ProjectBox from "../Components/ProjectBox/ProjectBox";
import AlgorithmBox from "../Components/AlgorithmBox/AlgorithmBox";
const MainPage = () => {
  const projectContents =
    "이것은 구름 딥다이브의 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. ";
  const langs = ["Python", "C/C++", "JavaScript", "C#", "Go"];

  // const companies = ["네이버", "카카오", "라인", "쿠팡", "배민", "구름"];
  // const projects = ["구름 프로젝트", "구름구름 프로젝트", "프로젝트 이름"];
  // const algorithms = ["네이버 대비 알고리즘", "알고리즘 연습", "PS 연습"]
  const companies = [];
  const projects = [];
  const algorithms = [];

  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          {/* 기업 정보 */}
          <section className={styles.companySection}>
            <Button className={styles.companyMore}>
              <BsPinAngleFill /> 관심 기업 <AiOutlineDoubleRight />
            </Button>
            {companies.length > 0 ? (
              <div className={styles.companyList}>
                {companies.map((company, i) => (
                  <SimpleCompanyBox
                    key={"company" + i}
                    id={i + 1}
                    thumbnail="/logo_goorm.png"
                    name={company}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.no_data}>
                관심 기업이 없습니다.
                <br />
                관심 기업을 추가해보세요!
              </p>
            )}
          </section>

          {/* 프로젝트 정보 */}
          <section className={styles.projectSection}>
            <Button className={styles.projectMore}>
              <BsPinAngleFill /> 대표 프로젝트 <AiOutlineDoubleRight />
            </Button>
            {projects.length > 0 ? (
              <div className={styles.projectList}>
                {projects.map((project, i) => (
                  <ProjectBox
                    id={i}
                    key={"project" + i}
                    title={project}
                    contents={projectContents.repeat(i + 1)}
                    lang={langs[i]}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.no_data}>
                대표 프로젝트가 없습니다
                <br />
                깃허브에서 새로운 프로젝트를 불러와보세요!
              </p>
            )}
          </section>

          {/* 알고리즘 정보 */}
          <section className={styles.algorithmSection}>
            <Button className={styles.algorithmMore}>
              <BsPinAngleFill /> 알고리즘 문제 <AiOutlineDoubleRight />
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
