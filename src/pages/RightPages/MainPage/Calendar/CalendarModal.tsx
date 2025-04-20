import styles from "./CalendarModal.module.css";

interface Props {
  selectedDate: string;
}

const CalendarModal = ({ selectedDate }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{selectedDate} 채용공고 정보</div>
    </div>
  );
};

export default CalendarModal;
