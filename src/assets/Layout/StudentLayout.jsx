import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentNavbar from "../Pages/Student/StudentNavbar";
import Loader from "../Components/Loader";
const StudentLayout = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <div>
          <StudentNavbar />
          <Outlet context={[loading, setLoading]} />
        </div>
      )}
    </>
  );
};

export default StudentLayout;
