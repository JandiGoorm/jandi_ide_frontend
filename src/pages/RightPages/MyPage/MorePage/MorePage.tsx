import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./MorePage.module.css";
import { BsPinAngleFill } from "react-icons/bs";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import ProjectBox from "../Components/ProjectBox/ProjectBox";
import { useAuth } from "../../../../contexts/AuthContext";
import useProjects from "../../../../hooks/useProjects";
import AlgorithmBox from "../Components/AlgorithmBox/AlgorithmBox";

const MorePage = () => {
  const { user } = useAuth();
  const paths = location.pathname.split("/");
  const lastPath = paths[paths.length - 1];
  const { projects, getProjects } = useProjects();
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
          <LeftSide user={user} />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          {/* 프로젝트 정보 */}
          <section className={styles.projectSection}>
            {lastPath === "project" ? (
              <Button className={styles.projectMore}>
                <BsPinAngleFill /> 대표 프로젝트
              </Button>
            ) : (
              <Button className={styles.projectMore}>
                <BsPinAngleFill /> 대표 알고리즘
              </Button>
            )}
            {lastPath === "project" ? (
              <>
                {projects.length > 0 ? (
                  <div className={styles.projectList}>
                    {projects.map((project) => (
                      <ProjectBox
                        id={project.id}
                        key={project.id}
                        title={project.name}
                        contents={project.description}
                        lang={langs[1]}
                        onAddProject={getProjects}
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
              </>
            ) : (
              <>
                {algorithms.length > 0 ? (
                  <div className={styles.projectList}>
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
              </>
            )}
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MorePage;
