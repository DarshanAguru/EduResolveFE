import { useState, useEffect } from "react";
import { data } from "../../data/facts";
import { quotes } from "../../data/quotes";
import PostCard from "../../Components/PostCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../../api';

const MentorHome = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ];
  const [randomData, setRandomData] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { _id, token } = JSON.parse(localStorage.getItem("mentor"));
  console.log(_id, token);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setRandomData(data[Math.floor(Math.random() * data.length)]);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await api.post(
          `/messages/getAllMessages`,
          { token: token, id: _id }
        );
        setMessages(data.reverse());
      } catch (e) {
        console.log("Messages are not retreived", e);
      }
    }
    getMessages();
  }, [refresh]);

  return (
    <div className="flex flex-col md:flex-row gap-5 m-5 ">
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
        <div
          style={{
            overflowY: "auto",
            marginTop: "10px",
          }}
        >
          {messages.map((message) => (
            <PostCard
              key={message.messageId}
              user={message}
              userType="mentor"
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

export default MentorHome;
