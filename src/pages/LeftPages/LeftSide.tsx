import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import styles from "./LeftSide.module.css";
import LogoDemo from "../../../public/LogoDemo.png";

const LeftSide = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={clsx(styles.sidebar, isOpen && styles.open)}>
      <div className={styles.top_section}>
        <div className={styles.icon_box}>
          <GiHamburgerMenu size={28} />
        </div>

        {isOpen && (
          <div className={styles.logo_box}>
            <img src={LogoDemo} alt="Logo" className={styles.logo} />
          </div>
        )}

        <Sidebar.ToggleButton className={styles.toggle_button}>
          {(isOpen) =>
            isOpen ? (
              <div className={styles.icon_box}>
                <FaLongArrowAltLeft size={20} />
                <p>접기</p>
              </div>
            ) : (
              <div className={styles.icon_box}>
                <FaLongArrowAltRight size={20} />
                <p>열기</p>
              </div>
            )
          }
        </Sidebar.ToggleButton>
      </div>

      {isOpen && (
        <div className={styles.container}>
          <img src={LogoDemo} alt="Logo" className={styles.logo} />
        </div>
      )}
    </div>
  );
};

export default LeftSide;
