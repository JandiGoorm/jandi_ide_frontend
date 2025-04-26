import styles from "./ModifyBasket.module.css";
import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import { useRef } from "react";
import { ModifyBasketData } from "../../../../../constants/types/types";
import useBaskets from "../../../../../hooks/useBaskets";

interface ModifyBaksketProps {
  id: number;
  title: string;
  onUpdate?: () => void;
}

const ModifyBaksket: React.FC<ModifyBaksketProps> = ({
  id,
  title,
  onUpdate,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { modifyBaskets } = useBaskets();

  const handleSubmit = async () => {
    const title = titleRef.current?.value.trim();

    if (!title) {
      //toast 추가
      return;
    }

    const data: ModifyBasketData = {
      title,
    };

    await modifyBaskets(id, data);
    setTimeout(() => {
      onUpdate?.();
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>문제바구니 수정</div>
      <div className={styles.content_box}>
        <div className={styles.content}>
          <div className={styles.name}>문제바구니 이름</div>
          <Input
            style={{ width: "100%" }}
            ref={titleRef}
            defaultValue={title}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="submit" onClick={handleSubmit}>
          문제바구니 수정
        </Button>
      </div>
    </div>
  );
};

export default ModifyBaksket;
