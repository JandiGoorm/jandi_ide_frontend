import styles from "./AlgorithmPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import CompanyAlgoLeft from "../../../LeftPages/AlgorithmPage/AlgoLeft";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import CompanyContent from "./Components/CompanyContent";
import { useState } from "react";
import PracticeContent from "./Components/PracticeContent";
import { Problems } from "../../../../constants/types/types";
import useBaskets from "../../../../hooks/useBaskets";

const AlgorithmPage = () => {
  const [selected, setSelected] = useState<"company" | "practice">("company");
  const [selectedProblems, setSelectedProblems] = useState<Problems[]>([]);
  const { addBaskets } = useBaskets();

  const handleStart = async (form?: {
    title: string;
    language: string;
    time: number;
    company: string;
  }) => {
    if (selected === "company") {
      if (!form) return;
      const basketData = {
        companyName: form.company,
        minutes: 60, // 나중에
        title: form.title,
        isCompanyProb: true,
      };

      console.log(basketData);
      // CompanyContent 쪽에서 처리할 동작 트리거
      console.log("모의 코딩 시작!");
    } else {
      if (!form) return;
      const basketData = {
        problemIds: selectedProblems.map((p) => p.id),
        minutes: form.time,
        title: form.title,
        companyName: form.company,
        isCompanyProb: false,
      };

      console.log(basketData);

      await addBaskets(basketData);
    }
  };

  return (
    <Sidebar.Provider className={styles.Algo_layout}>
      <Sidebar.Panel className={styles.userInfo}>
        <CompanyAlgoLeft
          selected={selected}
          setSelected={setSelected}
          onStart={handleStart}
        />
      </Sidebar.Panel>
      <Sidebar.Content header={<BasicHeader />}>
        {selected === "company" ? (
          <div className={styles.company_dest}>
            <CompanyContent />
          </div>
        ) : (
          <PracticeContent
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
          />
        )}
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default AlgorithmPage;
