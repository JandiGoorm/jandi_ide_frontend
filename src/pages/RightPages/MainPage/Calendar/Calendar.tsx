import { addMonths, format, subMonths } from "date-fns";
import styles from "./Calendar.module.css";
import Header from "./Header";
import { useState } from "react";
import Days from "./Days";
import Cells from "./Cells";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const onDateClick = (day: Date) => setSelectedDate(format(day, "yyyy-MM-dd"));
  const preMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToday = () => setCurrentMonth(new Date());

  return (
    <div className={styles.container}>
      <Header
        currentMonth={currentMonth}
        preMonth={preMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <Days />
      <Cells
        currentMonth={currentMonth}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
