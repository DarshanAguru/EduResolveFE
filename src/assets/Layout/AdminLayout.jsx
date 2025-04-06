import AdminNavbar from "../Components/AdminNavbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <>
      <AdminNavbar user="globalAdmin"/>
      <Outlet />
    </>
  );
};

export default AdminLayout;
