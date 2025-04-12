import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";

//component
import AuthBanner from "../AuthBanner";
import DoneButton from "./DoneButton";

const DonePage = () => {
  return (
    <BaseLayout>
      <AuthLayout>
        {/* 상단 문구 */}
        <AuthBanner
          catchPhrases={["Your space is ready.", "Time to grow 🌱"]}
          explains={[
            "초록의 여정에 오신 것을 환영합니다.",
            "마음껏 작성하고, 마음껏 성장하세요.",
          ]}
        />

        {/* 다음 버튼 */}
        <DoneButton />
      </AuthLayout>
    </BaseLayout>
  );
};

export default DonePage;
