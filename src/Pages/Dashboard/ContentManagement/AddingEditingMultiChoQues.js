import React, { useContext, useState } from "react";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import required from "../../../assets/ContentManagement/required.png";
import back from "../../../assets/ContentManagement/back.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import TextEditor from "../../Shared/TextEditor/TextEditor";
import Loading from "../../Shared/Loading/Loading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";

const AddingEditingMultiChoQues = ({
  addQues,
  setAddQues,
  setOpenNewQuesType,
  selectedBatchesForShowingQuestion,
  quizData,
  setQuizData,
}) => {
  const [selectedTab, setSelectedTab] = useState("addingEditingMultiChoQues");
  const { userInfo } = useContext(AuthContext);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///
  const [isOpenGeneralCourseInfo, setIsOpenGeneralCourseInfo] = useState(true);
  const [isOpenCourseFormat, setIsOpenCourseFormat] = useState(false);
  const [isShuffleChecked, setShuffleChecked] = useState(false);
  const [selectedOneOrMultipleOption, setSelectedOneOrMultipleOption] =
    useState("one");
  const [questionText, setQuestionText] = useState("");
  const [generalFeedback, setGeneralFeedback] = useState("");

  const handleShuffleCheckboxChange = (event) => {
    setShuffleChecked(event.target.checked);
  };

  const handleRadioOneOrMultipleChange = (event) => {
    setSelectedOneOrMultipleOption(event.target.value);
  };

  const toggleDropdownCourseSelection = () => {
    setIsOpenGeneralCourseInfo(!isOpenGeneralCourseInfo);
  };
  const toggleDropdownCourseFormat = () => {
    setIsOpenCourseFormat(!isOpenCourseFormat);
  };

  /* const [divCount, setDivCount] = useState(1); 
    const [options, setOptions] = useState([{ answerFormula: '', feedback: '', answer: '' }]);  */
  const [divCount, setDivCount] = useState(2); // Initialize with 2 div elements
  const [options, setOptions] = useState(
    Array.from({ length: 2 }, () => ({
      answerFormula: "",
      feedback: "",
      answer: "wrong",
    }))
  ); // Initialize with 2 sets of empty answers

  // Function to add more div elements
  const addMoreDiv = (e) => {
    e.preventDefault();
    setDivCount((prevCount) => prevCount + 1); // Increment the count by 1
    setOptions((prevOptions) => [
      ...prevOptions,
      { answerFormula: "", feedback: "", answer: "wrong" },
    ]); // Add a new object to the Options array
  };

  // Function to handle input changes in each div
  const handleInputChange = (index, value, name) => {
    const newOptions = [...options];
    newOptions[index][name] = value;
    setOptions(newOptions);
  };
  // add course category
  const [isOpenAddCourseCategory, setIsOpenAddCourseCategory] = useState(false);

  const openModalAddCourseCategory = () => {
    setIsOpenAddCourseCategory(true);
  };

  const closeModalAddCourseCategory = () => {
    setIsOpenAddCourseCategory(false);
  };

  console.log(options);

  const { user } = useContext(AuthContext);

  console.log(user);

  /// handle Submit
  const handleSubmit = async (event) => {
    Loading();
    event.preventDefault();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    const form = event.target;

    const questionName = form.questionName?.value;

    const defaultMarks = form.defaultMarks?.value;
    // const category = form.category?.value;
    const questionStatus = form.questionStatus?.value;

    const addQuestion = {
      questionName,
      additionalFiles: fileUrl,
      questionText,
      defaultMarks,
      shuffleTheChoices: isShuffleChecked,
      oneOrMultipleOption: selectedOneOrMultipleOption,
      //category,
      generalFeedback,
      questionStatus,
      options,
      organizationId: userInfo?.organizationId,
      questionCreator: userInfo?.email,
      questionType: "Multiple choice",
    };

    const newQuestion = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/questionBank/addQuestion`,
      addQuestion
    );

    if (newQuestion?.status === 200) {
      toast.success("Question Added Successfully!");
      Loading().close();
      // const updatedQuizObject = { ...quizData };
      // updatedQuizObject.questions.push({
      //   questionId: newQuestion?.data?.insertedId,
      // });
      // setQuizData(updatedQuizObject);
      // await delete updatedQuizObject?._id;
      // Loading();
      // const newTask = await axios.put(
      //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/quizes/taskId/${quizData?._id}`,
      //   updatedQuizObject
      // );

      // if (newTask?.data?.result?.acknowledged) {
      //   // setOpenAddFromQuesBank(false);
      // }
    }

    console.log(newQuestion, addQuestion);
    backButtonHandle();
    Loading().close();
  };

  const backButtonHandle = () => {
    setOpenNewQuesType(false);
    setAddQues(false);
  };

  // upload file
  const [dragActive, setDragActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      {/* <Layout> */}
      <div className="">
        <div className="flex justify-between items-center mb-10">
          <p className=" text-[26px] font-bold ">
            Adding/Editing Multiple choice Question{" "}
          </p>
          <button
            onClick={backButtonHandle}
            className="bg-[#3E4DAC] flex  px-4 py-2 rounded-lg text-[#fff]"
          >
            <img src={back} alt="back" />
            {/* <p className="">Back</p> */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div
            className="select-option flex items-center gap-[40px]"
            onClick={toggleDropdownCourseSelection}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              1
            </h1>
            <p className="text-[25px] font-bold">General</p>
            {!isOpenGeneralCourseInfo && (
              <img className="w-6" src={arrowright} alt="arrowRight" />
            )}

            {isOpenGeneralCourseInfo && <img src={arrowDown} alt="arrowDown" />}

            <i
              className={`dropdown-arrow ${
                isOpenGeneralCourseInfo ? "open" : ""
              }`}
            ></i>
          </div>
          {isOpenGeneralCourseInfo && (
            <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between">
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
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="questionName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className="w-full mt-20">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Upload Files
                      </p>
                    </div>

                    <div
                      className="w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6"
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      style={{
                        border: "0.917px dashed #000",
                        background: "#F6F7FF",
                      }}
                    >
                      {dragActive ? (
                        <>
                          <CloudUploadIcon />
                          <p className="text-[17px] font-semibold mb-3 mt-3">
                            Drag and drop{" "}
                          </p>
                          <p className="text-sm font-medium mb-3">Or</p>
                        </>
                      ) : (
                        selectedFile && (
                          <p>Selected file: {selectedFile.name}</p>
                        )
                      )}
                      {selectedFile && (
                        <p className=" text-center break-words max-w-full overflow-hidden">
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                      {!selectedFile && (
                        <>
                          <div className="flex gap-2 justify-center w-full">
                            <label
                              className="flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                              htmlFor="input-file-upload"
                            >
                              Browser
                            </label>
                            <input
                              className="w-[1%]"
                              style={{ fontSize: "0", opacity: "0" }}
                              type="file"
                              // accept=".jpg, .jpeg, .png"
                              name="input-file-upload"
                              id="input-file-upload"
                              onChange={handleFileChange}
                              multiple
                            />
                          </div>
                        </>
                        // <input type="file" id="input-file-upload" onChange={handleFileChange} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Question Text
                    </p>
                    <img src={required} alt="required" />
                  </div>

                  <div className=" mt-10">
                    <div className="bg-white text-black textEditor">
                      <TextEditor
                        value={questionText}
                        setValue={setQuestionText}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Default Marks</p>
                    <img src={required} alt="required" />
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="defaultMarks"
                    type="text"
                    placeholder="Eg. 2"
                  />
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg">
                      One Or Multiple Answers?
                    </p>
                    {/* <div className="text-sm font-semibold flex items-center">
                      <input
                        type="checkbox"
                        id="shuffleCheckbox"
                        name="shuffleCheckbox"
                        value="shuffleCheckbox"
                        checked={isShuffleChecked}
                        onChange={handleShuffleCheckboxChange}
                      />
                      <label className="ms-2" htmlFor="shuffleCheckbox">
                        {" "}
                        Shuffle the choices ?
                      </label>
                    </div> */}
                  </div>

                  <div className="items-center flex gap-2 mt-2 ms-6 w-[90%x] h-[50px] ps-2 text-[#535353] focus:outline-0">
                    <div className="">
                      <input
                        type="radio"
                        id="One"
                        name="oneOrMultipleAnswers"
                        value="one"
                        checked={selectedOneOrMultipleOption === "one"}
                        onChange={handleRadioOneOrMultipleChange}
                      />
                      <label htmlFor="One"> One</label>
                    </div>
                    <div className="ms-[55px]">
                      <input
                        type="radio"
                        id="Multiple"
                        name="oneOrMultipleAnswers"
                        value="multiple"
                        checked={selectedOneOrMultipleOption === "multiple"}
                        onChange={handleRadioOneOrMultipleChange}
                      />
                      <label htmlFor="Multiple"> Multiple</label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/*  <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Category</p>
                    <img src={required} alt="required" />
                  </div>

                  <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
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
                </div> */}

                <div className="">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        General Feedback
                      </p>
                    </div>

                    <div className=" mt-10">
                      <div className="bg-white text-black textEditor">
                        <TextEditor
                          value={generalFeedback}
                          setValue={setGeneralFeedback}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg ">Question Status</p>
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
                  </div> */}

                  {/* <div className="mt-[90px]  ">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-semibold text-[#000000]  py-2">
                        Number the choices?
                      </p>
                    </div>
                    <div
                      style={{
                        border: "1.085px solid #CECECE",
                        background: "#F6F7FF",
                      }}
                      className=" flex  border  rounded-lg h-[40px] w-[40%] px-2 text-[#535353] ms-5 mt-3"
                    >
                      <select
                        required
                        className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                        name="gradeAllocation"
                        id="option"
                      >
                        <option className="" value="Student">
                          A.B.C.D
                        </option>
                        <option value="Parent"></option>
                        <option value="Counselor"></option>
                        <option value="Others"></option>
                      </select>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}

          <div className=" flex items-center justify-between">
            <div
              className="select-option flex items-center gap-[40px] cursor-pointer "
              onClick={toggleDropdownCourseFormat}
            >
              <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                2
              </h1>
              <p className="text-[25px] font-bold">Answers Options</p>
              {!isOpenCourseFormat && (
                <img className="w-6" src={arrowright} alt="arrowRight" />
              )}

              {isOpenCourseFormat && <img src={arrowDown} alt="arrowDown" />}

              <i
                className={`dropdown-arrow ${isOpenCourseFormat ? "open" : ""}`}
              ></i>
            </div>

            {/*   <div className="flex justify-between items-center mb-10 mt-10">

                                <Link to='/manageQuestion' className='bg-[#3E4DAC] flex text-base font-bold  px-4 py-2 rounded-lg text-[#fff]'>

                                    <p className="">Add More Answer Blank</p>
                                </Link>

                            </div> */}
          </div>

          {isOpenCourseFormat && (
            <div>
              <div>
                {/* Render div elements based on the divCount state */}
                {options.map((answer, index) => (
                  <div
                    key={index}
                    className="dropdown-menu mt-[71px] mb-[45px] flex justify-between  bg-[#F7F7F7] p-5 rounded-lg"
                  >
                    {/* Content of the div */}
                    <div className="">
                      <div className="">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-bold text-lg">
                            Choice {index + 1}
                          </p>
                          <img src={required} alt="required" />
                        </div>
                        {/* Text editor for answerFormula */}
                        <div className="mt-10">
                          <div className="bg-white text-black textEditor">
                            {/* Pass props to the TextEditor component */}
                            <TextEditor
                              value={answer.answerFormula}
                              setValue={(value) =>
                                handleInputChange(index, value, "answerFormula")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-20 ">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-semibold text-[#000000]  py-2">
                            Answer
                          </p>
                          <img src={required} alt="required" />
                        </div>
                        <div className=" items-center flex gap-2  mt-2 ms-6  w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                          <div className="flex gap-2">
                            <input
                              type="radio"
                              id={`wrong${index}`}
                              name={`answer${index}`}
                              value="wrong"
                              checked={answer.answer === "wrong"}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  e.target.value,
                                  "answer"
                                )
                              }
                            />
                            <label htmlFor={`wrong${index}`}> Wrong</label>
                          </div>
                          <div className="flex gap-2 ms-[55px]">
                            <input
                              type="radio"
                              id={`correct${index}`}
                              name={`answer${index}`}
                              value="correct"
                              checked={answer.answer === "correct"}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  e.target.value,
                                  "answer"
                                )
                              }
                            />
                            <label htmlFor={`correct${index}`}>Correct</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-bold text-lg me-[36px]">
                            Feedback
                          </p>
                        </div>
                        {/* Text editor for feedback */}
                        <div className=" mt-10">
                          <div className="bg-white text-black textEditor">
                            {/* Pass props to the TextEditor component */}
                            <TextEditor
                              value={answer.feedback}
                              setValue={(value) =>
                                handleInputChange(index, value, "feedback")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full flex justify-center items-center my-10">
                  <button
                    onClick={addMoreDiv}
                    className="bg-[#3E4DAC] flex text-base font-bold  px-4 py-2 rounded-lg text-[#fff]"
                  >
                    <p className="">Add More Option</p>
                  </button>
                </div>
                {/* <button onClick={addMoreDiv}>Add More</button> */}
                {/* Displaying answers array for debugging purposes */}
                {/* <pre>{JSON.stringify(answers, null, 2)}</pre> */}
              </div>

              {/*   <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between me-10 bg-[#F7F7F7] p-5 rounded-lg">
                                    <div className="">

                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                                <p className="font-bold text-lg me-[36px]">
                                                    Choice 1
                                                </p>
                                                <img src={required} alt="required" />
                                            </div>

                                            <input
                                                className="mt-6 ms-6 border rounded-md  h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                name="answer1Formula"
                                                type="text"
                                                placeholder="Eg. 02283847"
                                            />
                                        </div>
                                        <div className='mt-20 '>
                                            <div className='flex items-center gap-4'>
                                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                                <p className='font-semibold text-[#000000]  py-2'>Grade Allocation</p>
                                                <img src={required} alt="required" />

                                            </div>
                                            <div
                                                style={{
                                                    border: "1.085px solid #CECECE",
                                                    background: "#F6F7FF"
                                                }}
                                                className=" flex  border  rounded-lg h-[40px] w-[40%] px-2 text-[#535353] ms-5">

                                                <select
                                                    required
                                                    className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                                                    name="gradeAllocation"
                                                    id="option"
                                                >

                                                    <option className="" value="Student">100%</option>
                                                    <option value="None">None</option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>

                                            </div>
                                            <p className="mt-2"> <span className="text-[#3E4DAC]">None</span> or Multiples of <span className="text-[#3E4DAC]"> 5-100%</span></p>
                                        </div>



                                    </div>

                                    <div className=" me-10">
                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                                <p className="font-bold text-lg me-[36px]">
                                                    Feedback
                                                </p>

                                            </div>

                                            <input
                                                className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                name="feedback"
                                                type="text"
                                                placeholder="Eg. 02283847"
                                            ></input>
                                        </div>
                                    </div>
                                </div> */}

              {/* <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between me-10 bg-[#F7F7F7] p-5 rounded-lg">
                                    <div className="">

                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                                <p className="font-bold text-lg me-[36px]">
                                                    Choice 2
                                                </p>
                                                <img src={required} alt="required" />
                                            </div>

                                            <input
                                                className="mt-6 ms-6 border rounded-md  h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                name="answer1Formula"
                                                type="text"
                                                placeholder="Eg. 02283847"
                                            />
                                        </div>
                                        <div className='mt-20 '>
                                            <div className='flex items-center gap-4'>
                                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                                <p className='font-semibold text-[#000000]  py-2'>Grade Allocation</p>
                                                <img src={required} alt="required" />

                                            </div>
                                            <div
                                                style={{
                                                    border: "1.085px solid #CECECE",
                                                    background: "#F6F7FF"
                                                }}
                                                className=" flex  border  rounded-lg h-[40px] w-[40%] px-2 text-[#535353] ms-5">

                                                <select
                                                    required
                                                    className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]"
                                                    name="gradeAllocation"
                                                    id="option"
                                                >

                                                    <option className="" value="Student">100%</option>
                                                    <option value="None">None</option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>

                                            </div>
                                            <p className="mt-2"> <span className="text-[#3E4DAC]">None</span> or Multiples of <span className="text-[#3E4DAC]"> 5-100%</span></p>
                                        </div>



                                    </div>

                                    <div className=" me-10">
                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                                <p className="font-bold text-lg me-[36px]">
                                                    Feedback
                                                </p>

                                            </div>

                                            <input
                                                className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                                name="feedback"
                                                type="text"
                                                placeholder="Eg. 02283847"
                                            ></input>
                                        </div>
                                    </div>
                                </div> */}
            </div>
          )}

          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 cursor-pointer bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
            />
            {/* <input
              type="submit"
              value="Save & Display"
              className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
            /> */}
          </div>
        </form>
      </div>
      {/* </Layout> */}
    </div>

    /*  */
  );
};

export default AddingEditingMultiChoQues;
