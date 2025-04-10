import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import Button from "../../../components/Button/Button";
import styles from "./Text.module.css";

const Test = () => {
  return (
    <BaseLayout>
      <div className={styles.button_div}>
        <p className={styles.text}>테스트 화면</p>

        <Button size="sm">test</Button>
        <Button size="md">test</Button>
        <Button size="lg">test</Button>
        <Button size="lg" variant="none">
          test
        </Button>
        <Button size="lg" variant="lang">
          test
        </Button>
      </div>
    </BaseLayout>
  );
};

export default Test;
