import  { useState } from "react";
import Login from "../../Components/Login";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TeacherLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const notify = (message) => toast.error(message);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/teachers/login",
        formData
      );
      localStorage.setItem("teacher", JSON.stringify(response.data));
      navigate("/teacher");
    } catch (error) {
      if(error.response.data.message === 'Pending')
      {
        notify("Pending: Please wait for Local Admin to approve")
      }
      else if(error.response.data.message==='Rejected')
      {
        notify("Rejected: Your request has been rejected")
      }
      else{
      notify("Invalid Username Or Password");
      }
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
        user="teacher"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TeacherLogin;
