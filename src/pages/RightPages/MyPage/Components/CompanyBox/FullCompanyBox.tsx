import { useNavigate } from "react-router-dom";
import styles from "./FullCompanyBox.module.css";

import Button from "../../../../../components/Button/Button";

interface FullCompanyBoxProps {
  id: number;
  thumbnail: string;
  name: string;
  onHandle: (id: number, isFavorite: boolean) => void;
  isFavorite: boolean;
}

export default function FullCompanyBox({
  id,
  thumbnail,
  name,
  onHandle,
  isFavorite,
}: FullCompanyBoxProps) {
  const navigate = useNavigate();
  const handleNavi = () => navigate(`/company/${id}`);
  const handleAction = () => onHandle(id, isFavorite);

  return (
    <div className={styles.company_item}>
      <img className={styles.thumbnail} src={thumbnail} />
      <p className={styles.name}>{name}</p>
      <div className={styles.button_list}>
        <Button onClick={handleNavi}>기업 정보 보기</Button>
        <Button onClick={handleAction}>
          {isFavorite ? "관심 기업에서 삭제" : "관심 기업에 추가"}
        </Button>
      </div>
    </div>
  );
}
