/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import right from "../../images/Right.svg";
import Denied from "../../images/Denied.svg";
import False from "../../images/False.svg";
import api from '../../api';
const ProgressCard = ({ view }) => {
  const { _id, token, grade, school, assignments } = JSON.parse(localStorage.getItem("student"))
  // useEffect(()=>{

  // },[])

  const [submitted, setSubmitted] = useState(0)
  const [notSubmitted, setNotSubmitted] = useState(0)
  const [pending, setPending] = useState(0)


  function isEnded(date)
  {
    const a = Date.parse(date);
    const b = Date.now()
    return b > a ? true : false 
  }

  async function fetchData()
  {
      try{
          let s = 0;
          let p = 0;
          let ns = 0;
          const res = await api.post('/students/getAllAssignmentsForClass',{id: _id, token:token, grade: grade, school: school});
          res.data.forEach((assign)=>{
            if(assignments.includes(assign.assignmentId))
            {
              s+=1;
            } 
            else{
              if(isEnded(assign.deadline)==true)
              {
                ns+=1;
              }
              else{
                p+=1;
              }
            }
          })
          setNotSubmitted(ns)
          setPending(p)
          setSubmitted(s)
          
      }
      catch(err)
      {
        console.error(err);
      }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
    {view && (
    <div className=" bg-white  p-5 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md border shadow-lg ">
      <p className=" font-semibold text-md tracking-wide  font-Montserrat">
        Assessments Status
      </p>
      <div className="flex gap-10 flex-wrap font-Montserrat">
        <div className="flex gap-2 ">
          <img src={right} />
          <p className=" text-sm font-semibold tracking-wide text-gray-800">
            Submitted{" "}
            <span className=" bg-emerald-100 ml-2 px-2 py-1 text-sm  text-gray-800 font-bold rounded-full">
              {submitted}
              
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <img src={Denied} />
          <p className=" text-sm font-semibold tracking-wide text-gray-800">
            Pending{" "}
            <span className=" bg-yellow-100 ml-2 px-2 py-1 text-sm font-Montserrat text-gray-800 font-bold rounded-full">
              {pending}
              
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <img src={False} />
          <p className=" text-sm font-semibold tracking-wide text-gray-800">
            Not Submitted{" "}
            <span className="bg-red-100 ml-2 px-2 py-1 text-sm font-Montserrat text-gray-800 font-bold rounded-full">
              {notSubmitted}
              
            </span>
          </p>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default ProgressCard;