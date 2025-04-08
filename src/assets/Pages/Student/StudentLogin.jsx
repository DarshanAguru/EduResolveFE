import { useState } from "react";
import Login from "../../Components/Login";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Auth } from "aws-amplify";
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
    setLoading(true);
    try {
      const authInfo = await Auth.signIn(formData.phoneNumber, formData.password);
      const token = authInfo.signInUserSession.idToken.jwtToken;
  
      // Send token to backend to be stored in secure cookie
      await api.post("/auth/students/storeToken", { token }, { withCredentials: true });
  
      // Fetch user info using the cookie (token now stored server-side)
      const user = await api.post("/auth/students/me", {}, { withCredentials: true });
  
      localStorage.setItem("user", JSON.stringify(user.data));
      navigate("/student");
    } catch (error) {
      console.error(error);
      notify("Invalid Username or Password or Network error");
    } finally {
      setLoading(false);
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