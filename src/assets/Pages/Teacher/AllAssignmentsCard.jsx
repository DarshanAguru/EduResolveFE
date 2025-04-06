/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../../api';
const AllAssignmentsCard = ({ id, token }) => {
  const [allAssignments, setAssignments] = useState([]);
  const fetchData = async () => {
    try {
      const data = await api.post(
        `/teachers/getassignments/${id}`,
        { token, id }
      );
      setAssignments(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  function getDate(dateString) {
    const [day, month, year] = dateString.split("/");
    const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // Parse the ISO string
    const timestamp = Date.parse(isoString);

    // Create a Date object from the timestamp
    const date = new Date(timestamp).toDateString();

    return date;
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function deleteAssignment(assignmentId) {
    try {
      const res = await api.delete(
        `/teachers/deleteAssignment/${assignmentId}`,
        { token, id }
      );
      if (res.status === 200) {
        toast.success(" Assessment deleted successfully", {
          onClose: () => fetchData(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function dateCompare(deadline) {
    const curr = Date.now();
    const dead = Date.parse(deadline);
    return curr > dead;
  }

  return (
    <div>
      <p className=" font-bold font-Montserrat">Assignments Status</p>
      <ToastContainer />
      {allAssignments === null || allAssignments.length === 0 ? (
        <div className="text-center col-span-2 mt-10">
          No Assignments Posted!
        </div>
      ) : (
        <div className="text-center col-span-2 mt-10 flex gap-10 flex-wrap   ">
          {allAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className=" shadow-custom p-5 flex-grow flex flex-col gap-2 rounded-xl capitalize tracking-wide font-Montserrat font-medium text-sm text-left lg:ml-10 "
            >
              {}
              <p>
                <span className=" font-bold font-Montserrat"> status : </span>
                {dateCompare(assignment.deadline) ? (
                  <span className=" text-red-600 font-bold">Inactive</span>
                ) : (
                  <span className=" text-emerald-600 font-bold">active</span>
                )}
              </p>
              <p>
                <span className=" font-bold font-Montserrat"> title: </span>
                {assignment.assignmentTitle}
              </p>

              <p>
                <span className=" font-bold font-Montserrat">
                  {" "}
                  Publish date :{" "}
                </span>
                {getDate(assignment.publishDate.split(",")[0])}
              </p>
              <p>
                <span className=" font-bold font-Montserrat"> deadline : </span>
                {new Date(assignment.deadline).toDateString()}
              </p>
              <p>
                <span className=" font-bold font-Montserrat"> grade : </span>
                {assignment.grade}
              </p>
              <p>
                <span className=" font-bold font-Montserrat"> subj : </span>
                {assignment.subject}
              </p>
              <p>
                <span className=" font-bold font-Montserrat">
                  submissions :{" "}
                </span>
                {assignment.submissions.length}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteAssignment(assignment.assignmentId);
                }}
                className=" bg-red-500 text-white p-2 rounded font-bold font-Montserrat tracking-wider capitalize"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAssignmentsCard;
