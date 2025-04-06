/* eslint-disable no-unused-vars */
import { useState } from "react";
import FormInput from "../../Components/FormInput";
import api from "../../api";
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
    label: "Age",
    id: "age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
    min: 18,
    max: 100,
  },
  {
    label: "Institution",
    id: "institution",
    placeholder: "Enter Institution",
    required: true,
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  {
    label: "Designation",
    id: "designation",
    placeholder: "Enter designation",
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

const OrgRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    emailId: "",
    designation: "",
    institution: "",
    age: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        "/localadmins/register",
        formData
      );
      navigate("/organisationLogin")
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Organisation Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2 gap-4"
      >
        {formFields.map((field, index) => (
          <FormInput
            key={field.id}
            {...field}
            value={formData[field.id]}
            onChange={handleChange}
          />
        ))}
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
export default OrgRegistration;
