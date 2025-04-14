import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./ProjectMorePage.module.css";

//icons
import { BsPinAngleFill } from "react-icons/bs";

//components
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import ProjectBox from "../Components/ProjectBox/ProjectBox";

const MainPage = () => {
  const projectContents =
    "이것은 구름 딥다이브의 지정 프로젝트인 Web IDE 개발을 위한 디자인입니다. ";
  const langs = ["Python", "C/C++", "JavaScript", "C#", "Go"];

  const projects = [
    "구름 프로젝트",
    "구름구름 프로젝트",
    "프로젝트 이름",
    "구름 프로젝트",
    "구름구름 프로젝트",
    "프로젝트 이름",
    "구름 프로젝트",
    "구름구름 프로젝트",
    "프로젝트 이름",
    "구름 프로젝트",
    "구름구름 프로젝트",
    "프로젝트 이름",
  ];

  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          {/* 프로젝트 정보 */}
          <section className={styles.projectSection}>
            <Button className={styles.projectMore}>
              <BsPinAngleFill /> 대표 프로젝트
            </Button>
            {projects.length > 0 ? (
              <div className={styles.projectList}>
                {projects.map((project, i) => (
                  <ProjectBox
                    id={i}
                    key={"project" + i}
                    title={project}
                    contents={projectContents.repeat(i + 1)}
                    lang={langs[i % 5]}
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
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
