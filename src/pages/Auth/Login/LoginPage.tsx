import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";

//component
import AuthBanner from "../AuthBanner";
import LoginButton from "./LoginButton";

const LoginPage = () => {
  return (
    <BaseLayout>
      <AuthLayout>
        {/* 상단 문구 */}
        <AuthBanner
          catchPhrases={["Welcome Back!", "Your code missed you."]}
          explains={["로그인하여 성장을 계속 이어가세요."]}
        />

        {/* 로그인 버튼 */}
        <LoginButton />
      </AuthLayout>
    </BaseLayout>
  );
};
export default LoginPage;
