import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
const OrganisationLayout = () => {
  return (
    <>
      <AdminNavbar user="localAdmin" />
      <Outlet />
    </>
  );
};

export default OrganisationLayout;
