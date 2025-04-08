/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";

import ForgotPassword from "./ForgotPassword";
import PropTypes from "prop-types";

const formFields = [
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

// eslint-disable-next-line react/prop-types
const Login = ({
  user,
  onChange,
  data,
  onSubmit,
  isAdmin = false,
  loading,
  setLoading,
}) => {
  const [forgot, setForgot] = useState(false);
  return (
    <>
      {!forgot && (
        <div className="xl:mx-auto">
          <p className=" capitalize text-center mt-10 font-bold font-Montserrat text-2xl">
            {user} Login
          </p>
          <form onSubmit={onSubmit} className=" mx-10 ">
            {formFields.map((field) => (
              <FormInput
                key={field.id}
                {...field}
                value={data[field.id]}
                onChange={onChange}
              />
            ))}
            <button
              className=" font-medium hover:border-[#00000091] hover:text-[#00000091]  font-Montserrat mt-10  text-black "
              type="button"
              onClick={() => setForgot((prev) => !prev)}
            >
              Forgot password?
            </button>
            {!loading ? (
              <button
                className="border-none text-white font-Montserrat text-lg leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 py-2 mt-5 shadow-lg w-full  hover:bg-[#917a68cd] cursor-pointer"
                type="submit"
              >
                Login
              </button>
            ) : (
              <button className="border-none text-white font-Montserrat text-base leading-normal rounded  my-2.5 mx-auto px-10 py-2 mt-5 shadow-lg w-full bg-[#282323b6] font-semibold  disabled cursor-not-allowed">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Logging in...
              </button>
            )}

            {!isAdmin && (
              <>
                <p className="text-xl font-normal">New user?</p>
                <Button
                  goTo={`/${user}Registration`}
                  style=" bg-white font-Montserrat text-xl leading-normal rounded-2xl text-[#917A68] my-2.5  underline underline-offset-8 mt-5 hover:text-[#917a68ab]"
                >
                  Sign up as a {user}
                </Button>
              </>
            )}
          </form>
        </div>
      )}
      {forgot && (
        <ForgotPassword goBack={() => setForgot((prev) => !prev)} user={user} />
      )}
    </>
  );
};
Login.propTypes = {
  user: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Login;


