import styles from "./CalendarModal.module.css";

interface SchedulesProps {
  scheduleName: string;
  description: string;
  jobTitle: string;
}
interface Props {
  selectedDate: string;
  schedules: SchedulesProps[];
}

const CalendarModal = ({ selectedDate, schedules }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{selectedDate} 채용공고 정보</div>
      <div className={styles.content_box}>
        {schedules.map((item, idx) => (
          <div key={idx} className={styles.content}>
            <div className={styles.title}>
              {item.jobTitle} {item.scheduleName}
            </div>
            <div className={styles.sub_title}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarModal;
