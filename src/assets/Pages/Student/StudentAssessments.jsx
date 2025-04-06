import  { useEffect, useState } from "react";
import api from '../../api'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentCard from "./AssessmentCard";
const StudentAssessments = () => {
  const [formData, setFormData] = useState({
    subject: "",
    assessment: [],
  });
  const [selectedAssessment, setSelectedAssessment] = useState("");

  const { name, _id, token, school, grade, assignments } = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    if (!formData.subject) return;

    const getAssignments = async () => {
      try {
        const response = await api.post(
          "/students/getallassignments",
          {
            subject: formData.subject,
            school,
            grade,
            token,
            id: _id,
          }
        );
        const notSubmittedAssessments = response.data.filter((assessment) => {
          return (
            !assignments.includes(assessment.id) &&
            Date.now() <= Date.parse(assessment.deadline)
          );
        });

        setFormData((prevFormData) => ({
          ...prevFormData,
          assessment: notSubmittedAssessments,
        }));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        toast.error("Failed to fetch assignments");
      }
    };
    getAssignments();
  }, [formData.subject, grade, school, token, _id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "assessment") {
      setSelectedAssessment(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
      setSelectedAssessment("");
    }
  };

  const selectedAssessmentDetails = formData.assessment.find(
    (assessment) => assessment.id === selectedAssessment
  );
  const disableDropdowns = formData.subject && selectedAssessment;
  const goBack = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: "",
    }));
  };
  return (
    <div>
      <p className=" font-bold text-xl font-Montserrat mt-5 text-center underline-offset-8 underline tracking-wider mb-4 lg:mb-0 ">
        Assessments
      </p>
      <div className="mx-10 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form className="lg:mx-5 lg:my-10">
            <div className="gap-10 lg:block">
              {/* Subject Selection */}
              <label htmlFor="subject" className="block mb-2">
                Select Subject:
              </label>
              <select
                id="subject"
                onChange={handleChange}
                value={formData.subject}
                className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-1 px-2 text-sm xl:text-sm"
                disabled={disableDropdowns}
              >
                <option value="">Select a subject</option>
                {/* List of subjects */}
                {[
                  "Physics",
                  "Maths",
                  "Telugu",
                  "Hindi",
                  "English",
                  "Social",
                  "Chemistry",
                ].map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            {/* Assessment Selection */}
            {formData.subject && (
              <div className="mt-4">
                <label htmlFor="assessment" className="block mb-2">
                  Select Assessment:
                </label>
                <select
                  id="assessment"
                  onChange={handleChange}
                  value={selectedAssessment}
                  className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-1 px-2 text-sm xl:text-sm text-black"
                  disabled={disableDropdowns}
                >
                  <option value="">Select an assessment</option>
                  {formData.assessment.map((assessment) => (
                    <option
                      className="text-sm"
                      key={assessment.id}
                      value={assessment.id}
                    >
                      {assessment.title.split(" ")[0] +
                        "- " +
                        assessment.publishDate}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form>
          <ToastContainer />
        </div>
        {/* Display Placeholder or Selected Assessment */}
        {!formData.subject || !selectedAssessment ? (
          <div className="col-span-2 flex items-center justify-center mt-3 lg:mt-0">
            Select the Subject and Assessment to submit assessment here.
          </div>
        ) : (
          <div className="text-center col-span-2 mt-10">
            <p className=" font-bold text-lg font-Montserrat my-2 tracking-wide">
              {selectedAssessmentDetails?.title}
            </p>
            {/* Pass the selected assessment details to the AssessmentCard */}
            <AssessmentCard
              id={selectedAssessmentDetails?.id}
              deadline={selectedAssessmentDetails.deadline}
              token={token}
              userId={_id}
              name={name}
              goBack={goBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssessments;
