import clsx from "clsx";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar, useSidebar } from "../../layouts/SidebarLayout/SidebarLayout";
import styles from "./LeftSide.module.css";

const LeftSide = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={clsx(styles.sidebar, isOpen && styles.open)}>
      <div className={styles.icon_box}>
        <GiHamburgerMenu size={28} />
      </div>

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
  );
};

export default LeftSide;
