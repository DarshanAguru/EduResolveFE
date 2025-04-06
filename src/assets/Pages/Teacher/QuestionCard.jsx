/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../api";
const QuestionCard = ({
  stuclass,
  subject,
  id,
  name,
  school,
  token,
  refresh,
  goBack,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [isAnyOptionChecked, setIsAnyOptionChecked] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, value: "", isChecked: false },
    { id: 2, value: "", isChecked: false },
    { id: 3, value: "", isChecked: false },
    { id: 4, value: "", isChecked: false },
  ]);
  const [marks, setMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submissionDate, setSubmissionDate] = useState("");
  const addOption = () => {
    const newOptionId = options[options.length - 1].id + 1;
    setOptions([...options, { id: newOptionId, value: "", isChecked: false }]);
  };
  const removeOption = (id) => {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);
  };
  const updateOptionValue = (id, value) => {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, value } : option
    );
    setOptions(newOptions);
  };

  const toggleOptionCheck = (id) => {
    const newOptions = options.map((option) =>
      questionType === "single"
        ? { ...option, isChecked: option.id === id }
        : option.id === id
          ? { ...option, isChecked: !option.isChecked }
          : option
    );

    // Update options as before
    setOptions(newOptions);

    // Check if any option is checked and update state
    const anyChecked = newOptions.some((option) => option.isChecked);
    setIsAnyOptionChecked(anyChecked);
  };
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };
  const submitQuestion = (e) => {
    e.preventDefault();
    if (
      questionType === "single" &&
      !options.some((option) => option.isChecked)
    ) {
      toast.warn("Please select at least one option for the question.");
      return;
    }

    // For multiple choice questions, ensure at least one checkbox is checked
    if (questionType === "multiple" && !isAnyOptionChecked) {
      toast.warn("Please select at least one option for the question.");
      return;
    }
    const newQuestion = {
      text: questionText,
      type: questionType,
      options,
      marks,
    };
    const newAnswers = options
      .filter((option) => option.isChecked)
      .map((option) => option.value);

    setQuestions([...questions, newQuestion]);
    setAnswers([...answers, newAnswers]);

    // Reset form
    setQuestionText("");
    setQuestionType("single");
    setOptions([
      { id: 1, value: "", isChecked: false },
      { id: 2, value: "", isChecked: false },
      { id: 3, value: "", isChecked: false },
      { id: 4, value: "", isChecked: false },
    ]);
    setMarks("");
  };

  const postAssessment = async (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      toast.warn(
        "Please add at least one question before posting the assessment."
      );
      return;
    }
    try {
      const res = await api.put(
        `/teachers/postassignment/${id}@${uuidv4()}`,
        {
          deadline: `${submissionDate.split("-")[1]}/${submissionDate.split("-")[2]}/${submissionDate.split("-")[0]}`,
          totalQuestions: questions.length,
          questions: questions.map((question, index) => ({
            ...question,
            answers: answers[index],
          })),
          grade: stuclass,
          subject,
          assignmentTitle: `${subject} Assessment by ${name}`,
          school,
          token,
          id,
        }
      );
      console.log(res);

      if (res.status === 201) {
        toast.success(" Assessment submitted successfully", {
          onClose: () => refresh(),
        });
      }

      // refresh();
    } catch (error) {
      console.error("Error posting the assessment:", error);

      toast.error("An error occurred while posting the assessment.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        onClick={goBack}
        className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 hover:bg-gray-300 mr-auto"
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
      <form
        onSubmit={postAssessment}
        className="flex justify-center gap-5 md:gap-2 md:justify-between items-center flex-wrap "
      >
        <p className="font-bold font-Montserrat text-[#917A68] tracking-wide">
          Total Questions Added: {questions.length}
        </p>
        <div>
          <label
            htmlFor="submission-date"
            className="font-bold font-Montserrat text-[#917A68] tracking-wide"
          >
            Enter Submission Date :{"  "}
          </label>
          <input
            type="date"
            id="submission-date"
            className="border mb-2 p-1"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            required
          />
        </div>
        <button className="border-none text-white p-1 font-bold font-Montserrat px-2 rounded bg-[#917A68] hover:bg-[#282323] hover:font-bold cursor-pointer tracking-wider">
          Post Assessment
        </button>
      </form>
      <form
        onSubmit={submitQuestion}
        className=" shadow-md  border rounded-lg mt-3 p-5"
      >
        <div className="flex sm:gap-5 gap-2 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            placeholder="Enter Question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="col-span-2 mb-4 border w-1/2 p-1 flex-grow"
            required
          />
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="col-span-2 mb-4 border w-1/4 p-1 flex-grow"
            required
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>
          <input
            type="number"
            placeholder="Enter marks for question"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="col-span-2 mb-4 border w-1/4 p-1 flex-grow"
            required
          />
        </div>
        {options.map((option) => (
          <div
            key={option.id}
            className="flex flex-wrap items-center col-span-2"
          >
            <input
              type={questionType === "single" ? "radio" : "checkbox"}
              name="questionOption"
              checked={option.isChecked}
              onChange={() => toggleOptionCheck(option.id)}
              className="mr-2 border-slate-700 border-2"
              required={!isAnyOptionChecked}
            />
            <input
              type="text"
              placeholder={`Option ${option.id}`}
              value={option.value}
              onChange={(e) => updateOptionValue(option.id, e.target.value)}
              className="flex-grow mr-2 mb-2 border p-1"
              required
            />
            {/* Add a button to remove the option */}
            <button
              onClick={() => removeOption(option.id)}
              className="border-red-500  p-2 text-red-500 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          type="button"
          className="block bg-slate-400 p-2 mt-2 text-white rounded-lg"
        >
          + Add Option
        </button>
        <button className="bg-slate-700 rounded-xl p-2 mt-5 text-white">
          Submit Question
        </button>
      </form>
      <div className="questions-display">
        <p className="font-semibold my-3">Added Questions</p>
        {questions.map((question, index) => (
          <div key={index} className="border p-3 mb-4">
            <div className="flex justify-between my-1">
              <p className="text-base font-medium">
                <span className="text-base font-medium">
                  {" "}
                  {index + 1}
                  {". "}
                </span>{" "}
                {question.text}
              </p>
              <p className="text-base font-medium">Marks: {question.marks}</p>
            </div>
            <div className=" text-left">
              <span className="text-base font-medium my-1">Options: </span>

              {question.options.map((option) => (
                <p key={option.id}>{`${option.value}   `} </p>
              ))}
            </div>

            <div className="text-left">
              <p className=" font-medium my-1">Answers:</p>
              {answers[index].map((answer, ansIndex) => (
                <p key={ansIndex}>{answer}</p>
              ))}
            </div>
            <button
              onClick={() => removeQuestion(index)}
              className="border-red-500 p-2 text-red-500 rounded-lg"
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
