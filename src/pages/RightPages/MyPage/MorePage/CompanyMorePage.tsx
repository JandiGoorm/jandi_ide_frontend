import { useEffect, useState } from "react";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import styles from "./CompanyMorePage.module.css";
import { BsPinAngleFill } from "react-icons/bs";
import LeftSide from "../../../LeftPages/Mainpage/MainPageLeft";
import Button from "../../../../components/Button/Button";
import FullCompanyBox from "../Components/CompanyBox/FullCompanyBox";
import { useAuth } from "../../../../contexts/AuthContext";
import useCompany from "../../../../hooks/useCompany";
import useUserSetting from "../../../../hooks/useUserSetting";
import { Company } from "../../../../constants/types/types";

const MainPage = () => {
  const { getFavoriteCompany, AddACompany, DeleteACompany } = useUserSetting();
  const [myCompanies, setMyCompanies] = useState<Company[]>([]);
  const { user } = useAuth();
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
  }, [companies, getFavoriteCompany]);

  // 액션 정의 - 관심 기업에 추가 or 삭제
  const handleAction = async (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      await DeleteACompany(id);
    } else {
      await AddACompany(id);
    }

    // 변경 후 관심 기업 다시 로딩
    const favoriteIds = await getFavoriteCompany();
    const matchedCompanies = companies.filter((company) =>
      favoriteIds.includes(company.id)
    );
    setMyCompanies(matchedCompanies);
  };

  // //관심 기업에서 삭제
  // const handleDelete = (id: number) => {
  //   setMyCompanies((prev) => prev.filter((company) => company.id !== id));
  // };

  // //관심 기업에 추가
  // const handleAdd = (id: number) => {
  //   const companyToAdd = dummyCompanies.find((company) => company.id === id);
  //   if (!companyToAdd) return;

  //   setMyCompanies((prev) => {
  //     // 중복 추가 방지
  //     if (prev.find((c) => c.id === id)) return prev;
  //     return [...prev, companyToAdd];
  //   });
  // };

  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide user={user} />
        </Sidebar.Panel>

        <Sidebar.Content header={<BasicHeader />}>
          {/* 관심 기업 */}
          <section className={styles.my_company_section}>
            <Button className={styles.companyMore}>
              <BsPinAngleFill /> 관심 기업
            </Button>
            <div className={styles.companyList}>
              {myCompanies.map((company) => {
                return (
                  <FullCompanyBox
                    key={company.id}
                    company={company}
                    thumbnail="/logo_goorm.png"
                    onHandle={handleAction}
                    isFavorite={true}
                  />
                );
              })}
            </div>
          </section>

          {/* 전체 기업 */}
          <section className={styles.all_company_section}>
            <Button className={styles.companyMore}>
              <BsPinAngleFill /> 다른 기업을 확인해보세요!
            </Button>
            <div className={styles.companyList}>
              {companies.map((company) => {
                if (
                  myCompanies.find((myCompany) => myCompany.id === company.id)
                )
                  return null;

                return (
                  <FullCompanyBox
                    key={company.id}
                    company={company}
                    thumbnail="/logo_goorm.png"
                    onHandle={handleAction}
                    isFavorite={false}
                  />
                );
              })}
            </div>
          </section>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default MainPage;
