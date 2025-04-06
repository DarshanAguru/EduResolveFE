const viewQuestions = ({ questions }) => {
  console.log(questions);
  const { AssignmentData, studentData } = questions;
  console.log(AssignmentData, studentData);
  return (
    <>
      {Object.entries(questions).length > 0 && (
        <div className=" m-5 p-5 border">
          <div className=" border-b-2 mb-5 pb-2">
            <p className="font-semibold text-sm tracking-wider uppercase font-Montserrat">
              scored marks:{studentData.marks}
            </p>
          </div>
          {AssignmentData.map((assignment, index1) => {
            return (
              <div key={index1}>
                <p className=" font-semibold">
                  <span className=" font-medium tracking-wide">
                    {index1 + 1}
                    {")  "}
                  </span>
                  {assignment.text}
                </p>

                <div className="flex flex-wrap gap-2 mt-1 mb-4">
                  {assignment.options.map((option, index) => {
                    const style =
                      option.isChecked &&
                      studentData.studentAnswers[index1].includes(option.value)
                        ? "bg-emerald-200 text-emerald-950 font-semibold px-2 py-1 rounded-lg"
                        : option.isChecked &&
                            !studentData.studentAnswers[index1].includes(
                              option.value
                            )
                          ? "bg-yellow-200 text-yellow-950 font-semibold px-2 py-1 rounded-lg"
                          : !option.isChecked &&
                              studentData.studentAnswers[index1].includes(
                                option.value
                              )
                            ? "bg-red-200 text-red-950 font-semibold px-2 py-1 rounded-lg "
                            : "";
                    return (
                      <p key={index}
                        className={`flex-grow ${style}`}
                      >{`${String.fromCharCode(index + 97)}) ${option.value}`}</p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default viewQuestions;
