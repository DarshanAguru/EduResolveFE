import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput";
import FormCheckboxGroup from "../../Components/FormCheckBoxGroup";
import api from "../../api";
const formFields = [
  { label: "Name", id: "name", placeholder: "Enter name", required: true },
  {
    label: "Email",
    id: "emailId",
    placeholder: "Enter email",
    required: true,
    type: "email",
  },
  {
    label: "Age",
    id: "age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  {
    groupLabel: "Subject Expertise",
    id: "subjectExpertise",
    type: "checkbox",
    options: [
      { label: "Telugu", value: "telugu" },
      { label: "Hindi", value: "hindi" },
      { label: "English", value: "english" },
      { label: "Maths", value: "maths" },
      { label: "Science", value: "science" },
      { label: "Social", value: "social" },
    ],
  },
  {
    label: "Qualification",
    id: "qualification",
    placeholder: "Enter qualification",
    required: true,
  },
  {
    label: "Institution",
    id: "institution",
    required: true,
  },
  {
    label: "Phone number",
    id: "phoneNumber",
    placeholder: "Enter Phone number",
    required: true,
    pattern: "\\d{10}",
    title: "Phone number should be 10 digits",
  },
  {
    label: "Password",
    id: "password",
    placeholder: "Enter password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Password must be at least 8 characters long",
  },
];
const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState([]);
  React.useEffect(() => {
    async function fetchSchools() {
      const res = await api.post("/teachers/getAllSchools");
      setInstitutions(res.data);
    }
    fetchSchools();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    qualification: "",
    subjectExpertise: [],
    institution: "",
    phoneNumber: "",
    password: "",
  });
  const [isSubjectExpertiseValid, setIsSubjectExpertiseValid] = useState(true);
  //* State to track if subject expertise validation passes

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      //* Handle checkbox change
      const updatedSubjectExpertise = checked
        ? [...formData.subjectExpertise, value]
        : formData.subjectExpertise.filter((subject) => subject !== value);
      setFormData((prevState) => ({
        ...prevState,
        subjectExpertise: updatedSubjectExpertise,
      }));
      //* Validate checkbox group on change
      setIsSubjectExpertiseValid(updatedSubjectExpertise.length > 0);
    } else {
      //* Handle other input changes
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if at least one checkbox is checked
    if (!formData.subjectExpertise.length) {
      setIsSubjectExpertiseValid(false);
      return;
    }

    try {
      const res = await api.put(
        "/teachers/register",
        formData
      );
      console.log("Form Data submitted successfully", res.data);
      navigate("/teacherLogin");
    } catch (error) {
      console.log("Error submitting registration form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Teacher Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2  gap-4"
      >
        {formFields.map((field, index) =>
          field.id === "institution" ? (
            <div key={index} className="mt-10 xl:mt-3">
              <label
                htmlFor={field.id}
                className="text-2xl xl:text-xl xl:flex xl:gap-4 xl:items-center font-Montserrat cursor-pointer"
              >
                {field.label}
              </label>
              <select
                id={field.id}
                className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-5 px-2 text-xl xl:text-lg"
                onChange={handleChange}
                value={formData[field.id]}
                required={field.required}
              >
                <option value="">Please select...</option>
                {institutions.map((ele, index) => (
                  <option key={index} value={ele.institution}>
                    {ele.institution}
                  </option>
                ))}
              </select>
            </div>
          ) : field.type === "checkbox" ? (
            <FormCheckboxGroup
              key={index}
              {...field}
              onChange={handleChange}
              required={!isSubjectExpertiseValid}
            />
          ) : (
            <FormInput key={field.id} {...field} onChange={handleChange} />
          )
        )}

        <button
          className="border-none text-white font-Montserrat text-xl xl:text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10  shadow-lg w-full py-2 mt-5 hover:bg-[#282323] hover:font-bold cursor-pointer col-span-2"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default TeacherRegistration;
