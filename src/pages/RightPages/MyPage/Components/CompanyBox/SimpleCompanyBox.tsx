import {
  Modal,
  ModalTrigger,
  ModalContent,
} from "../../../../../components/Modal/Modal";
import CompanyModal from "./CompanyModal";
import styles from "./SimpleCompanyBox.module.css";

interface SimpleCompanyBoxProps {
  id: number;
  thumbnail: string;
  name: string;
}

export default function SimpleCompanyBox({
  id,
  thumbnail,
  name,
}: SimpleCompanyBoxProps) {
  return (
    <Modal>
      <ModalTrigger>
        <div className={styles.company_item}>
          <img className={styles.thumbnail} src={thumbnail} />
          <p className={styles.name}>{name}</p>
        </div>
      </ModalTrigger>
      <ModalContent>
        <CompanyModal id={id} thumbnail={thumbnail} />
      </ModalContent>
    </Modal>
  );
}
