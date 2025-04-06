import { useState } from "react";
import Login from "../../Components/Login";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [loading,setLoading]=useState(false)
  const notify = (message) => toast.error(message);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev=>!prev)
    try {
      const response = await api.post(
        "/auth/students/login",
        formData
      );
      const token = response.headers.get("Authorization");
      if(token)
      {
        localStorage.setItem("authToken", token);
      }
      else{
        throw new Error("Token not found");
      }
      //localStorage.setItem("authToken", response.headers.get('Authorization'));
      localStorage.setItem("student", JSON.stringify(response.data));
      navigate("/student");
      setLoading(prev=>!prev)
    } catch (error) {
      notify("Invalid Username Or Password");
      setLoading((prev) => !prev)
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
        user="student"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default StudentLogin;