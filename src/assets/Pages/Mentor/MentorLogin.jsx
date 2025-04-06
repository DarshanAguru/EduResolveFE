import { useState } from "react";
import Login from "../../Components/Login";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MentorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const notify = (message) => toast.error(message);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/mentors/login",
        formData
      );
      console.log("From server", response.data);
      localStorage.setItem("mentor", JSON.stringify(response.data));
      navigate("/mentor");
    } catch (error) {
      notify("Invalid Username Or Password");
      console.log("no user found", error);
    }
  };

  return (
    <>
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
    <Login
      user="mentor"
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
    </>
  );
};

export default MentorLogin;
