import styles from "./FullCompanyBox.module.css";

import Button from "../../../../../components/Button/Button";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "../../../../../components/Modal/Modal";
import { Company } from "../../../../../constants/types/types";
import CompanyModal from "./CompanyModal";

interface FullCompanyBoxProps {
  company: Company;
  thumbnail: string;
  onHandle: (id: number, isFavorite: boolean) => void;
  isFavorite: boolean;
}

export default function FullCompanyBox({
  company,
  thumbnail,
  onHandle,
  isFavorite,
}: FullCompanyBoxProps) {
  const handleAction = () => onHandle(company.id, isFavorite);

  return (
    <div className={styles.company_item}>
      <img className={styles.thumbnail} src={thumbnail} />
      <p className={styles.name}>{company.companyName}</p>
      <div className={styles.button_list}>
        <Modal>
          <ModalTrigger>
            <Button> 기업 정보 보기</Button>
          </ModalTrigger>
          <ModalContent>
            <CompanyModal company={company} thumbnail={thumbnail} />
          </ModalContent>
        </Modal>
        <Button onClick={handleAction}>
          {isFavorite ? "관심 기업에서 삭제" : "관심 기업에 추가"}
        </Button>
      </div>
    </div>
  );
}
