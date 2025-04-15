import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./Cells.module.css";

interface Props {
  currentMonth: Date;
  onDateClick: (day: Date) => void;
  selectedDate: string;
}

const Cells = ({ currentMonth, onDateClick, selectedDate }: Props) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const today = new Date();

  console.log(selectedDate);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let num = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "yyyy-MM-dd");
      const cloneDay = day;
      num++;

      const isCurrentMonth = format(currentMonth, "M") === format(day, "M");
      const isToday = format(today, "yyyy-MM-dd") === formattedDate;

      days.push(
        <div
          key={num}
          className={`${styles.dayCell} ${!isCurrentMonth ? styles.notCurrentMonth : styles.currentMonth} ${isToday ? styles.today_cell : ""}`}
          onClick={() => {
            onDateClick(cloneDay);
          }}
        >
          <span
            className={`${styles.dayNumber} ${isToday ? styles.today : ""}`}
          >
            {isCurrentMonth ? format(day, "d") : ""}
          </span>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className={styles.weekRow} key={num}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className={styles.calendarWrapper}>{rows}</div>;
};

export default Cells;
