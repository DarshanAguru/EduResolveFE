/* eslint-disable no-unused-vars */
import React from "react";
import FormInput from "../../Components/FormInput";
import QuestionCard from "./QuestionCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllAssignmentsCard from "./AllAssignmentsCard";
const TeacherAssessments = () => {
  const [formData, setFormData] = React.useState({ subject: "", class: "" });
  const { name, _id, token, institution } = JSON.parse(
    localStorage.getItem("teacher")
  );
  const goBack = () => {
    setFormData((prevFormData) => ({
      subject: "",
      class:""
    }));
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  console.log(formData);
  return (
    <div>
      <p className="text-xl text-center mt-4 font-bold font-Montserrat">
        Post Assessments
      </p>
      <div className="mx-10  lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form className="lg:mx-5 lg:my-10 ">
            <div className="flex lg:gap-10  lg:block flex-wrap">
              <span className="mt-5 lg:mt-2 font-semibold text-base  text-gray-500 tracking-wide font-Montserrat">
                Select the Subject and Class options to post the assessment{" "}
              </span>
              <FormInput
                label="select subject"
                type="select"
                options={[
                  "Physics",
                  "Maths",
                  "Telugu",
                  "Hindi",
                  "English",
                  "Social",
                  "Chemistry",
                ]}
                id="subject"
                required={true}
                onChange={handleChange}
                value={formData.subject}
              ></FormInput>
              <FormInput
                label="select class"
                type="select"
                options={["6th", "7th", "8th", "9th", "10th"]}
                required={true}
                id="class"
                onChange={handleChange}
                value={formData.class}
              ></FormInput>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>

        {!(formData.class && formData.subject) ? (
          <div className="text-center col-span-2 mt-10">
            <AllAssignmentsCard id={_id} token={token} />
          </div>
        ) : (
          <div className="text-center col-span-2 mt-10 ">
            <QuestionCard
              stuclass={formData.class}
              subject={formData.subject}
              name={name}
              goBack={goBack}
              id={_id}
              token={token}
              school={institution}
              refresh={() => setFormData({ subject: "", class: "" })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAssessments;
