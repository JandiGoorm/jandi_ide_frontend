import styles from "./CompanyModal.module.css";
import useCompany from "../../../../../hooks/useCompany";
import { useEffect, useState } from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { Company, JobPosting } from "../../../../../constants/types/types";

interface CompanyModalProps {
  id: number;
  thumbnail: string;
}

const CompanyModal = ({ id, thumbnail }: CompanyModalProps) => {
  const { getCompany } = useCompany();

  const [company, setCompany] = useState<Company>();
  const [postings, setPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompany(id);
      if (!res) return;

      setCompany(res);
      setPostings(res.jobPostings);
    };

    fetchCompany();
  }, [getCompany, id]);

  return (
    <div className={styles.company_item}>
      <div className={styles.header}>기업 정보</div>
      <img className={styles.thumbnail} src={thumbnail} />
      <p className={styles.name}>{company?.companyName}</p>
      <p className={styles.description}>{company?.description}</p>
      <p className={styles.name}>채용공고 목록</p>
      {postings?.map((posting) => (
        <p key={posting.id} className={styles.description}>
          <BsPinAngleFill style={{ marginRight: "0.5rem" }} />
          {posting.title}
        </p>
      ))}
    </div>
  );
};
export default CompanyModal;
