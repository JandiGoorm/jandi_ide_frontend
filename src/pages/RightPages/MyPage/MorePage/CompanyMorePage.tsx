import { useState } from "react";
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

const dummyCompanies = [
  { id: 1, name: "네이버" },
  { id: 2, name: "카카오" },
  { id: 3, name: "라인" },
  { id: 4, name: "쿠팡" },
  { id: 5, name: "배민" },
  { id: 6, name: "구름" },
];

const MainPage = () => {
  const [myCompanies, setMyCompanies] = useState([]); //관심 기업 리스트 관리
  const { user } = useAuth();
  const { companies } = useCompany();

  console.log(companies);

  // 액션 정의 - 관심 기업에 추가 or 삭제
  const handleAction = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      // 이미 관심기업에 있다면 삭제
      handleDelete(id);
    } else {
      // 관심 기업에 없었다면 추가
      handleAdd(id);
    }
  };

  //관심 기업에서 삭제
  const handleDelete = (id: number) => {
    setMyCompanies((prev) => prev.filter((company) => company.id !== id));
  };

  //관심 기업에 추가
  const handleAdd = (id: number) => {
    const companyToAdd = dummyCompanies.find((company) => company.id === id);
    if (!companyToAdd) return;

    setMyCompanies((prev) => {
      // 중복 추가 방지
      if (prev.find((c) => c.id === id)) return prev;
      return [...prev, companyToAdd];
    });
  };

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
              {/* {myCompanies.map((company, i) => {
                return (
                  <FullCompanyBox
                    key={"myCompany" + i}
                    id={company.id}
                    thumbnail="/logo_goorm.png"
                    name={company.name}
                    onHandle={handleAction}
                    isFavorite={true}
                  />
                );
              })} */}
            </div>
          </section>

          {/* 전체 기업 */}
          <section className={styles.all_company_section}>
            <Button className={styles.companyMore}>
              <BsPinAngleFill /> 전체 기업을 확인해보세요!
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
