import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { format } from "date-fns/format";
import styles from "./Header.module.css";

type Props = {
  currentMonth: Date;
  preMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
};

const Header = ({ currentMonth, preMonth, nextMonth, goToday }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.dateBox}>
        <span className={styles.year}>{format(currentMonth, "yyyy")}년</span>
        <span className={styles.month}>{format(currentMonth, "M")}월</span>
      </div>
      <div className={styles.navBox}>
        <HiOutlineArrowCircleLeft onClick={preMonth} />
        <button className={styles.todayButton} onClick={goToday}>
          오늘
        </button>
        <HiOutlineArrowCircleRight onClick={nextMonth} />
      </div>
    </div>
  );
};

export default Header;
