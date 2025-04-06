/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {  toast } from "react-toastify";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import api from '../api'
import { IoMdSend } from "react-icons/io";

import PostCardComments from "./PostCardComments";
import useSenderImage from "../hooks/useSenderImage";

export default function PostCard({ user, userType, refresh }) {
  const { _id, name, gender, token } = JSON.parse(
    localStorage.getItem(userType)
  );

  const profileImg = useSenderImage(gender, "students");
  const [showComments, setShowComments] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const {
    messageData,
    messageSenderGender,
    messageSenderName,
    messageId,
    replies,
    school,
    upvote,
    downvote,
  } = user;

  const reports = (user?.reports)?user.reports:undefined

  useEffect(() => {
    setLiked(upvote.filter((user) => user === _id).length > 0);
    setDisliked(downvote.filter((user) => user === _id).length > 0);
  }, [upvote, downvote, _id]);

  // UseStates
 
  const [commentData, setCommentData] = useState({ comment: "", imageURL: "" });
  const [visibleP, setvisibleP] = useState(false);

  // Handling Image Upload
 

  // Handling the change in the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  // Reply handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { comment, imageURL } = commentData;
    const res = await api.put(
      `/messages/addreply/${messageId}`,
      {
        senderId: _id,
        senderType:
          userType === "student"
            ? "students"
            : userType === "teacher"
              ? "teachers"
              : "mentors",
        senderName: name,
        message: comment,
        senderGender: messageSenderGender,
        imageLink: imageURL,
        token: token,
        id: _id,
      }
    );
    setCommentData({ comment: "", imageURL: "" });
    refresh();
  };

  const handleReport = async ()=>{
    if(confirm("Do you want to report this message"))
      {
    try{
        const resp = await api.post(`/messages/report/${messageId}`, {id: _id, token : token, userId: _id})
        if(resp.data.alreadyReported === false)
          {
              toast.success("Reported Successfully!", { position: "top-center" , onClose: refresh()})
          }
        else{

          toast.info("Already Reported!", { position: "top-center" })
        }
    }
    catch(err)
    {
      toast.error("Post submitted!", { position: "top-center" })
    
    }
  }

  }


  

  //Handle Like
  const handleLike = async () => {
    // e.preventDefault();
    const res = await api.post(
      `/messages/upvote/${messageId}`,
      { token: token, id: _id, userId: _id }
    );
    refresh();
  };

  //Handle DisLike
  const handleDisLike = async () => {
    // e.preventDefault();
    await api.post(`/messages/downvote/${messageId}`, {
      token: token,
      id: _id,
      userId: _id,
    });

    refresh();
  };



  return (
    <div className=" bg-white shadow-custom p-2 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md">
      <div className="flex items-center gap-2.5">
        <img src={profileImg} alt="profile-img" className="w-10 h-10" />
        <div>
          <p className="font-bold">{messageSenderName}</p>
          <p className="text-sm font-light">{school}</p>
        </div>
      </div>
      {(user.imageLink) && <img className="m-1 h-1/2 cursor-pointer rounded-md drop-shadow-lg" alt="Image" src={`http://localhost:9000/messages/getImage/${user.imageLink}`}></img>}
      <p>{messageData} </p>
      <div className="flex  items-center gap-2.5">
        <div className="flex">
          <button onClick={() => handleLike()}>
            {!liked ? (
              <AiOutlineLike className="text-blue-500 text-xl" />
            ) : (
              <AiFillLike className="text-blue-500 text-xl" />
            )}
          </button>
          <p>{upvote.length}</p>
        </div>
        <div className="flex ">
          <button onClick={() => handleDisLike()}>
            {!disliked ? (
              <AiOutlineDislike className="text-red-500 text-xl" />
            ) : (
              <AiFillDislike className="text-red-500 text-xl" />
            )}
          </button>

          <p>{downvote.length}</p>
        </div>
        <button onClick={() => setShowComments((prev) => !prev)}>
          <RiQuestionAnswerLine className="text-xl" />
        </button>
        <p>{replies.length} answered</p>
        <div className="flex w-2/3 justify-end align-middle">
        
        {(reports && reports.includes(_id))?( <button className="flex cursor-pointer" onMouseEnter={()=>setvisibleP(true)} onMouseLeave={()=>setvisibleP(false)} onClick={(e)=>{e.preventDefault()}}>
        {(visibleP) && (<p className={` relative -top-4 left-6 ml-1  text-xs text-red-600`}>Reported!</p>)}
          <GoReport className="text-red-600" /> 
        </button>):(  <button className="flex cursor-pointer" onMouseEnter={()=>setvisibleP(true)} onMouseLeave={()=>setvisibleP(false)} onClick={(e)=> {e.preventDefault();handleReport()}}>
          {(visibleP) && (<p className={` relative -top-4 left-6 ml-1  text-xs text-red-600`}>Report!</p>)}
          <GoReport className={`${(visibleP)?"text-red-600 ":"text-black"} `}/> 
        </button>)}
        </div>
        
      </div>
      <div  className={`${!showComments && "hidden"}`}>
        <p className="font-bold">Comments</p>
        <form className=" m-2 " onSubmit={handleSubmit}>
          <div className="flex ">
            <div className="relative w-full">
              <textarea
                name="comment"
                onChange={handleChange}
                value={commentData.comment}
                className="border border-[#917a686f] pl-4 pt-2 text-lg w-full resize-none box-border h-12"
                placeholder="Enter your answer here"
              />
            
            </div>
            <button
              type="submit"
              className="text-[#917A68] border border-[#917a686f] rounded-r-full  px-5 h-12  hover:bg-[#917A68] hover:text-white"
            >
              <IoMdSend />
            </button>
          </div>
        </form>
        {replies.length > 0 &&
          replies.map((reply, index) => (
            
              <PostCardComments key={index} reply={reply} />
            
          ))}
      </div>
    </div>
  );
}

