import MentorNavbar from "../Pages/Mentor/MentorNavbar";
import { Outlet } from "react-router-dom";
const MentorLayout = () => {
  return (
    <>
      <MentorNavbar />
      <Outlet />
    </>
  );
};

export default MentorLayout;
