import React from "react";
import image from "../images/loading_gif.gif";
const Loader = () => {
  return (
    <div className="flex flex-col justify-center h-[100vh] mx-5 items-center">
      <img src={image} className=" max-h-[40vh]" />
      <p className=" font-MajorMono font-bold text-center">
        please wait, the content is loading....
      </p>
    </div>
  );
};

export default Loader;
