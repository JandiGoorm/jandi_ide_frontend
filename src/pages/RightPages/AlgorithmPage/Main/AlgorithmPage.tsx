import styles from "./AlgorithmPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import CompanyAlgoLeft from "../../../LeftPages/AlgorithmPage/AlgoLeft";

const AlgorithmPage = () => {
  return (
    <Sidebar.Provider className={styles.Algo_layout}>
      <Sidebar.Panel className={styles.userInfo}>
        <CompanyAlgoLeft />
      </Sidebar.Panel>
      <Sidebar.Content>
        <div>ss</div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default AlgorithmPage;
