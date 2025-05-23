import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Tooltip from "../../../components/Tooltip/Tooltip";
import styles from "./Text.module.css";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "../../../components/Modal/Modal";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../../../components/Dropdown/Dropdown";
import useAxios from "../../../hooks/useAxios";
import { useEffect } from "react";
import { APIEndPoints } from "../../../constants/api";
const Test = () => {
  const { fetchData: getApi } = useAxios();

  useEffect(() => {
    getApi({ method: "GET", url: `${APIEndPoints.MY_INFO}` })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [getApi]);

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
      <div className={styles.button_div}>
        <Select options={["React", "Vue", "Svelte"]} defaultValue="React" />
      </div>
      <div className={styles.button_div}>
        <Tooltip text={"tooltip"}>
          <p className={styles.text}>툴팁 테스트</p>
        </Tooltip>
      </div>
      <div className={styles.button_div}>
        <Dropdown>
          <DropdownTrigger>
            <Button>드롭다운</Button>
          </DropdownTrigger>
          <DropdownContent>
            <div>
              <p>ss</p>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
      <div className={styles.button_div}></div>
    </BaseLayout>
  );
};

export default Test;
