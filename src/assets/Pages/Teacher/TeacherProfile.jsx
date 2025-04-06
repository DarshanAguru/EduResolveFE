/* eslint-disable no-unused-vars */
import { useState } from "react";
import TeacherProfileCard from "./TeacherProfileCard";
import AssessmentStatTable from "./AssessmentStatTable";
const TeacherProfile = () => {
  const data = JSON.parse(localStorage.getItem("teacher"));
  const { _id, token } = data;
  const [refresh, setRefresh] = useState(false);
  return (
    <div className=" lg:mx-0 lg:grid lg:grid-cols-3 my-auto sm:mx-10 mb-10 lg:mb-0">
      <TeacherProfileCard
        className=" col-span-1"
        data={data}
        userType="teachers"
        setRefresh={() => setRefresh((prev) => !prev)}
      />
      <div className="col-span-2">
        <div className="flex justify-center items-start p-5 gap-10 ">
          <p className="shadow-custom p-3 rounded-full w-auto bg-[#917A68] text-white font-Montserrat font-bold">
            Assessments Progress
          </p>
        </div>
        <AssessmentStatTable id={_id} token={token} />
      </div>
    </div>
  );
};

export default TeacherProfile;
