///AddingEditingEssayQues

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import required from "../../../assets/ContentManagement/required.png";
import back from "../../../assets/ContentManagement/back.svg";

import { Link } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import TextEditor from "../../Shared/TextEditor/TextEditor";

const AddingEditingEssayQues = () => {
  const [selectedTab, setSelectedTab] = useState("addingEditingEssayQues");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///
  const [isOpenGeneralCourseInfo, setIsOpenGeneralCourseInfo] = useState(true);
  const [isOpenCourseFormat, setIsOpenCourseFormat] = useState(false);
  const [generalFeedback, setGeneralFeedback] = useState("");
  const [questionText, setQuestionText] = useState("");

  const toggleDropdownCourseSelection = () => {
    setIsOpenGeneralCourseInfo(!isOpenGeneralCourseInfo);
  };
  const toggleDropdownCourseFormat = () => {
    setIsOpenCourseFormat(!isOpenCourseFormat);
  };

  // add course category
  const [isOpenAddCourseCategory, setIsOpenAddCourseCategory] = useState(false);

  const openModalAddCourseCategory = () => {
    setIsOpenAddCourseCategory(true);
  };

  const closeModalAddCourseCategory = () => {
    setIsOpenAddCourseCategory(false);
  };

  const { user } = useContext(AuthContext);

  // console.log(user)

  /// handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const questionName = form.questionName?.value;
    const defaultMarks = form.defaultMarks?.value;
    const questionStatus = form.questionStatus?.value;
    const category = form.category?.value;
    const responseFormat = form.responseFormat?.value;
    const inputBoxSize = form.inputBoxSize?.value;
    const minimumWordLimit = form.minimumWordLimit?.value;
    const maximumWordLimit = form.maximumWordLimit?.value;

    const addCourse = {
      questionName,
      defaultMarks,
      questionStatus,
      category,
      generalFeedback,
      questionText,
      responseFormat,
      inputBoxSize,
      minimumWordLimit,
      maximumWordLimit,
    };

    // console.log(addCourse)
  };

  return (
    <div>
      <Layout>
        {/* <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Live Test in Topic 1</p>

                </div> */}
        {/*  <div className='px-10 flex  justify-between pb-3 text-lg'>
                    <Link to='/quizGeneralinfo'
                        onClick={() => handleTabClick('Quiz General Information')}
                        style={{
                            fontWeight: selectedTab === 'Quiz General Information' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Quiz General Information' ? '2px solid black' : 'none'
                        }}
                    >
                        Quiz General Information
                    </Link>
                    <Link to='/manageQuestion'
                        onClick={() => handleTabClick('Questions')}
                        style={{
                            fontWeight: selectedTab === 'Questions' || 'addingEditingEssayQues' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Questions' || 'addingEditingEssayQues' ? '2px solid black' : 'none'
                        }}
                    >
                        Questions
                    </Link>
                    <Link to='/manageQuestionBank'
                        onClick={() => handleTabClick('Question Bank')}
                        style={{
                            fontWeight: selectedTab === 'Question Bank' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Question Bank' ? '2px solid black' : 'none'
                        }}
                    >
                        Question Bank
                    </Link>
                    <Link to='/quizResult'
                        onClick={() => handleTabClick('Results')}
                        style={{
                            fontWeight: selectedTab === 'Results' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Results' ? '2px solid black' : 'none'
                        }}
                    >
                        Results
                    </Link>
                    <Link to='/quizEvaluationParameter'
                        onClick={() => handleTabClick('Evaluation Parameter')}
                        style={{
                            fontWeight: selectedTab === 'Evaluation Parameter' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Evaluation Parameter' ? '2px solid black' : 'none'
                        }}
                    >
                        Evaluation Parameter
                    </Link>
                </div> */}

        <div className="mx-10 mt-10">
          <div className="flex justify-between items-center mb-10">
            <p className=" text-[26px] font-bold ">
              Adding/Editing Essay Question{" "}
            </p>
            <Link
              to="/manageQuestion"
              className="bg-[#3E4DAC] flex  px-4 py-2 rounded-lg text-[#fff]"
            >
              <img src={back} alt="back" />
              <p className="">Back</p>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="">
            <div
              className="select-option flex items-center gap-[40px] cursor-pointer"
              onClick={toggleDropdownCourseSelection}
            >
              <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                1
              </h1>
              <p className="text-[25px] font-bold">General</p>
              {!isOpenGeneralCourseInfo && (
                <img className="w-6" src={arrowright} alt="arrowRight" />
              )}

              {isOpenGeneralCourseInfo && (
                <img src={arrowDown} alt="arrowDown" />
              )}

              <i
                className={`dropdown-arrow ${
                  isOpenGeneralCourseInfo ? "open" : ""
                }`}
              ></i>
            </div>
            {isOpenGeneralCourseInfo && (
              <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between gap-5 me-10">
                <div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        {" "}
                        Question Name
                      </p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-[95%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="questionName"
                      type="text"
                      placeholder="Question Name"
                    />
                  </div>

                  {/*   <div className="mt-20">
                                        <div className="flex items-center gap-4">
                                            <p className="h-2 w-2 bg-black rounded-full"></p>
                                            <p className="font-bold text-lg me-[36px]">
                                                {" "}
                                                Question Title
                                            </p>
                                            <img src={required} alt="required" />
                                        </div>

                                        <input
                                            required
                                            className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                            name="questionTitle"
                                            type="text"
                                            placeholder="Question Title"
                                        />
                                    </div> */}

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Default Marks
                      </p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[80%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="defaultMarks"
                      type="number"
                      defaultValue={1}
                      placeholder="number"
                    />
                  </div>
                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Question Status
                      </p>
                    </div>

                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          id="Ready"
                          name="questionStatus"
                          value="ready"
                        />
                        <label> Ready</label>
                      </div>
                      <div className="flex gap-2 ms-[55px]">
                        <input
                          type="radio"
                          id="Draft"
                          name="questionStatus"
                          value="draft"
                        />
                        <label>Draft</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Question text
                      </p>
                    </div>

                    <div className="w-[95%] mt-10">
                      <div className="bg-white text-black textEditor">
                        <TextEditor
                          value={questionText}
                          setValue={setQuestionText}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Category</p>
                      <img src={required} alt="required" />
                    </div>

                    <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[381px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                      <select
                        required
                        className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                        name="category"
                        // id="option"
                      >
                        <option className="" value="Web Development">
                          Web Development
                        </option>
                        <option value="Parent"></option>
                        <option value="Counselor"></option>
                        <option value="Others"></option>
                      </select>
                      <div
                        onClick={openModalAddCourseCategory}
                        className="w-[96px] bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center"
                      >
                        <p className="text-2xl">+</p>
                        <div>
                          <p className="w-full">Add</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      {isOpenAddCourseCategory && (
                        <div className="modal-overla w-[438px] h-[325px] rounded-md mt-3 bg-[#fff] border">
                          <div className="modal-content">
                            <div className="border-b flex justify-between items-center pt-6 px-10 pb-5 text-[#3E4DAC] text-xl font-bold">
                              <p>Add Course Category</p>
                              <p
                                onClick={closeModalAddCourseCategory}
                                className=" flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
                              >
                                x
                              </p>
                            </div>
                            <div className="mt-6 mx-10">
                              <div className="flex items-center gap-4">
                                <p className="font-bold text-lg me-[36px]">
                                  {" "}
                                  Course Category Name
                                </p>
                              </div>

                              <input
                                className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                name="courseCategory"
                                type="text"
                                placeholder="Eg. Entrepreneurship Lab"
                              ></input>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        General Feedback
                      </p>
                    </div>

                    <div className="w-[95%] mt-10">
                      <div className="bg-white text-black textEditor">
                        <TextEditor
                          value={generalFeedback}
                          setValue={setGeneralFeedback}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className=" flex items-center justify-between">
              <div
                className="select-option flex items-center gap-[40px] cursor-pointer"
                onClick={toggleDropdownCourseFormat}
              >
                <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                  2
                </h1>
                <p className="text-[25px] font-bold">Response Options</p>
                {!isOpenCourseFormat && (
                  <img className="w-6" src={arrowright} alt="arrowright" />
                )}

                {isOpenCourseFormat && <img src={arrowDown} alt="arrowDown" />}

                <i
                  className={`dropdown-arrow ${
                    isOpenCourseFormat ? "open" : ""
                  }`}
                ></i>
              </div>
            </div>

            {isOpenCourseFormat && (
              <div>
                <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between me-10  p-5 ">
                  <div className="">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Response Format
                        </p>
                      </div>
                      <div
                        style={{
                          background: "#F6F7FF",
                          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                        }}
                        className=" flex rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5 mt-3"
                      >
                        <select
                          required
                          className="w-full text-base font-semibold border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                          name="responseFormat"
                          id="option"
                        >
                          <option className="" value="Html editor">
                            Html editor
                          </option>
                          <option value="Html editor with file picker">
                            Html editor with file picker
                          </option>
                          <option value="Plain text">Plain text</option>
                          <option value="Others">No online text</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-20">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Input box Size
                        </p>
                      </div>
                      <div
                        style={{
                          background: "#F6F7FF",
                          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                        }}
                        className=" flex rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5 mt-3"
                      >
                        <select
                          required
                          className="w-full text-base font-semibold border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                          name="inputBoxSize"
                          id="option"
                        >
                          <option value="2 lines">2 lines</option>
                          <option value="3 lines">3 lines</option>
                          <option value="5 lines">5 lines</option>
                          <option value="10 lines">10 lines</option>
                          <option value="15 lines">15 lines</option>
                          <option value="20 lines">20 lines</option>
                          <option value="25 lines">25 lines</option>
                          <option value="30 lines">30 lines</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className=" ">
                    {/*   <div className=''>
                                            <div className='flex items-center gap-4'>
                                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                                <p className='font-semibold text-[#000000]  py-2'>Requires Text</p>


                                            </div>
                                            <div
                                                style={{
                                                    background: "#F6F7FF",
                                                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                                                }}
                                                className=" flex rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5 mt-3">

                                                <select
                                                    required
                                                    className="w-full text-base font-semibold border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                                                    name="gradeAllocation"
                                                    id="option"
                                                >

                                                    <option className="" value="Requires the student to enter text">Requires the student to enter text</option>
                                                    <option value="Parent"></option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>

                                            </div>

                                        </div> */}

                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Minimum word limit
                        </p>
                      </div>

                      <input
                        className="mt-6 ms-6 border rounded-md w-[60%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                        name="minimumWordLimit"
                        type="number"
                        placeholder="number"
                      />
                    </div>

                    <div className="mt-20">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Maximum word limit
                        </p>
                      </div>

                      <input
                        className="mt-6 ms-6 border rounded-md w-[60%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                        name="maximumWordLimit"
                        type="number"
                        placeholder="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="save"
                className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
              />
              <input
                type="submit"
                value="Save & Display"
                className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>

    /*  */
  );
};

export default AddingEditingEssayQues;
