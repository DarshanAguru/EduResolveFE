import { useState } from "react";
import FormInput from "../../Components/FormInput";
import FormCheckboxGroup from "../../Components/FormCheckBoxGroup";
import api from "../../api";
import { signUp } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

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
    label: "Date of Birth",
    id: "birthdate",
    placeholder: "Enter Date of Birth",
    required: true,
    type: "date",
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
    label: "Resume Link",
    id: "resumeLink",
    placeholder: "e.g. https://drive.google.com/...",
    comment: " (* google drive link)",
    required: true,
    pattern: "https?://drive.google.com/.+",
    title: "Please enter a valid URL",
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

const MentorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    gender: "",
    qualification: "",
    subjectExpertise: [],
    resumeLink: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
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
  // *on submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //* Check if at least one checkbox is checked
    if (!formData.subjectExpertise.length) {
      setIsSubjectExpertiseValid(false);
      return;
    }

    if(!formData.resumeLink.startsWith("https://drive.google.com/")){
      alert("Please enter a valid google drive link");
      return;
    }
    

    if (!formData.birthdate) {
      alert("Please enter your date of birth");
      return;
    }

    // console.log(formData);
    try {

      const { userSub } = await signUp({
              username: formData.phoneNumber,
              password: formData.password,
              attributes: {
                name: formData.name,
                email: formData.emailId,
                gender: formData.gender,
                phone_number: formData.phoneNumber,
                birthdate: formData.birthdate,
              }
            }) 
      await api.put(
        "/auth/mentors/register",
        { ...formData, password: undefined, cognitoSub: userSub },
      );
      // console.log("Form Data submitted successfully", res.data);
      navigate("/mentorLogin");
    } catch (error) {
      console.log("Error submitting registration form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Mentor Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2  gap-4"
      >
        {formFields.map((field, index) =>
          field.type === "checkbox" ? (
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

export default MentorRegistration;
