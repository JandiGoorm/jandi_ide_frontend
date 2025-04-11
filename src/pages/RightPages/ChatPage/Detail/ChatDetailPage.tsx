import styles from "./ChatDetailPage.module.css";
import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import LeftSide from "../../../LeftPages/ChatDetailLeft";
import ChatHeader from "../../../../layouts/Components/ChatHeader";
import Button from "../../../../components/Button/Button";
import { chatDummyData } from "./constants";
import Chatting from "./Components/Chatting";

const ChatDetailPage = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Panel className={styles.userInfo}>
        <LeftSide />
      </Sidebar.Panel>

      <Sidebar.Content header={<ChatHeader />}>
        <div className={styles.content}>
          <div className={styles.flexBox}>
            <div className={styles.chat_container}>
              {chatDummyData.map((chat, index) => (
                <Chatting chat={chat} key={index} />
              ))}
            </div>
            <div className={styles.chat_input_container}>
              <div className={styles.chat_input_box}>
                <textarea
                  className={styles.description_content}
                  placeholder="건전한 대화를 위해 타인에게 불쾌감을 줄 수 있는 글은 삼가주세요.
                              도배, 광고, 홍보 목적의 메시지는 제한되며, 반복 시 이용이 제한될 수 있습니다.
                              운영진의 안내에 따르지 않을 경우 채팅 이용이 제한될 수 있으니 유의해주세요."
                />
              </div>
              <div className={styles.send_button_box}>
                <Button size="md">보내기</Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar.Content>
    </Sidebar.Provider>
  );
};

export default ChatDetailPage;
