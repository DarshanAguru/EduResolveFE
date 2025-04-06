import React from "react";

const StartPage = ({ start, goBack, deadline }) => {
  return (
    <div>
      <div className="flex">
        <button
          onClick={goBack}
          className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 ml-5 hover:bg-gray-300 mr-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 11H7.414l5.293-5.293-1.414-1.414L3.586 12l7.707 7.707 1.414-1.414L7.414 13H19v-2z" />
          </svg>

          <span>Back to Assignments</span>
        </button>
        <p>
          <span className=" font-Montserrat tracking-wide font-semibold">
            Submission before :{" "}
          </span>
          <span className=" text-red-500 font-medium ">{deadline}</span>
        </p>
      </div>
      <form onSubmit={start} className="text-left lg:m-5">
        <p className="font-bold font-Montserrat my-2 ">Begin Your Assessment</p>
        <p>
          Welcome to your assessment! This process will help you understand your
          preferences and provide personalized recommendations.
        </p>

        <p className="font-bold font-Montserrat my-2 ">How It Works</p>
        <p>
          This assessment consists of multiple-choice questions with single
          select or multiple select options.
        </p>

        <p className="font-bold font-Montserrat my-2">What You Will Need</p>
        <ul>
          <li>A quiet room without distractions</li>
          <li>Pen and paper (optional)</li>
        </ul>

        <p className="font-bold font-Montserrat my-2">Privacy and Data Use</p>
        <p>
          Your responses are confidential. We will use your data to provide
          personalized recommendations.
        </p>
        <input
          type="checkbox"
          id="consent"
          name="consent"
          className="my-5"
          required
        />
        <label htmlFor="consent" className="  my-5">
          {" "}
          I agree to the terms and conditions
        </label>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded block mx-auto">
          Start Assessment
        </button>
      </form>
    </div>
  );
};

export default StartPage;
