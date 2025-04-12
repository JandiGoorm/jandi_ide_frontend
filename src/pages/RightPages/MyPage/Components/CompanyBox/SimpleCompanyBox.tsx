import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleClick = () => navigate(`/company/${id}`);

  return (
    <div className={styles.company_item} onClick={handleClick}>
      <img className={styles.thumbnail} src={thumbnail} />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
