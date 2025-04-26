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
import useBaskets from "../../../../hooks/useBaskets";
import { useCallback, useEffect, useState } from "react";
import { Baskets, Project } from "../../../../constants/types/types";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/Pagination/Pagination";

const MorePage = () => {
  const { user } = useAuth();
  const paths = location.pathname.split("/");
  const lastPath = paths[paths.length - 1];
  const { getProjects } = useProjects();
  const { getAllBaskets } = useBaskets();
  const [projects, setProjects] = useState<Project[]>([]);
  const [baskets, setBaskets] = useState<Baskets[]>([]);
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const getBaskets = useCallback(
    async (page: number) => {
      setProjects([]);
      setBaskets([]);

      try {
        if (lastPath === "project") {
          const data = await getProjects(page, 12);
          setProjects(data.data);
          setTotalPage(data.totalPages);
        } else {
          const data = await getAllBaskets(page, 12);
          setBaskets(data.data);
          setTotalPage(data.totalPages);
        }
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as { response?: { data?: { error?: string } } }).response?.data
            ?.error === "INVALID_PAGE" &&
          page > 0
        ) {
          handlePageChange(page);
        } else {
          console.error(error);
        }
      }
    },
    [lastPath, getProjects, getAllBaskets, setTotalPage, handlePageChange]
  );

  const handleUpdate = useCallback(() => {
    const navigatePage = Math.max(
      1,
      currentPage > totalPage ? totalPage : currentPage
    );
    getBaskets(navigatePage - 1);
  }, [currentPage, totalPage, getBaskets]);

  useEffect(() => {
    handleUpdate();
  }, [lastPath, handleUpdate]);

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
                        link={project.url}
                        onUpdate={handleUpdate}
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
                {baskets.length > 0 ? (
                  <div className={styles.projectList}>
                    {baskets.map((basket) => (
                      <AlgorithmBox
                        id={basket.id}
                        key={basket.id}
                        title={basket.title}
                        problems={basket.problemIds.map((id) => Number(id))}
                        duration={basket.minutes}
                        problemCount={basket.problemIds.length}
                        lang={basket.language}
                        onUpdate={handleUpdate}
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
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                callback={handlePageChange}
              />
            </div>
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MorePage;
