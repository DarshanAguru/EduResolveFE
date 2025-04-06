/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useSenderImage from "../hooks/useSenderImage";
import api from '../api'

const formFields = [
  { label: "Name", id: "name", placeholder: "Enter name", required: true },
  {
    label: "Age",
    id: "age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
  },
  {
    label: "Grade",
    id: "grade",
    type: "select",
    options: ["6th", "7th", "8th", "9th", "10th"],
    required: true,
  },
  {
    label: "School",
    id: "school",
    type: "select",
    required: true,
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
];

const ProfileCard = ({ userType, setRefresh }) => {
  const { _id, gender, name, grade, school, age, phoneNumber, emailId, token } =
  JSON.parse(localStorage.getItem("student"));
  const image = useSenderImage(gender, userType);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    grade,
    school,
    age,
    gender,
    phoneNumber,
    emailId
  });
  const [schools, setSchools] = useState([]);

  // Fetch schools
  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await api.post(
          "/students/getAllSchools"
        );
        console.log(response);
        setSchools(response.data.map((each) => each.institution));
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    const schoolFieldIndex = formFields.findIndex(
      (field) => field.id === "school"
    );
    if (schoolFieldIndex !== -1) {
      formFields[schoolFieldIndex].options = schools; // Update schools dynamically
    }
  }, [schools]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/students/editDetails/${_id}`,
        { ...formData, token: token, id: _id }
      );
      console.log(response);
      if (response.status === 200) {
        setIsEditing(false);
        localStorage.setItem(
          "student",
          JSON.stringify({ ...formData, ...JSON.parse(response.config.data) })
        );
        setRefresh();
      }
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <div className="border-2 p-5 m-5 mt-10 box-border rounded-2xl lg:h-[80vh] flex flex-col flex-wrap gap-5 justify-center items-center my-auto">
      {/* Profile display and edit button */}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-3">
          {formFields.map((field) => (
            <div key={field.id}>
              <label className="text-sm font-Montserrat font-bold ">
                {field.label}:
              </label>
              {field.type === "select" ? (
                <select
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full  text-sm py-1 px-1 mt-2"
                >
                  <option value="">
                    {field.placeholder || "Please select..."}
                  </option>
                  {(field.id === "school" ? schools : field.options).map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="form-input border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full py-1 px-1 text-sm mt-2"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="border-none text-white text-lg leading-normal rounded bg-[#917A68] mx-auto py-1 px-1 mt-2 shadow-lg w-2/3 hover:bg-[#282323] hover:font-bold cursor-pointer"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mt-2 text-lg leading-normal rounded bg-gray-200 mx-auto py-1 w-1/3 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      ) : (
        // Profile display logic here...
        <>
          {/* Your existing profile display code here */}
          <p className="  text-2xl font-MajorMono font-bold text-center underline-offset-8 underline ">
            profile
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5">
            <div className="w-1/4 lg:w-1/3">
              <img
                src={image}
                className=" border-2 border-black rounded-full "
              />
            </div>
            <div className=" font-Montserrat font-normal flex flex-col gap-2">
              <p className="font-bold">
                Name : <span className=" font-normal font-sans">{name}</span>
              </p>
              <p className="font-bold">
                Grade : <span className=" font-normal font-sans">{grade}</span>
              </p>

              <p className="font-bold">
                School :
                <span className=" font-normal font-sans"> {school}</span>
              </p>

              <p className="font-bold">
                Age : <span className=" font-normal font-sans">{age}</span>
              </p>

              <p className="font-bold">
                Phone Number :
                <span className=" font-normal font-sans"> {phoneNumber}</span>
              </p>

              <p className="font-bold">
                Email ID :{" "}
                <span className=" font-normal font-sans">{emailId}</span>
              </p>
            </div>
          </div>
          <button
            className="border-none text-white text-lg leading-normal rounded bg-[#917A68] mx-auto py-1 mt-2 shadow-lg w-1/3 hover:bg-[#282323] hover:font-bold cursor-pointer"
            onClick={() => setIsEditing(true)} // Toggle editing mode
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
