import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./Cells.module.css";
import { ModalTrigger } from "../../../../components/Modal/Modal";
import { RecruitInfo } from "../../../../constants/types/types";

interface Props {
  currentMonth: Date;
  onDateClick: (day: Date) => void;
  selectedDate: string;
  monthSchedules: RecruitInfo[];
}
const colorPalette = [
  "#F87171",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#F472B6",
  "#4ADE80",
  "#FCD34D",
  "#38BDF8",
  "#C084FC",
  "#FB7185",
  "#2DD4BF",
];

const Cells = ({
  currentMonth,
  onDateClick,
  selectedDate,
  monthSchedules,
}: Props) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const today = new Date();

  const jobColorMap = new Map<string, string>();
  let colorIndex = 0;

  const getColorForJob = (jobTitle: string): string => {
    if (!jobColorMap.has(jobTitle)) {
      jobColorMap.set(jobTitle, colorPalette[colorIndex % colorPalette.length]);
      colorIndex++;
    }
    return jobColorMap.get(jobTitle)!;
  };

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

      const schedulesForTheDay =
        monthSchedules?.flatMap((posting) => {
          if (!posting.schedules) return [];

          return posting.schedules
            .filter((schedule) => schedule.date === formattedDate)
            .map((schedule) => ({
              scheduleName: schedule.scheduleName,
              jobTitle: posting.title,
            }));
        }) ?? [];

      days.push(
        <ModalTrigger
          key={num}
          onOpen={() => onDateClick(cloneDay)} // 날짜 클릭 시 상태 업데이트
        >
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
            <div className={styles.scheduleList}>
              {schedulesForTheDay.map((schedule, idx) => (
                <div key={idx} className={styles.schedule}>
                  <div className={styles.schedule_name}>
                    <span
                      className={styles.dot}
                      style={{
                        backgroundColor: getColorForJob(schedule.jobTitle),
                      }}
                    />
                    {schedule.scheduleName}
                  </div>
                  <div className={styles.schedule_sub}>{schedule.jobTitle}</div>
                </div>
              ))}
            </div>
          </div>
        </ModalTrigger>
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
