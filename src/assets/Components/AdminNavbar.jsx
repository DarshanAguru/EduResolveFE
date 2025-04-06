/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import api from '../api'
const AdminNavbar = ({ user }) => {
  const navigate = useNavigate();
  async function logout() {
    if (user === "globalAdmin") {
      const data = JSON.parse(localStorage.getItem("admin"));
      try {
        const status = await api.post(
          `/globaladmins/logout/${data._id}`,
          { token: data.token }
        );
        if (status.data.message === "Logged out Successfully!") {
          localStorage.clear();
          console.log("logged out successfully");
          navigate("/adminLogin");
        } else {
          console.log(status.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      const data = JSON.parse(localStorage.getItem("localAdmin"));
      try {
        const status = await api.post(
          `/localadmins/logout/${data._id}`,
          { token: data.token }
        );
        if (status.data.message === "Logged out Successfully!") {
          localStorage.clear();
          console.log("logged out successfully from organisation");
          navigate("/organisationLogin");
        } else {
          console.log(status.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <div
      className=" p-5
     shadow-lg flex justify-between"
    >
      <p className="text-xl font-MajorMono">Edu Resolve</p>
      <button
        type="button"
        onClick={() => logout()}
        className="absolute top-4 right-6 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
