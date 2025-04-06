/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const FormInput = ({
  label,
  id,
  type = "text",
  options,
  comment,
  onChange,
  required,
  pattern,
  title,
  is = "",
  placeholder = "",
  value,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={`mt-10 xl:mt-3 ${id === "otp" ? "xl:col-span-2" : ""}`}>
      <label
        htmlFor={id}
        className={
          is === "dashboard"
            ? `hidden`
            : `text-md font-semibold xl:flex xl:gap-4 xl:items-center font-Montserrat cursor-pointer`
        }
      >
        {label}
        {comment && (
          <span className="xl:text-sm text-red-300 text-center">{comment}</span>
        )}
      </label>
      {type === "select" ? (
        <select
          id={id}
          className={
            is === "dashboard"
              ? `form-select absolute top-48 right-auto left-auto font-Montserrat border-[#D3C9C9] bg-white shadow-lg py-2 px-2 xl:top-32 xl:right-20`
              : `form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-1 px-2 text-sm xl:text-sm`
          }
          onChange={onChange}
          required={required}
          value={value}
        >
          <option value="">{placeholder || "Please select..."}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={type === "password" && passwordVisible ? "text" : type}
            id={id}
            className={`form-input border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-2 px-2 text-sm xl:text-sm ${type === "password" ? "pr-10" : ""}`}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            pattern={pattern}
            title={title}
          />
          {type === "password" && (
            <div
              className="absolute inset-y-8 right-0 xl:inset-y-8 xl:right-0 flex  px-2"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <HiOutlineEye className="text-2xl xl:text-xl " />
              ) : (
                <HiOutlineEyeOff className="text-2xl xl:text-xl" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
