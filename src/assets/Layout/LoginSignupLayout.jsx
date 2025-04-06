import { Outlet } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";
const LoginSignupLayout = () => {
  return (
    <div className="xl:flex items-center">
      <LoginHeader />
      <Outlet />
    </div>
  );
};

export default LoginSignupLayout;
