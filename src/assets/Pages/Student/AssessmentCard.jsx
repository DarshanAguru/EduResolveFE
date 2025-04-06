/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartPage from "./StartPage";
import api from '../../api';
import Confetti from "react-confetti";
const AssessmentCard = ({ id, token, userId, name, goBack, deadline }) => {
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [marks, setMarks] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleStartClick = () => {
    setStart((prev) => !prev);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width, windowSize.height]);
  useEffect(() => {
    if (marks) {
      // Checks if marks are available
      const timer = setTimeout(() => {
        goBack();
      }, 10000);
      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [marks]); // Dependency array

  // Function to handle direct redirect
  const handleDirectRedirect = () => {
    goBack(); // Immediately redirects to the assessments page
  };
  useEffect(() => {
    async function getAssignmentQuestions() {
      const res = await api.post(
        `/students/getAssignment/${id}`,
        { token, id: userId }
      );

      setQuestions(res.data._doc.questions);
    }
    getAssignmentQuestions();
  }, []);
  const handleOptionChange = (questionIndex, option, isMultiple) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (isMultiple === "multiple") {
        if (!updatedAnswers[questionIndex]) updatedAnswers[questionIndex] = [];

        const currentAnswers = updatedAnswers[questionIndex];
        const optionIndex = currentAnswers.indexOf(option);

        if (optionIndex > -1) {
          // Option already selected, remove it
          updatedAnswers[questionIndex] = currentAnswers.filter(
            (opt) => opt !== option
          );
        } else {
          // Option not selected, add it
          updatedAnswers[questionIndex] = [...currentAnswers, option];
        }
      } else {
        // For single choice, directly set or replace the answer
        updatedAnswers[questionIndex] = [option];
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEveryQuestionValid = questions.every((question, questionIndex) => {
      const questionId = questionIndex.toString(); // Use questionIndex for identification

      if (question.type === "single") {
        return answers[questionId] !== undefined;
      }

      if (question.type === "multiple") {
        const questionAnswers = answers[questionId];
        return (
          questionAnswers &&
          Object.values(questionAnswers).some((isSelected) => isSelected)
        );
      }

      return false; // Fallback for invalid question type
    });

    if (!isEveryQuestionValid) {
      toast.warn(
        "Please select at least one option for all multiple choice questions."
      );
      return; // Prevent form submission if validation fails
    }

    let storageData = JSON.parse(localStorage.getItem("student"));
    storageData.assignments.push(id);
    localStorage.setItem("student", JSON.stringify(storageData));

    toast.success("Answers submitted successfully!");
    async function submitAnswers() {
      const res = await api.put(
        `/students/submitAssignment/${id}`,
        {
          token,
          id: userId,
          senderId: userId,
          senderName: name,
          assignmentAnswers: answers,
        }
      );
      setMarks(res.data.marks);
    }
    submitAnswers();
  };

  return (
    <div>
      <ToastContainer />
      {!start ? (
        <StartPage
          start={handleStartClick}
          goBack={goBack}
          deadline={deadline}
        />
      ) : !marks ? (
        <form
          onSubmit={handleSubmit}
          className=" shadow-md  border rounded-lg lg:mx-10 mt-3 p-5 text-left"
        >
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className=" border-b-2 py-2">
              {" "}
              <p>
                {questionIndex + 1}. {question.text}
              </p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  {" "}
                  {/* Similarly, ensure each option has a unique key */}
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={questionIndex.toString()}
                    id={questionIndex}
                    value={option.value}
                    onChange={() =>
                      handleOptionChange(
                        questionIndex.toString(),
                        option.value,
                        question.type
                      )
                    }
                  />
                  <label htmlFor={`${questionIndex}`}>
                    {" " + option.value}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded block mx-auto"
          >
            Submit Assessment
          </button>
        </form>
      ) : (
        <>
          <div className=" shadow-custom rounded-lg p-10 mt-5">
            {marks.split("/")[0] > marks.split("/")[1] / 2 ? (
              <>
                <Confetti width={windowSize.width} height={windowSize.height} />
                <p className=" font-MajorMono font-extrabold">you scored</p>
                <p className=" font-Montserrat tracking-wider font-bold ">
                  {marks.split("/")[0]} out of {marks.split("/")[1]}
                </p>
                <p className=" font-Montserrat mt-20 tracking-wider">
                  Good performance, keep it up
                </p>
              </>
            ) : (
              <>
                <p className=" font-MajorMono font-extrabold">you scored</p>
                <p className=" font-Montserrat tracking-wider font-bold ">
                  {marks.split("/")[0]} out of {marks.split("/")[1]}
                </p>
                <p className=" font-Montserrat mt-20 tracking-wider">
                  Try to improve next time
                </p>
              </>
            )}
            <button
              onClick={handleDirectRedirect}
              className="mt-5 text-blue-500 underline"
            >
              Go back to assessments now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentCard;
