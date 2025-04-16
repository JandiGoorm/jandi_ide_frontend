import styles from "./Header.module.css";
import Select from "../../../../components/Select/Select";
import { useState } from "react";

type Props = {
  currentMonth: Date;
  goToday: () => void;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
};

const Header = ({
  currentMonth,
  goToday,
  onChangeYear,
  onChangeMonth,
}: Props) => {
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth() + 1;

  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - 5 + i).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const yearOptions = years.map((year) => `${year}년`);
  const monthOptions = months.map((month) => `${month}월`);
  const [selectedYear, setSelectedYear] = useState(`${currentYear}년`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonthIndex}월`);

  const handleYearChange = (yearStr: string) => {
    setSelectedYear(yearStr);
    onChangeYear(parseInt(yearStr, 10));
  };

  const handleMonthChange = (monthStr: string) => {
    setSelectedMonth(monthStr);
    onChangeMonth(parseInt(monthStr, 10));
  };

  const handleToday = () => {
    const today = new Date();
    const todayYear = `${today.getFullYear()}년`;
    const todayMonth = `${today.getMonth() + 1}월`;

    setSelectedYear(todayYear);
    setSelectedMonth(todayMonth);
    goToday();
  };
  return (
    <div className={styles.header}>
      <div className={styles.dateBox}>
        <Select
          options={yearOptions}
          value={selectedYear}
          defaultValue={`${currentYear}년`}
          onChange={handleYearChange}
        />
        <Select
          options={monthOptions}
          value={selectedMonth}
          defaultValue={`${currentMonthIndex}월`}
          onChange={handleMonthChange}
        />
      </div>
      <div className={styles.navBox}>
        <button className={styles.todayButton} onClick={handleToday}>
          오늘
        </button>
      </div>
    </div>
  );
};

export default Header;
