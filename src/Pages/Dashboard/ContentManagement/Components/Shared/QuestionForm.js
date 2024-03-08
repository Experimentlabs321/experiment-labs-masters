import React, { useEffect, useState } from "react";
import TextEditor from "../../../../Shared/TextEditor/TextEditor";

const QuestionForm = ({
  questions,
  currentQuestion,
  selectedQuestionData,
  setSelectedQuestionData,
  setCurrentQuestion,
  setQuestions,
}) => {
  const [question, setQuestion] = useState(selectedQuestionData?.questionTitle);
  const [defaultNumber, setDefaultNumber] = useState(
    selectedQuestionData?.defaultMarks
  );

  useEffect(() => {
    setQuestion(selectedQuestionData?.questionTitle);
    setDefaultNumber(selectedQuestionData?.defaultMarks);
  }, [selectedQuestionData]);

  const handleNextQuestion = () => {
    setSelectedQuestionData(questions[currentQuestion + 1]);
    setQuestion(questions[currentQuestion + 1]?.questionTitle);
    setCurrentQuestion(currentQuestion + 1);
    console.log(question);
  };

  const handleBackQuestion = () => {
    setSelectedQuestionData(questions[currentQuestion - 1]);
    setQuestion(questions[currentQuestion - 1]?.questionTitle);
    setCurrentQuestion(currentQuestion - 1);
    console.log(question);
  };

  const handleQuestionBlur = () => {
    let allQuestions = questions;
    let selectedQuestion = allQuestions[currentQuestion];
    selectedQuestion.questionTitle = question;
    allQuestions[currentQuestion] = selectedQuestion;
    setQuestions(allQuestions);
  };

  console.log(selectedQuestionData);

  return (
    <div id={`key-${selectedQuestionData?.questionNo}`} className={`mt-10 `}>
      {selectedQuestionData && (
        <div className="  mb-[45px] bg-[#F7F7F7] p-5 rounded-lg">
          <h1 className="text-2xl underline font-bold">
            Question {selectedQuestionData?.questionNo}
          </h1>
          <div className="mb-[45px] flex gap-10 me-5">
            <div className=" basis-1/2">
              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]"> Question Title</p>
                </div>
                {/* Text editor */}
                <div className="py-4">
                  <div
                    id={`textEditor-${selectedQuestionData.questionTitle}`}
                    className="bg-white text-black textEditor"
                  >
                    <TextEditor
                      onBlur={() => handleQuestionBlur()}
                      setValue={setQuestion}
                      value={selectedQuestionData?.questionTitle}
                    />
                  </div>
                </div>
                {/* <p>{question}</p>
                <div dangerouslySetInnerHTML={{ __html: question }} /> */}
              </div>
            </div>
            <div className=" basis-1/2">
              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Default Marks</p>
                </div>

                <input
                  className="mt-6 ms-6 border rounded-md w-full h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                  name={`defaultMarks ${selectedQuestionData?.questionNo}`}
                  type="number"
                  value={defaultNumber}
                  onChange={(e) => {
                    setDefaultNumber(parseInt(e.target.value));
                    let allQuestions = questions;
                    let selectedQuestion = allQuestions[currentQuestion];
                    selectedQuestion.defaultMarks = parseInt(e.target.value);
                    allQuestions[currentQuestion] = selectedQuestion;
                    setQuestions(allQuestions);
                    setSelectedQuestionData(selectedQuestion);
                  }}
                  placeholder="Eg. 2"
                />
              </div>
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <p className="font-bold text-2xl me-[36px]">Answers</p>
            </div>
            <div>
              {/* {selectedQuestionData?.answerOptions?.map((answerOption, i) => (
                <div className="mt-5">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Option {i + 1}
                    </p>
                  </div>
                  <div className="flex items-center ">
                    <input
                      className="mt-4 basis-1/2 ms-6 border rounded-md w-full h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="option1"
                      type="text"
                      placeholder="Eg. 2"
                      defaultValue={answerOption.option}
                      onBlur={(e) => {
                        let allQuestions = questions;
                        let selectedQuestion = allQuestions[currentQuestion];
                        selectedQuestion.answerOptions[i].option =
                          e.target.value;
                        allQuestions[currentQuestion] = selectedQuestion;
                        setQuestions(allQuestions);
                      }}
                    />
                    <div className=" basis-1/2 flex gap-7 ms-6 mt-3 items-center  h-[40px] text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name={`optionStatus-${currentQuestion}-${i}1`}
                          value="Wrong"
                          checked={answerOption?.status === "Wrong"}
                          onChange={(e) => {
                            let allQuestions = questions;
                            let selectedQuestion =
                              allQuestions[currentQuestion];
                            selectedQuestion.answerOptions[i].status =
                              e.target.value;
                            allQuestions[currentQuestion] = selectedQuestion;
                            setSelectedQuestionData(selectedQuestion);
                            setQuestions(allQuestions);
                          }}
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          Wrong
                        </label>
                      </div>

                      <div>
                        <input
                          id="published"
                          class="peer/published me-2"
                          type="radio"
                          name={`optionStatus-${currentQuestion}-${i}2`}
                          value="Right"
                          checked={answerOption?.status === "Right"}
                          onChange={(e) => {
                            let allQuestions = questions;
                            let selectedQuestion =
                              allQuestions[currentQuestion];
                            selectedQuestion.answerOptions[i].status =
                              e.target.value;
                            allQuestions[currentQuestion] = selectedQuestion;
                            setSelectedQuestionData(selectedQuestion);
                            setQuestions(allQuestions);
                          }}
                        />
                        <label
                          for="published"
                          class="peer-checked/published: font-normal"
                        >
                          Right
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
              {selectedQuestionData?.options?.map((answerOption, i) => (
                <div className="mt-5" key={i}>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Option {i + 1}
                    </p>
                  </div>
                  <div className="flex items-center ">
                    <input
                      className="mt-4 basis-1/2 ms-6 border rounded-md w-full h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name={`optionStatus-${currentQuestion}-${i}`}
                      type="text"
                      placeholder="Eg. 2"
                      value={answerOption.option}
                      onChange={(e) => {
                        let updatedOptions = [...selectedQuestionData.options];
                        updatedOptions[i].option = e.target.value;
                        setSelectedQuestionData({
                          ...selectedQuestionData,
                          options: updatedOptions,
                        });
                      }}
                    />
                    <div className="basis-1/2 flex gap-7 ms-6 mt-3 items-center h-[40px] text-[#535353] ">
                      <div>
                        <input
                          id={`draft-${i}`}
                          className="peer/draft me-2"
                          type="radio"
                          name={`optionStatus-${currentQuestion}-${i}`}
                          value="Wrong"
                          checked={answerOption.status === "Wrong"}
                          onChange={() => {
                            let updatedOptions = [
                              ...selectedQuestionData.options,
                            ];
                            updatedOptions[i].status = "Wrong";
                            setSelectedQuestionData({
                              ...selectedQuestionData,
                              options: updatedOptions,
                            });
                          }}
                        />
                        <label
                          htmlFor={`draft-${i}`}
                          className="peer-checked/draft: font-normal"
                        >
                          Wrong
                        </label>
                      </div>

                      <div>
                        <input
                          id={`published-${i}`}
                          className="peer/published me-2"
                          type="radio"
                          name={`optionStatus-${currentQuestion}-${i}`}
                          value="Right"
                          checked={answerOption.status === "Right"}
                          onChange={() => {
                            let updatedOptions = [
                              ...selectedQuestionData.options,
                            ];
                            updatedOptions[i].status = "Right";
                            setSelectedQuestionData({
                              ...selectedQuestionData,
                              options: updatedOptions,
                            });
                          }}
                        />
                        <label
                          htmlFor={`published-${i}`}
                          className="peer-checked/published: font-normal"
                        >
                          Right
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mb-5 w-full gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (currentQuestion > 0) handleBackQuestion();
              }}
              className={`bg-[#FF557A] ${
                currentQuestion === 0 && "opacity-[0.5]"
              }  text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M8.58594 4.10726L5.41984 7.27335L8.58594 10.4395"
                  stroke="white"
                  stroke-width="0.903057"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (currentQuestion < questions?.length - 1)
                  handleNextQuestion();
              }}
              className={`bg-[#FFDB70] ${
                currentQuestion === questions?.length - 1 && "opacity-[0.5]"
              } text-black px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M5.1875 10.4416L8.3536 7.27547L5.1875 4.10938"
                  stroke="#282828"
                  stroke-width="1.04683"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
