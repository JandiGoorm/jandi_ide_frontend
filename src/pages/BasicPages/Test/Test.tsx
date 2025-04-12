import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./Text.module.css";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "../../../components/Modal/Modal";
const Test = () => {
  return (
    <BaseLayout>
      <div className={styles.button_div}>
        <p className={styles.text}>버튼 테스트</p>

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
      <div className={styles.button_div}>
        <p className={styles.text}>Input 테스트</p>

        <Input
          style={{
            boxSizing: "border-box",
            width: "20%",
          }}
          inputSize="sm"
          placeholder="예시"
        />

        <Input
          style={{
            boxSizing: "border-box",
            width: "20%",
          }}
          inputSize="md"
          placeholder="예시"
        />
        <Input
          style={{
            boxSizing: "border-box",
            width: "20%",
          }}
          inputSize="lg"
          placeholder="예시"
        />
      </div>
      <div className={styles.button_div}>
        <Modal>
          <ModalTrigger>
            <Button>모달</Button>
          </ModalTrigger>
          <ModalContent>
            <div>예시</div>
          </ModalContent>
        </Modal>
      </div>
    </BaseLayout>
  );
};

export default Test;
