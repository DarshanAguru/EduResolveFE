import { useState, useEffect } from "react";
import { data } from "../../data/facts";
import { quotes } from "../../data/quotes";
import PostCard from "../../Components/PostCard";
import { TiUpload } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid"
import api from "../../api";
import { ColorRing } from 'react-loader-spinner'



const StudentHome = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ];
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [formData, setFormData] = useState({ postText: "", imageUrl: "" });
  const [randomData, setRandomData] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [uploader, setUpload] = useState(false);
  const { _id, name, token, gender, school } = JSON.parse(
    localStorage.getItem("student")
  );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setRandomData(data[Math.floor(Math.random() * data.length)]);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const [file , setFile] = useState(null);

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await api.post(
          `/messages/getAllMessages`,
          { token, id: _id }
        );
        setMessages(data.reverse());
      } catch (e) {
        console.log("Messages are not retreived", e);
      }
    }
    getMessages();
  }, [refresh]);

  const handleUploadImageClick = () => {
    setShowImageUpload((prev) => !prev);
  };

  const handleFileChange = (event) =>{
      setFile(event.target.files[0]);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let imageLink = undefined;
    if(file != null && showImageUpload == true)
      {
          try{
            const formDataa = new FormData();
          formDataa.append("filee", file)
          formDataa.append("id", _id)
          formDataa.append("token", token)
          setUpload(true)
          imageLink = await api.put('/messages/uploadImg', formDataa, {headers: {
          'Content-Type': 'multipart/form-data'
          }});
          if(imageLink)
            {
              setUpload(false)
            }
        }catch(err)
        {
          console.log(err)
          setUpload(false)
          toast.error("Something went wrong please try again later", {position : "top-center"})
        }
      }

    const data = {
      token: token,
      id: _id,
      school: school,
      messageData: formData.postText,
      gender: gender,
      name: name,
      imageLink: (imageLink!==undefined)?imageLink.data.key : undefined,
      tags: "",
    };
    try{
    await api.put(
      `/messages/addMessage/${_id}@${uuidv4()}`,
      data
    );
    toast.success("Post submitted!", { position: "top-center" });
    }
    catch(err){
        console.log(err);
        toast.error("Something went wrong please try again later", { position : "top-center"})
    }
    setFormData({ postText: "", imageUrl: "" });
    setFile(null);
    setShowImageUpload(false);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 m-5 ">
      {(uploader) && (<div className="fixed bg-white/60 z-50 w-full h-full"><ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="color-ring-loading"
  wrapperStyle={{position: "fixed", top: "45%", left: "45%"}}
  wrapperClass="color-ring-wrapper"
  colors={['#000000']}
  />
  <p style={{position: "fixed", top: "56%", left:"46%"}}>Uploading...</p>
  </div>)}
      <ToastContainer />
      {/* Maths and Science Facts */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden  px-5 py-10 max-h-96 hidden xl:flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <h1 className="text-2xl text-center underline underline-offset-4  text-white  drop-shadow-2xl">
              Maths and Science Facts
            </h1>
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomData}
            </p>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className=" flex-col w-full flex xl:w-1/2">
        <form className="relative" onSubmit={handleFormSubmit}>
          <textarea
            name="postText"
            placeholder="Post the queries here"
            className="bg-white pl-2 pt-2 border box-border resize-none border-gray-300 shadow-lg w-full text-lg"
            value={formData.postText}
            onChange={handleInputChange}
            required
          ></textarea>
          <div>
            <div
              className={`absolute top-5 right-3 cursor-pointer ${showImageUpload ? " text-cyan-700 animate-bounce" : " text-cyan-500"}`}
              onClick={handleUploadImageClick}
            >
              <TiUpload className=" text-xl text-[#917a68d2]" />
            </div>
            {showImageUpload && (
              <div>
                 <input 
                  className="border border-gray-300 shadow-lg py-2 px-2 text-lg w-full" 
                  type="file" 
                  id="file"
                  name="file" 
                  accept="image/jpeg"
                  onChange={handleFileChange}
                  placeholder="Upload Image"
            />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="border-none text-white text-xl leading-normal rounded bg-[#917A68] mx-auto py-1 mt-2 shadow-lg w-full hover:bg-[#282323] hover:font-bold cursor-pointer"
          >
            upload
          </button>
        </form> 
        <div
          style={{
            maxHeight: `${!showImageUpload ? "calc(100vh - 16rem)" : "calc(100vh - 19rem)"}`,
            overflowY: "auto",
            marginTop: "10px",
          }}
        >
          {messages.map((message) => (
            <PostCard
              key={message.messageId}
              user={message}
              userType="student"
              refresh={() => setRefresh((prev) => !prev)}
            />
          ))}
        </div>
      </div>

      {/* Quotes */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden justify-center items-center px-5 py-10 max-h-96 hidden xl:flex "
        style={{
          backgroundImage: `url(${backgroundImages[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomQuote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
