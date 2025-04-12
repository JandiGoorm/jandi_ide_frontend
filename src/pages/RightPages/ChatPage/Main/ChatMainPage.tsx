import { Sidebar } from "../../../../layouts/SidebarLayout/SidebarLayout";
import BaseLayout from "../../../../layouts/BaseLayout/BaseLayout";
import LeftSide from "../../../LeftPages/ChatPage/Main/ChatMainLeft";
import styles from "./ChatMainPage.module.css";

const ChatMainPage = () => {
  return (
    <BaseLayout>
      <Sidebar.Provider>
        <Sidebar.Panel className={styles.panner}>
          <LeftSide />
        </Sidebar.Panel>

        <Sidebar.Content>
          <div className={styles.chatGuidelines}>
            <div className={styles.contents}>
              <p className={styles.header}>채팅방 입장 전 확인해주세요!</p>
              {[
                {
                  title: "서로를 존중해주세요!",
                  rules: [
                    "이곳은 <strong>실제 유저</strong>와 소통할 수 있는 공간입니다. 타인에게 예의를 지켜주세요.",
                    "타인에게 <strong>불쾌감</strong>을 줄 수 있는 채팅글은 경고없이 삭제될 수 있습니다.",
                    "타인의 닉네임, 발언 등을 <strong>비방</strong>하거나 <strong>조롱</strong>하는 행위는 금지됩니다.",
                  ],
                },
                {
                  title: "이런 채팅은 올릴 수 없어요!",
                  rules: [
                    "건전한 대화를 위해 <strong>정치, 종교, 혐오 표현</strong> 등 민감한 주제는 삼가주세요.",
                    "<strong>도배, 광고, 홍보</strong> 목적의 메시지는 제한되며, 반복 시 이용이 제한될 수 있습니다.",
                    "<strong>개인정보</strong>(이름, 연락처, 계정 정보 등)는 절대 공유하지 마세요.",
                  ],
                },
                {
                  title: "문제 상황 발생시, 이렇게 대처해주세요!",
                  rules: [
                    "분쟁이 발생할 경우, 직접 대응하기보다는 운영진에게 <strong>신고</strong>해주세요.",
                  ],
                },
                {
                  title: "건전한 소통문화를 만들어가는 당신이 아름답습니다 :)",
                  rules: [
                    "운영진의 안내에 따르지 않을 경우 <strong><colored>채팅 이용이 제한</colored></strong>될 수 있으니 유의해주세요.",
                    "<strong><logo>Team! Jandi</logo><strong> 는 건전한 채팅 문화를 만들기 위해 노력하고 있습니다.",
                  ],
                },
              ].map((section, sectionIdx) => (
                <div key={sectionIdx} className={styles.paragraph}>
                  <p className={styles.title}>{section.title}</p>
                  <ul className={styles.rules}>
                    {section.rules.map((rule, ruleIdx) => (
                      <li
                        key={ruleIdx}
                        dangerouslySetInnerHTML={{ __html: rule }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Sidebar.Content>
      </Sidebar.Provider>
    </BaseLayout>
  );
};

export default ChatMainPage;
