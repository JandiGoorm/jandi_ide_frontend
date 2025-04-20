import styles from "./HomePage.module.css";
import { Sidebar } from "../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../LeftPages/Mainpage/MainPageLeft";
import BasicHeader from "../../../layouts/Components/BasicHeader";
import Calendar from "./Calendar/Calendar";
import { useAuth } from "../../../contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide user={user} />
      </Sidebar.Panel>
      <Sidebar.Content header={<BasicHeader />}>
        <Calendar />
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default HomePage;
