import { format } from "date-fns";
import styles from "./Calendar.module.css";
import Header from "./Header";
import { useState } from "react";
import Days from "./Days";
import Cells from "./Cells";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const onDateClick = (day: Date) => setSelectedDate(format(day, "yyyy-MM-dd"));
  const goToday = () => setCurrentMonth(new Date());

  const onChangeYear = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
  };

  const onChangeMonth = (month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month - 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className={styles.container}>
      <Header
        currentMonth={currentMonth}
        goToday={goToday}
        onChangeYear={onChangeYear}
        onChangeMonth={onChangeMonth}
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
