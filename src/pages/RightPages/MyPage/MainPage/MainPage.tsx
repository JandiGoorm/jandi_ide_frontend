import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./MainPage.module.css";
import { BsPinAngleFill } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import SimpleCompanyBox from "../Components/CompanyBox/SimpleCompanyBox";
import ProjectBox from "../Components/ProjectBox/ProjectBox";
import AlgorithmBox from "../Components/AlgorithmBox/AlgorithmBox";
import {
  Modal,
  ModalTrigger,
  ModalContent,
} from "../../../../components/Modal/Modal";
import AddProject from "../Components/Contents/AddProject";
import { useAuth } from "../../../../contexts/AuthContext";
import { PageEndPoints } from "../../../../constants/api";
import useProjects from "../../../../hooks/useProjects";
import useBaskets from "../../../../hooks/useBaskets";
import { useCallback, useEffect, useState } from "react";
import { Baskets, Company, Project } from "../../../../constants/types/types";
import useUserSetting from "../../../../hooks/useUserSetting";
import useCompany from "../../../../hooks/useCompany";

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProjects } = useProjects();
  const { getAllBaskets } = useBaskets();
  const [projects, setProjects] = useState<Project[]>([]);
  const [baskets, setBaskets] = useState<Baskets[]>([]);
  const { getFavoriteCompany } = useUserSetting();
  const [myCompanies, setMyCompanies] = useState<Company[]>([]);
  const { companies } = useCompany();

  useEffect(() => {
    const fetchFavoriteCompanies = async () => {
      const favoriteIds = await getFavoriteCompany();
      const matchedCompanies = companies.filter((company) =>
        favoriteIds.includes(company.id)
      );
      setMyCompanies(matchedCompanies);
    };

    fetchFavoriteCompanies();
  }, [getFavoriteCompany, companies]);

  const getBaskets = useCallback(async () => {
    setProjects([]);
    setBaskets([]);

    try {
      const projectdata = await getProjects(0, 6);
      setProjects(projectdata.data);
    } catch (e) {
      console.error("getProjects 실패", e);
    }

    try {
      const data = await getAllBaskets(0, 6);
      setBaskets(data.data);
    } catch (e) {
      console.error("getAllBaskets 실패", e);
    }
  }, [getProjects, getAllBaskets]);

  useEffect(() => {
    getBaskets();
  }, [getBaskets]);

  console.log(baskets);
  // 더보기 페이지 이동
  const handleNaviCompany = () => navigate(PageEndPoints.MY_COMPANY);
  const handleNaviProject = () => navigate(PageEndPoints.MY_PROJECT);
  const handleNaviAlgorithm = () => navigate(PageEndPoints.MY_ALGO);

  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide user={user} />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          <div className={styles.container}>
            {/* 기업 정보 */}
            <section className={styles.companySection}>
              <Button
                className={styles.companyMore}
                onClick={handleNaviCompany}
              >
                <BsPinAngleFill /> 관심 기업 <AiOutlineDoubleRight />
              </Button>
              {companies.length > 0 ? (
                <div className={styles.companyList}>
                  {myCompanies.map((company) => (
                    <SimpleCompanyBox
                      key={company.id}
                      id={company.id}
                      thumbnail={company.profileUrl}
                      name={company.companyName}
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
              <div className={styles.header}>
                <Button
                  className={styles.projectMore}
                  onClick={handleNaviProject}
                >
                  <BsPinAngleFill /> 대표 프로젝트 <AiOutlineDoubleRight />
                </Button>
                <Modal>
                  <ModalTrigger>
                    <Button>깃허브에서 불러오기</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <AddProject user={user} onUpdate={getBaskets} />
                  </ModalContent>
                </Modal>
              </div>
              {projects.length > 0 ? (
                <div className={styles.projectList}>
                  {projects.map((project) => (
                    <ProjectBox
                      id={project.id}
                      key={project.id}
                      title={project.name}
                      contents={project.description}
                      link={project.url}
                      onUpdate={getBaskets}
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
              <div className={styles.header}>
                <Button
                  className={styles.algorithmMore}
                  onClick={handleNaviAlgorithm}
                >
                  <BsPinAngleFill /> 알고리즘 문제 <AiOutlineDoubleRight />
                </Button>
              </div>
              {baskets.length > 0 ? (
                <div className={styles.algorithmList}>
                  {baskets.map((basket) => (
                    <AlgorithmBox
                      id={basket.id}
                      key={basket.id}
                      title={basket.title}
                      problems={basket.problemIds.map((id) => Number(id))}
                      duration={basket.minutes}
                      problemCount={basket.problemIds.length}
                      lang={basket.language}
                      onUpdate={getBaskets}
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
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
