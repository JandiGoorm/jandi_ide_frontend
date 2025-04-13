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
  const companies = ["네이버", "카카오", "라인", "쿠팡", "배민", "구름"];
  const projectContents =
    "이것은 구름 딥다이브의 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. ";
  const langs = ["Python", "C/C++", "JavaScript", "C#", "Go"];

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
          </section>

          {/* 프로젝트 정보 */}
          <section className={styles.projectSection}>
            <Button className={styles.projectMore}>
              <BsPinAngleFill /> 대표 프로젝트 <AiOutlineDoubleRight />
            </Button>
            <div className={styles.projectList}>
              {[...Array(4)].map((_, i) => (
                <ProjectBox
                  id={i}
                  key={"project" + i}
                  title={`${i + 1}번째 프로젝트 제목`}
                  contents={projectContents.repeat(i + 1)}
                  lang={langs[i]}
                />
              ))}
            </div>
          </section>

          {/* 프로젝트 정보 */}
          <section className={styles.algorithmSection}>
            <Button className={styles.algorithmMore}>
              <BsPinAngleFill /> 알고리즘 문제 <AiOutlineDoubleRight />
            </Button>
            <div className={styles.algorithmList}>
              {[...Array(5)].map((_, i) => (
                <AlgorithmBox
                  id={i + 1}
                  key={"project" + i}
                  title={companies[i] + " 대비 알고리즘 " + (i + 1) + " 일차"}
                  problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                  duration={60}
                  problemCount={2 * (i + 1)}
                  lang={langs[i]}
                  levelImg="/level_5.png"
                />
              ))}
            </div>
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
