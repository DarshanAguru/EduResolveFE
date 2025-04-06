/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import api from '../api';
import { IoMdArrowBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const requestOtpFields = [
  {
    label: "Phone No.",
    id: "phoneNo",
    placeholder: "Enter your Phone Number",
    required: true,
    pattern: "\\d{10}",
    title: "Please enter a valid phone Number",
  },
  {
    label: "Email Id.",
    id: "email",
    placeholder: "Enter your email-Id",
    required: true,
    type: "email",
    title: "Please enter a valid email-Id",
  },
];

const resetPasswordFields = [
  {
    label: "OTP",
    id: "otp",
    placeholder: "Enter OTP",
    required: true,
    pattern: "\\d{6}",
    title: "OTP should be 6 digits",
  },
  {
    label: "New Password",
    id: "newPassword",
    placeholder: "Enter new password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Password must be at least 8 characters long",
  },
  {
    label: "Re-enter New Password",
    id: "confirmNewPassword",
    placeholder: "Re-enter new password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Passwords must match",
  },
];


const ForgotPassword = ({ goBack, user }) => {
  const [otpVis, setOtpVis] = useState(true);
  const [userId, setUserId] = useState("");
  const [data, setData] = useState({
    email: "",
    phoneNo: "",
    type: user,
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    console.log(data);
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!data.email || !data.email.match(emailFormat)) {
      toast.error("Please enter your valid Email Id");
      return;
    }

    if (!data.phoneNo || !data.phoneNo.match(/\d{10}/)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const otpUrl = "/global/forgotPassword";
    try {
      const response = await api.post(otpUrl, {
        email: data.email,
        type: data.type,
        query: "generateOTP",
        phoneNo: data.phoneNo,
      });

      if (!response.data) {
        toast.error("Failed to send OTP.");
        return;
      }
      setOtpVis(!otpVis);
      setUserId(response.data.userId);
      toast.success("OTP sent!");
    } catch (e) {
      console.error("Error falied to send OTP", e);
      toast.error("Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const resetPasswordUrl = "/global/forgotPassword";
    try {
      const response = await api.post(resetPasswordUrl, {
        type: data.type,
        otp: data.otp,
        password: data.newPassword,
        query: "verifyOTP&Reset",
        userId: userId,
      });
      if (!response.data) {
        toast.error("Failed to reset password");
        return;
      }
      toast.success("Password reset successfully");
      setTimeout(() => {
        goBack();
      }, 4000);
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="py-5 xl:py-10 xl:mx-auto relative">
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
      <p className=" capitalize text-center mt-10 font-bold font-Montserrat text-2xl">
        Forgot Password
      </p>
      <button
        className="absolute xl:top-0 xl:left-0 flex items-center gap-1 font-Montserrat text-amber-700 underline py-2 px-2 text-2xl xl:text-lg top-0"
        onClick={() => goBack()}
      >
        <IoMdArrowBack /> Go back
        <span className="hidden xl:block">to login</span>
      </button>

      {otpVis && (
        <form onSubmit={sendOTP} className="mx-10 flex flex-col gap-5">
          {requestOtpFields.map((field) => (
            <FormInput
              key={field.id}
              {...field}
              value={data[field.id]}
              onChange={handleChange}
            />
          ))}
          <Button
            style="border-none text-white font-Montserrat text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10  shadow-lg w-full py-2 hover:bg-[#282323] hover:font-bold cursor-pointer"
            type="submit"
          >
            Send OTP
          </Button>
        </form>
      )}
      {!otpVis && (
        <form onSubmit={handleSubmit} className="mx-10">
          {resetPasswordFields.map((field) => (
            <FormInput
              key={field.id}
              {...field}
              value={data[field.id]}
              onChange={handleChange}
            />
          ))}
          <Button
            style="border-none text-white font-Montserrat text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10  shadow-lg w-full py-2 hover:bg-[#282323] hover:font-bold cursor-pointer"
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
