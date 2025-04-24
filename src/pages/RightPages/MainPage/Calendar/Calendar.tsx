import { format } from "date-fns";
import styles from "./Calendar.module.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import Days from "./Days";
import Cells from "./Cells";
import { Modal, ModalContent } from "../../../../components/Modal/Modal";
import CalendarModal from "./CalendarModal";
import useJobPosting from "../../../../hooks/useJobPosting";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const onDateClick = (day: Date) => setSelectedDate(format(day, "yyyy-MM-dd"));
  const goToday = () => setCurrentMonth(new Date());
  const { monthSchedules, getMonth } = useJobPosting();

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    getMonth(year, month);
  }, [currentMonth]);

  console.log(monthSchedules);
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

  const selectedSchedules =
    monthSchedules?.flatMap((posting) => {
      if (!posting.schedules) return [];

      return posting.schedules
        .filter((schedule) => schedule.date === selectedDate)
        .map((schedule) => ({
          scheduleName: schedule.scheduleName,
          description: schedule.description,
          jobTitle: posting.title,
        }));
    }) ?? [];

  return (
    <div className={styles.container}>
      <Header
        currentMonth={currentMonth}
        goToday={goToday}
        onChangeYear={onChangeYear}
        onChangeMonth={onChangeMonth}
      />
      <Days />
      <Modal>
        <Cells
          currentMonth={currentMonth}
          onDateClick={onDateClick}
          selectedDate={selectedDate}
          monthSchedules={monthSchedules}
        />
        <ModalContent>
          <CalendarModal
            selectedDate={selectedDate}
            schedules={selectedSchedules}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Calendar;
