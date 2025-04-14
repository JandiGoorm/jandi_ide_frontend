import styles from "./AlgorithmPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import CompanyAlgoLeft from "../../../LeftPages/AlgorithmPage/AlgoLeft";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import CompanyContent from "./Components/CompanyContent";
import { useState } from "react";
import PracticeContent from "./Components/PracticeContent";

const AlgorithmPage = () => {
  const [selected, setSelected] = useState<"company" | "practice">("company");

  return (
    <Sidebar.Provider className={styles.Algo_layout}>
      <Sidebar.Panel className={styles.userInfo}>
        <CompanyAlgoLeft selected={selected} setSelected={setSelected} />
      </Sidebar.Panel>
      <Sidebar.Content header={<BasicHeader />}>
        {selected === "company" ? (
          <div className={styles.company_dest}>
            <CompanyContent />
          </div>
        ) : (
          <PracticeContent />
        )}
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default AlgorithmPage;
