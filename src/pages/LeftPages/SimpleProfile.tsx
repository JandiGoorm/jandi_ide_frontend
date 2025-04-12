import styles from "./SimpleProfile.module.css";
import defaultUser from "../../../public/defaultUser.webp";
import LeftPart from "../../layouts/Components/LeftPart";

const SimpleProfile = () => {
  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.UserInfo}>
          <img src={defaultUser} alt="Logo" className={styles.UserProfile} />
          <div>
            <p className={styles.UserIntro}>Lorem Ipsum...</p>
          </div>
        </div>
      </div>
    </LeftPart>
  );
};

export default SimpleProfile;
