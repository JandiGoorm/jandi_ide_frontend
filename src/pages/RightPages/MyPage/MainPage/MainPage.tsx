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
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
              <SimpleCompanyBox
                id={1}
                thumbnail="/logo_goorm.png"
                name="구름"
              />
            </div>
          </section>

          {/* 프로젝트 정보 */}
          <section className={styles.projectSection}>
            <Button className={styles.projectMore}>
              <BsPinAngleFill /> 대표 프로젝트 <AiOutlineDoubleRight />
            </Button>
            <div className={styles.projectList}>
              <ProjectBox
                id={1}
                title="프로젝트 이름이름이름이름"
                lang="C/C++"
                contents="이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다."
              />
              <ProjectBox
                id={1}
                title="프로젝트 이름이름이름이름"
                lang="C/C++"
                contents="이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다."
              />
              <ProjectBox
                id={1}
                title="프로젝트 이름이름이름이름"
                lang="C/C++"
                contents="이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. 이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. 이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. 이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다."
              />
              <ProjectBox
                id={1}
                title="프로젝트 이름이름이름이름"
                lang="C/C++"
                contents="이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다."
              />
              <ProjectBox
                id={1}
                title="프로젝트 이름이름이름이름"
                lang="C/C++"
                contents="이것은 구름 딥다이브의 첫번째 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다."
              />
            </div>
          </section>

          {/* 프로젝트 정보 */}
          <section className={styles.algorithmSection}>
            <Button className={styles.algorithmMore}>
              <BsPinAngleFill /> 알고리즘 문제 <AiOutlineDoubleRight />
            </Button>
            <div className={styles.algorithmList}>
              <AlgorithmBox
                id={1}
                title="네이버 대비 알고리즘 2일차"
                problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                duration={60}
                problemCount={2}
                lang="Python"
                levelImg="/level_5.png"
              />

              <AlgorithmBox
                id="algo-day2"
                title="네이버 대비 알고리즘 2일차"
                problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                duration={60}
                problemCount={2}
                lang="Python"
                levelImg="/level_5.png"
              />

              <AlgorithmBox
                id={2}
                title="네이버 대비 알고리즘 2일차"
                problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                duration={60}
                problemCount={2}
                lang="Python"
                levelImg="/level_5.png"
              />

              <AlgorithmBox
                id={3}
                title="네이버 대비 알고리즘 2일차"
                problems={["No 9995. 숫자 세기", "No 9995. 숫자 세기"]}
                duration={60}
                problemCount={2}
                lang="Python"
                levelImg="/level_5.png"
              />
            </div>
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
