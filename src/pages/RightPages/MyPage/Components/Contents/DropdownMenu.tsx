import styles from "./DropdownMenu.module.css";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

type DropdownMenuProps = {
  menu: string;
};

const DropDownMenu = ({ menu }: DropdownMenuProps) => {
  return (
    <div className={styles.dropdown_content}>
      <div className={styles.dropdown_menu}>
        {" "}
        <LuPencilLine /> {menu} 수정{" "}
      </div>
      <div className={styles.dropdown_menu}>
        {" "}
        <LuTrash2 /> {menu} 삭제{" "}
      </div>
    </div>
  );
};

export default DropDownMenu;
