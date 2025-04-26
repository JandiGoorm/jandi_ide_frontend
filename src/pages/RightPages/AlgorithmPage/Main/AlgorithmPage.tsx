import styles from "./AlgorithmPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import CompanyAlgoLeft from "../../../LeftPages/AlgorithmPage/AlgoLeft";
import BasicHeader from "../../../../layouts/Components/BasicHeader";
import CompanyContent from "./Components/CompanyContent";
import { useState } from "react";
import PracticeContent from "./Components/PracticeContent";
import { Problems } from "../../../../constants/types/types";
import useBaskets from "../../../../hooks/useBaskets";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";
import { buildPath } from "../../../../utils/buildPath";
import { useToast } from "../../../../contexts/ToastContext";

const AlgorithmPage = () => {
  const [selected, setSelected] = useState<"company" | "practice">("company");
  const [selectedProblems, setSelectedProblems] = useState<Problems[]>([]);
  const { addBaskets, addCompanyBaskets } = useBaskets();
  const navigate = useNavigate();
  const { createToast } = useToast();

  const handleStart = async (form?: {
    title: string;
    language: string;
    time: number;
    company: string;
  }) => {
    if (!form) return;

    if (selected === "company") {
      const basketData = {
        companyName: form.company,
        minutes: form.time,
        title: form.title,
        isCompanyProb: true,
        language: form.language,
        problemIds: [0],
      };

      const id = await addCompanyBaskets(basketData);
      navigate(buildPath(PageEndPoints.ALGO_TEST, { id: Number(id) }));
      // CompanyContent 쪽에서 처리할 동작 트리거
    } else {
      if (selectedProblems.length === 0) {
        createToast({ type: "error", text: "문제를 선택해주세요!" });
        return;
      }
      const basketData = {
        problemIds: selectedProblems.map((p) => p.id),
        minutes: form.time,
        title: form.title,
        companyName: "",
        isCompanyProb: false,
        language: form.language,
      };

      console.log(basketData);

      const id = await addBaskets(basketData);
      navigate(buildPath(PageEndPoints.ALGO_TEST, { id: Number(id) }));
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
