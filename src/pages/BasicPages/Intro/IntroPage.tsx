import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import BasicHeader from "../../../layouts/Components/BasicHeader";
import styles from "./IntroPage.module.css";

const IntroPage = () => {
  return (
    <BaseLayout header={<BasicHeader />}>
      <div className={styles.container}></div>
    </BaseLayout>
  );
};

export default IntroPage;
