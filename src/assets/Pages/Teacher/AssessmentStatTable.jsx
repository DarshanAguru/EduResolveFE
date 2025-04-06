/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import api from "../../api";
import Submissions from "./Submissions";

const AssessmentStatTable = ({ id, token }) => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    async function getAllAssignmentsOfTeachers() {
      console.log(id);
      const res = await api.post(
        `/teachers/getassignments/${id}`,
        { token, id }
      );
      setData(res.data);
    }
    getAllAssignmentsOfTeachers();
  }, []);

  useEffect(() => {
    async function getAllSubmissions(assignment_id) {
      const res = await api.post(
        `/teachers/getAssignmentSubmission/${assignment_id}`,
        { token, id }
      );
      setSubmissions(res.data);
    }
    if (currentAssignmentId) {
      getAllSubmissions(currentAssignmentId);
    }
  }, [currentAssignmentId, id, token]);
  function viewAssignmentSubmissions(assignment_id) {
    setView((prev) => !prev);
    setCurrentAssignmentId(assignment_id);
  }
  return (
    <div>
      <section className="container mx-auto p-6 ">
        {!data ? (
          <p className="text-center ">No assignmets are posted yet</p>
        ) : !view ? (
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold font-Montserrat tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">S.no</th>
                    <th className="px-4 py-3">Assessment</th>
                    <th className="px-4 py-3">Created_at</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Total submissions</th>
                    <th className="px-4 py-3">view submissions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center">
                  {data.map((assignment, index) => {
                    return (
                      <tr className="text-gray-700" key="id">
                        <td className="px-4 py-3 text-md font-semibold border">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">
                                {assignment.assignmentTitle.split("by")[0]}
                              </p>
                              <p className="text-xs text-gray-600">
                                {assignment.grade} class
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold  border">
                          {assignment.publishDate}
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                            {" "}
                            {assignment.deadline}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold border">
                          {assignment.submissions.length}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold border">
                          <button
                            className=" text-blue-800 underline underline-offset-2"
                            onClick={() =>
                              viewAssignmentSubmissions(assignment.assignmentId)
                            }
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setView((prev) => !prev)}
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 hover:bg-gray-300 mr-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 11H7.414l5.293-5.293-1.414-1.414L3.586 12l7.707 7.707 1.414-1.414L7.414 13H19v-2z" />
              </svg>

              <span>Back to all assignments</span>
            </button>
            <Submissions submissions={submissions} />
          </div>
        )}
      </section>
    </div>
  );
};

export default AssessmentStatTable;
