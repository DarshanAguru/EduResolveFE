/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../../api";
import ViewQuestions from "./ViewQuestions";
const AssessmentStatTable = ({ view, setView }) => {
  const { _id, grade, school, token, assignments } = JSON.parse(
    localStorage.getItem("student")
  );
  const [assignmentId, setAssignmentId] = useState("");
  const [questions, setQuestions] = useState({});
  const [submittedAssigns, setSubmittedAssigns] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [missedAssignments, setMissedAssignments] = useState([]);
  function viewAssignment(assignId) {
    setAssignmentId(assignId);
    setView((prev) => !prev);
  }
  console.log(questions);
  useEffect(() => {
    async function getAssignmentQA(assignment_id) {
      const res = await api.post(
        `/students/getAssignmentScoreAndData/${assignment_id}`,
        { token: token, id: _id }
      );
      setQuestions(res.data);
    }
    if (assignmentId) {
      getAssignmentQA(assignmentId);
    }
  }, [assignmentId]);

  function isEnded(date) {
    const a = Date.parse(date);
    const b = Date.now();
    return b > a ? true : false;
  }

  async function fetchData() {
    try {
      let subassigns = [];
      let penassigns = [];
      let misassigns = [];
      const res = await api.post("/students/getAllAssignmentsForClass", {
        id: _id,
        token: token,
        grade: grade,
        school: school,
      });
      res.data.forEach((assign) => {
        if (assignments.includes(assign.assignmentId)) {
          subassigns.push(assign);
        } else {
          if (isEnded(assign.deadline)) {
            misassigns.push(assign);
          } else {
            penassigns.push(assign);
          }
        }
      });
      setMissedAssignments(misassigns);
      setPendingAssignments(penassigns);
      setSubmittedAssigns(subassigns);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {view ? (
        <div>
          <p className=" drop-shadow-2xl font-bold text-center tracking-wide font-Montserrat">
            Assessment Stat Table
          </p>
          <section className="container mx-auto p-6">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold font-Montserrat tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">ASSIGNMENT NAME</th>
                      <th className="px-4 py-3">STATUS</th>
                      <th className="px-4 py-3">MARKS</th>
                      <th className="px-4 py-3">VIEW ASSIGNMENT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {submittedAssigns.map((assign) => (
                      <tr key={assign.assignmentId} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold text-black">
                                {assign.assignmentTitle}
                              </p>
                              <p className="text-xs text-gray-600">
                                Posted at: {assign.publishDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            {" "}
                            Submitted{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {
                            assign.submissions.filter(
                              (sub) => sub.senderId === _id
                            )[0].points
                          }
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <button
                            onClick={() => {
                              if (isEnded(assign.deadline)) {
                                return viewAssignment(assign.assignmentId);
                              } else {
                                return alert(
                                  "Got you there! Please Wait until the assignment deadline has passed... 😜"
                                );
                              }
                            }}
                            className=" text-blue-800 hover:text-blue-400 underline underline-offset-2"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {pendingAssignments.map((assign) => (
                      <tr key={assign.assignmentId} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold text-black">
                                {assign.assignmentTitle}
                              </p>
                              <p className="text-xs text-gray-600">
                                Posted at: {assign.publishDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm">
                            {" "}
                            Pending{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {"TBD"}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <button
                            onClick={() =>
                              alert(
                                "Hey! Please Navigate to assignments section and select the appropriate assignment and submit it before the deadline hits. 😇"
                              )
                            }
                            className=" text-blue-800 hover:text-blue-400 underline underline-offset-2"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {missedAssignments.map((assign) => (
                      <tr key={assign.assignmentId} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold text-black">
                                {assign.assignmentTitle}
                              </p>
                              <p className="text-xs text-gray-600">
                                Posted at: {assign.publishDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                            {" "}
                            Missed{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {"0"}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <button
                            onClick={() =>
                              alert(
                                "OMG! you missed it!! You have not submitted the assignment on time.. Please make sure to submit the assignment on time next time..🤗"
                              )
                            }
                            className=" text-blue-800 hover:text-blue-400 underline underline-offset-2"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setView((prev) => !prev)}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 hover:bg-gray-300 mr-auto mx-5"
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
          <div className="font-semibold text-xs tracking-wider uppercase font-Montserrat flex gap-5 flex-wrap items-center mx-5">
            <p className=" text-base font-bold">Legend :</p>
            <div className="flex  gap-2 flex-wrap">
              <div className="px-2 py-2 bg-red-200 text-red-950 rounded-lg">
                Wrongly selected answers
              </div>
              <div className="px-2 py-2 bg-emerald-200 text-emerald-950 rounded-lg">
                Correctly selected answers
              </div>
              <div className="px-2 py-2 bg-yellow-200 text-yellow-950 rounded-lg">
                {" "}
                Not selected correct answers
              </div>
            </div>
          </div>
          <ViewQuestions questions={questions} />
        </div>
      )}
    </>
  );
};

export default AssessmentStatTable;
