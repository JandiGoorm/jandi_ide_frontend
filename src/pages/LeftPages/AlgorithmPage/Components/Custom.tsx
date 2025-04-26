import styles from "./Custom.module.css";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";

interface CustomProps {
  refs: {
    titleRef: React.RefObject<HTMLInputElement | null>;
    languageRef: React.RefObject<HTMLSelectElement | null>;
    timeRef: React.RefObject<HTMLInputElement | null>;
  };
}

const Custom: React.FC<CustomProps> = ({ refs }) => {
  const { titleRef, languageRef, timeRef } = refs;

  return (
    <div className={styles.content_box}>
      <div className={styles.input_box}>
        <p>제목</p>
        <Input inputSize="md" ref={titleRef} />
      </div>

      <div className={styles.input_box}>
        <p>언어 선택</p>
        <Select
          options={["c++", "python", "java"]}
          defaultValue="python"
          ref={languageRef}
        />
      </div>
      <div className={styles.input_box}>
        <p>시간 지정(분)</p>
        <Input
          inputSize="md"
          type="number"
          ref={timeRef}
          min={10}
          defaultValue={10}
          max={180}
          onBlur={() => {
            if (!timeRef.current) return;
            const value = Number(timeRef.current.value);
            if (value < 10) timeRef.current.value = "10";
            if (value > 180) timeRef.current.value = "180";
          }}
        />
      </div>
    </div>
  );
};

export default Custom;
