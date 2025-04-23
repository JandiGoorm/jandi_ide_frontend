import styles from "./Company.module.css";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";
import useCompany from "../../../../hooks/useCompany";

interface CompanyProps {
  refs: {
    companyRef: React.RefObject<HTMLSelectElement | null>;
    languageRef: React.RefObject<HTMLSelectElement | null>;
    titleRef: React.RefObject<HTMLInputElement | null>;
  };
}

const Company: React.FC<CompanyProps> = ({ refs }) => {
  const { companyRef, languageRef, titleRef } = refs;
  const { companies } = useCompany();
  console.log(companies);

  const companyNames = companies.map((c) => c.companyName);

  if (!companies || companyNames.length === 0) return;

  return (
    <div className={styles.content_box}>
      <div className={styles.input_box}>
        <p>회사 선택</p>
        <Select
          options={companyNames}
          defaultValue={companyNames[0]}
          ref={companyRef}
        />
      </div>

      <div className={styles.input_box}>
        <p>언어 선택</p>
        <Select
          options={["C++", "PYTHON", "JAVA"]}
          defaultValue="PYTHON"
          ref={languageRef}
        />
      </div>
      <div className={styles.input_box}>
        <p>제목</p>
        <Input inputSize="md" ref={titleRef} />
      </div>
    </div>
  );
};

export default Company;
