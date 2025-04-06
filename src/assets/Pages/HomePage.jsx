/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import homeImage from "../images/homepageimg.jpg";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-5  xl:flex-row-reverse xl:justify-between xl:items-center">
        <div
          style={{ backgroundImage: `url(${homeImage})` }}
          className=" h-[50vh] w-5/5 rounded-b-full bg-cover bg-center xl:h-[100vh]  xl:w-3/6  xl:bg-cover xl:bg-left-top flex xl:rounded-l-full  "
        ></div>
        <div className="flex flex-col mx-5 ">
          <h1 className="font-MajorMono font-bold text-3xl xl:text-7xl text-center">
            Edu resolve
          </h1>
          <p className=" md:text-xl lg:text-3xl text-lg tracking-wide xl:text-3xl font-light text-center mt-4 ">
            collab with the students,teachers and mentors
          </p>
          <div className="mx-auto text-center">
            <Button
              style="border-none text-white font-Montserrat text-lg leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 py-1 mt-10 shadow-lg mx-auto"
              goTo="/studentLogin"
            >
              Login as Student
            </Button>
            <p className="text-lg font-light capitalize text-center mt-2">
              or
            </p>
            <Button
              style="text-[#917A68] py-1 font-Montserrat text-lg leading-normal rounded bg-white my-2.5 mx-auto px-10 mt-5 shadow-xl border-2 border-slate-300 mx-auto"
              goTo="/mentorLogin"
            >
              Login as Mentor
            </Button>
            <br></br>
            <div className=" mt-20">
              <div className="font-md font-Montserrat text-lg">
                For Organisation
              </div>
              <Button
                style=" bg-white font-Montserrat text-lg leading-normal rounded-2xl text-[#917A68] my-2.5 mx-auto px-5 underline underline-offset-8 mt-5 mx-auto "
                goTo="/teacherLogin"
              >
                Login as Teacher here
              </Button>

              <Button
                style=" bg-white font-Montserrat text-lg leading-normal rounded-2xl text-[#917A68] my-2.5 mx-auto px-5 underline underline-offset-8 mt-5 mx-auto "
                goTo="/organisationLogin"
              >
                Login as Organisation admin here
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
