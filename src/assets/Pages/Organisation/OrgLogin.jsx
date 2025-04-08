import { useState } from "react";
import Login from "../../Components/Login";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "@aws-amplify/auth";
import "react-toastify/dist/ReactToastify.css";
const OrgLogin = () => {
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [loading,setLoading]=useState(false)
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authInfo = await signIn({username:formData.phoneNumber, password:formData.password});
      const token = authInfo.signInUserSession.idToken.jwtToken;
  
      // Send token to backend to be stored in secure cookie
      await api.post("/auth/localAdmins/storeToken", { token }, { withCredentials: true });
  
      // Fetch user info using the cookie (token now stored server-side)
      const user = await api.post("/auth/localAdmins/me", {}, { withCredentials: true });
  
      localStorage.setItem("user", JSON.stringify(user.data));
      navigate("/organisation");
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
        user="organisation"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default OrgLogin;
