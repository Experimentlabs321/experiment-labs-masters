import React, { useEffect, useState } from "react";
import TextEditor from "../../../../Shared/TextEditor/TextEditor";
import QuestionForm from "./QuestionForm";

const CompletionParameter = ({ setCompletionParameter }) => {
  const [selectedCompletionParameter, setSelectedCompletionParameter] =
    useState("Without Quiz");
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestionData, setSelectedQuestionData] = useState({});
  const [passMarks, setPassMarks] = useState(0);
  const handleQuestionArray = (value) => {
    setQuestions([]);
    let addQuestion = [];
    for (let index = 0; index < value; index++) {
      addQuestion.push({
        questionNo: index + 1,
        questionTitle: ``,
        defaultMarks: 1,
        options: [
          { option: "", status: "Wrong" },
          { option: "", status: "Wrong" },
          { option: "", status: "Wrong" },
          { option: "", status: "Wrong" },
        ],
      });
    }
    setQuestions(addQuestion);
    setSelectedQuestionData(addQuestion[0]);
  };

  useEffect(() => {
    setCompletionParameter({
      completionParameter: selectedCompletionParameter,
      numberOfQuestion: numberOfQuestion,
      passMarks: passMarks,
      questions: questions,
    });
  }, [selectedCompletionParameter, numberOfQuestion, questions, passMarks]);
  return (
    <div className="">
      <p className="text-[25px] font-bold mb-2">Completion Parameter</p>
      <div className="flex flex-col lg:flex-row ms-3">
        <div className=" flex basis-1/2 flex-col justify-center ">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg me-[36px]">Make as completed</p>
          </div>
          <div className=" flex gap-7 ms-6 mt-3 items-center  h-[40px] text-[#535353] ">
            <div>
              <input
                id="draft"
                className="peer/draft me-2 "
                type="radio"
                name="status"
                value="Without Quiz"
                checked={selectedCompletionParameter === "Without Quiz"}
                onChange={(e) => setSelectedCompletionParameter(e.target.value)}
              />
              <label for="draft" className="peer-checked/draft: font-normal">
                Without Quiz
              </label>
            </div>

            <div>
              <input
                id="published"
                class="peer/published me-2"
                type="radio"
                name="status"
                value="With Quiz"
                checked={selectedCompletionParameter === "With Quiz"}
                onChange={(e) => setSelectedCompletionParameter(e.target.value)}
              />
              <label
                for="published"
                class="peer-checked/published: font-normal"
              >
                With Quiz
              </label>
            </div>
          </div>
        </div>
        {selectedCompletionParameter === "With Quiz" && (
          <div className=" flex basis-1/2 flex-col justify-center mt-2 :mt-0 ">
            <div className="flex items-center gap-4 mb-2">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">Number of question</p>
            </div>
            <div className="text-[18px] w-[40%]  h-[40px] flex  ">
              <button
                type="button"
                style={{
                  boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                }}
                className=" border w-[50%] text-[#000000] rounded-s-full text-center"
                onClick={() => {
                  setNumberOfQuestion(numberOfQuestion - 1);
                  handleQuestionArray(numberOfQuestion - 1);
                }}
              >
                -
              </button>
              <input
                value={numberOfQuestion}
                onChange={(e) => {
                  setNumberOfQuestion(parseInt(e.target.value));
                  handleQuestionArray(parseInt(e.target.value));
                }}
                className="w-[60%] focus:outline-none flex justify-center items-center text-center font-sans"
                type="number"
                name="itemValue"
                id="itemValue"
              />
              <button
                type="button"
                style={{
                  boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                }}
                className="border w-[50%] text-[#000000] rounded-e-full text-center"
                onClick={() => {
                  setNumberOfQuestion(numberOfQuestion + 1);
                  handleQuestionArray(numberOfQuestion + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedCompletionParameter === "With Quiz" && (
        <div className="flex gap-12 me-10">
          <div className="mt-10 basis-1/2">
            <div className="flex items-center gap-4">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">Pass Marks</p>
            </div>

            <input
              className="mt-6 ms-6 border rounded-md w-full h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
              name="passMarks"
              onChange={(e) => setPassMarks(parseInt(e.target.value))}
              type="number"
              placeholder="Eg. 2"
            />
          </div>
        </div>
      )}
      {numberOfQuestion > 0 && (
        <>
          {currentQuestion + 1 === selectedQuestionData?.questionNo && (
            <QuestionForm
              questions={questions}
              currentQuestion={currentQuestion}
              selectedQuestionData={selectedQuestionData}
              setSelectedQuestionData={setSelectedQuestionData}
              setCurrentQuestion={setCurrentQuestion}
              setQuestions={setQuestions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CompletionParameter;
