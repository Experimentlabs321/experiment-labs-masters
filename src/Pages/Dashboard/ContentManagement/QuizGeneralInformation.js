import required from "../../../assets/ContentManagement/required.png";
import React, { useState } from "react";
import Layout from "../Layout";
import { Link, useParams } from "react-router-dom";
import TextEditor from "../../Shared/TextEditor/TextEditor";
import axios from "axios";
import { toast } from "react-hot-toast";

const QuizGeneralInformation = () => {
  const [selectedTab, setSelectedTab] = useState("Quiz General Information");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const { id } = useParams();
  const [quizDescription, setQuizDescription] = useState("");
  const [submitPermission, setSubmitPermission] = useState(false);
  const [quizData, setQuizData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      taskName: e.target.quizName.value,
      quizName: e.target.quizName.value,
      quizDescription: quizDescription,
      quizAttempts: e.target.quizAttempts.value,
      shuffleWithInQuestions: e.target.shuffleWithInQuestions.value,
      points: e.target.points.value,
      isMarksTotalPoints: e.target.isMarksTotalPoints.value,
      marks: e.target.marks.value,
      totalPoints: e.target.totalPoints.value,
      skillParameterData: [],
      earningParameterData: [],
      chapterId: id,
      questions: [],
    };

    setQuizData(formData);

    if (submitPermission) {
      const newAssignment = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/tasks/quizes`,
        formData
      );

      if (newAssignment?.data?.acknowledged) {
        console.log(newAssignment);
        toast.success("Quiz added Successfully");
        e.target.reset();
      }

      console.log(formData);
    }
  };

  return (
    <div>
      <Layout>
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Quiz in Topic 1</p>
        </div>
        <div className="px-10 flex  justify-between pb-3 text-lg">
          <Link
            disabled
            to={`/quizGeneralInfo/${id}`}
            onClick={() => handleTabClick("Quiz General Information")}
            style={{
              fontWeight:
                selectedTab === "Quiz General Information" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Quiz General Information"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Quiz General Information
          </Link>
          <Link
            disabled
            to={`/manageQuestion/${id}`}
            onClick={() => handleTabClick("Questions")}
            style={{
              fontWeight: selectedTab === "Questions" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Questions" ? "2px solid black" : "none",
            }}
          >
            Questions
          </Link>
          <Link
            to={`/manageQuestionBank/${id}`}
            onClick={() => handleTabClick("Question Bank")}
            style={{
              fontWeight: selectedTab === "Question Bank" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Question Bank" ? "2px solid black" : "none",
            }}
          >
            Question Bank
          </Link>
          <Link
            to={`/quizResult/${id}`}
            onClick={() => handleTabClick("Results")}
            style={{
              fontWeight: selectedTab === "Results" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Results" ? "2px solid black" : "none",
            }}
          >
            Results
          </Link>
          <Link
            to={`/quizEvaluationParameter/${id}`}
            onClick={() => handleTabClick("Evaluation Parameter")}
            style={{
              fontWeight:
                selectedTab === "Evaluation Parameter" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Evaluation Parameter"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Evaluation Parameter
          </Link>
        </div>

        {selectedTab === "Quiz General Information" && (
          <div className="mx-10 my-20">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="w-full">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Quiz Name</p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="quizName"
                      type="text"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>

                  <div className=" mt-16">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Quiz Description
                      </p>
                    </div>

                    <div className="py-4 pr-5">
                      <div className="bg-white text-black">
                        <TextEditor setValue={setQuizDescription} />
                      </div>
                    </div>
                  </div>
                  <div className="w-[80%]">
                    <div className="flex justify-between mt-16">
                      <div className=" ">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-semibold text-[#000000]  py-2">
                            Grade Method
                          </p>
                        </div>
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className=" flex  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5"
                        >
                          <select
                            required
                            className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-black"
                            name="quizAttempts"
                            id="quizAttempts"
                          >
                            <option className="text-black" value="Student">
                              Highest Grade
                            </option>
                            <option className="text-black" value="Parent">
                              Parent
                            </option>
                            <option className="text-black" value="Counselor">
                              Counselor
                            </option>
                            <option className="text-black" value="Others">
                              Others
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className=" ">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-semibold text-[#000000]  py-2">
                            Shuffle within Questions
                          </p>
                        </div>

                        <div className=" flex gap-7 items-center  h-[40px] ms-5   text-[#535353] ">
                          <div>
                            <input
                              id="draft"
                              className="peer/draft me-2 "
                              type="radio"
                              name="shuffleWithInQuestions"
                              checked
                            />
                            <label
                              for="draft"
                              className="peer-checked/draft: font-normal"
                            >
                              Yes
                            </label>
                          </div>

                          <div>
                            <input
                              id="published"
                              class="peer/published me-2"
                              type="radio"
                              name="shuffleWithInQuestions"
                            />
                            <label
                              for="published"
                              class="peer-checked/published: font-normal"
                            >
                              NO
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Quiz Total Points/Marks
                      </p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="points"
                      type="number"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>

                  <div className="flex justify-between mt-16">
                    <div>
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Quiz Attempts
                        </p>
                      </div>
                      <div
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className=" flex mx-5 mt-5 border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] "
                      >
                        <select
                          required
                          className="w-full border-0 focus:outline-0 bg-[#F6F7FF]"
                          name="quizAttempts"
                          id="quizAttempts"
                        >
                          <option className="" value="Unlimited">
                            Unlimited
                          </option>
                          <option className="" value="Parent">
                            Parent
                          </option>
                          <option className="" value="Counselor">
                            Counselor
                          </option>
                          <option className="" value="Others">
                            Others
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="ms-16">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Grade to pass
                        </p>
                      </div>
                      <div className="flex gap-2 mt-5">
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className=" flex  border  rounded-lg h-[40px] w-[20%] px-2 text-[#535353] "
                        >
                          <input
                            className="w-[100%] bg-[#F6F7FF]"
                            type="text"
                            name="gradeToPass"
                          />
                        </div>
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className="flex items-center border  rounded-lg h-[40px] w-[40%] text-[#535353]"
                        >
                          <select
                            required
                            className=" border-0 focus:outline-0 bg-[#F6F7FF]"
                            name="option"
                            id="option"
                          >
                            <option className="" value="Percentage">
                              Percentage
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-semibold text-[#000000]  py-2">
                        Is Marks = Total Points?
                      </p>
                    </div>

                    <div className=" flex gap-7 items-center  h-[40px] ms-5  text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name="isMarksTotalPoints"
                          checked
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          Yes
                        </label>
                      </div>

                      <div>
                        <input
                          id="published"
                          class="peer/published me-2"
                          type="radio"
                          name="isMarksTotalPoints"
                        />
                        <label
                          for="published"
                          class="peer-checked/published: font-normal"
                        >
                          NO
                        </label>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <input
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className="border rounded px-4 py-2 w-[100px]"
                        type="text"
                        name="marks"
                        placeholder="Marks"
                      />
                      <p className="w-[50px] flex justify-center items-center font-bold">
                        =
                      </p>
                      <input
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className="border rounded px-4 py-2 "
                        type="text"
                        name="totalPoints"
                        placeholder="Total Points"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-20 mb-10">
                <input
                  type="submit"
                  value="Save"
                  className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                />
                <input
                  type="submit"
                  onClick={() => setSubmitPermission(true)}
                  value="Save & Display"
                  className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
                />
              </div>
            </form>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default QuizGeneralInformation;
