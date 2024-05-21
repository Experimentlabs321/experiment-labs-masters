import React, { useContext, useEffect, useState } from "react";
import DialogLayout from "../Shared/DialogLayout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
const taskTypes = [
  "Classes",
  "Assignment",
  "Reading",
  "Quiz",
  "Live Test",
  "Video",
  "Audio",
  "Files",
];

const WeekConfiguration = ({
  weeks,
  setWeeks,
  currentWeek,
  setCurrentWeek,
  batchesData,
  courseId,
  chapters,
}) => {
  const Role = localStorage.getItem("role");
  const { user, userInfo } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [addWeekOpen, setAddWeekOpen] = useState(false);
  const [editWeekOpen, setEditWeekOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [earningCategories, setEarningCategories] = useState([]);
  const [earningItemsData, setEarningItemsData] = useState([]);
  const [selectedEarningItems, setSelectedEarningItems] = useState([]);
  const [isShowSelectEarningItems, setIsShowSelectEarningItems] =
    useState(false);
  const [isShowSelectTasks, setIsShowSelectTasks] = useState(false);
  const [combinedWeightageList, setCombinedWeightageList] = useState([
    {
      tasks: [],
      earningWeightPercentage: 0,
    },
  ]);
  const [openGamificationIndex, setOpenGamificationIndex] = useState(0);
  const [
    isShowSelectTasksForGamification,
    setIsShowSelectTasksForGamification,
  ] = useState(false);
  const [gamificationData, setGamificationData] = useState([
    {
      tasks: [],
      earningItemName: "",
      value: 0,
    },
  ]);
  const [openWeightageIndex, setOpenWeightageIndex] = useState(0);
  const [isShowSelectedEarningParameter, setIsShowSelectedEarningParameter] =
    useState(false);
  const [
    selectedEarningParameterForGamification,
    setSelectedEarningParameterForGamification,
  ] = useState([]);
  let tasksNumber = {
    Classes: 0,
    Assignment: 0,
    Reading: 0,
    Quiz: 0,
    LiveTest: 0,
    Audio: 0,
    Files: 0,
  };
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = {
      organizationId: userInfo?.organizationId,
      courseId: courseId,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/itemCategoryByCourseId`,
        fetchData
      )
      .then((res) => {
        setEarningCategories(res?.data);
        let parameters = [];
        res?.data?.forEach((element) => {
          element?.earningItems?.forEach((item) => {
            parameters.push(item);
          });
        });
        setEarningItemsData(parameters);
      })
      .catch((error) => console.error(error));
  }, [courseId, userInfo]);

  useEffect(() => {
    if (currentWeek?.gamificationData) {
      let earningItems = [];
      setGamificationData(currentWeek?.gamificationData);
      currentWeek?.gamificationData.map((element) =>
        earningItems.push(element?.earningItemName)
      );
      setSelectedEarningParameterForGamification(earningItems);
    } else {
      setSelectedEarningParameterForGamification([]);
      setGamificationData([
        {
          tasks: [],
          earningItemName: "",
          value: 0,
        },
      ]);
    }
    if (currentWeek?.selectedEarningItems)
      setSelectedEarningItems(currentWeek?.selectedEarningItems);
    else setSelectedEarningItems([]);
    if (currentWeek?.combinedWeightageList)
      setCombinedWeightageList(currentWeek?.combinedWeightageList);
    else
      setCombinedWeightageList([
        {
          tasks: [],
          earningItemName: "",
          value: 0,
        },
      ]);
  }, [currentWeek]);

  useEffect(() => {
    chapters?.forEach((element) => {
      element?.tasks?.forEach((task) => {
        if (task?.taskType === "Classes") {
          tasksNumber.Classes = tasksNumber.Classes + 1;
        } else if (task?.taskType === "Assignment") {
          tasksNumber.Assignment = tasksNumber.Assignment + 1;
        } else if (task?.taskType === "Reading") {
          tasksNumber.Reading = tasksNumber.Reading + 1;
        } else if (task?.taskType === "Quiz") {
          tasksNumber.Quiz = tasksNumber.Quiz + 1;
        } else if (task?.taskType === "Live Test") {
          tasksNumber.LiveTest = tasksNumber.LiveTest + 1;
        } else if (task?.taskType === "Audio") {
          tasksNumber.Audio = tasksNumber.Audio + 1;
        } else if (task?.taskType === "Files") {
          tasksNumber.Files = tasksNumber.Files + 1;
        }
      });
    });
  }, [chapters, tasksNumber]);

  let totalGamificationValue = () => {
    let total = 0;
    gamificationData?.forEach((element) => {
      total = total + parseInt(element?.value);
    });
    return total;
  };

  const handleAddWeek = async (event) => {
    event.preventDefault();
    let schedules = [];
    batchesData?.forEach((element) => {
      const weekStartDate = "weekStartDate" + element?._id;
      const weekEndDate = "weekEndDate" + element?._id;
      schedules?.push({
        batchId: element?._id,
        batch: element?.batchName,
        weekStartDate: event?.target[weekStartDate].value,
        weekEndDate: event?.target[weekEndDate].value,
      });
    });
    const week = {
      courseId: courseId,
      weekName: event?.target?.weekName?.value,
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
      schedules: schedules,
    };

    const newWeek = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks`,
      week
    );

    if (newWeek?.data?.week?.acknowledged) {
      toast.success("Week added Successfully");
      setWeeks([...weeks, { ...week, _id: newWeek?.data?.week?.insertedId }]);
      setCurrentWeek({ ...week, _id: newWeek?.data?.week?.insertedId });
      localStorage.setItem(
        "currentWeek",
        JSON.stringify({ ...week, _id: newWeek?.data?.week?.insertedId })
      );
      setAddWeekOpen(false);
      event.target.reset();
    }

    console.log("Add chapter----->", week);
  };

  const handleEditWeekName = async (event) => {
    event.preventDefault();
    const week = { ...currentWeek };
    delete week._id;
    week.gamificationData = gamificationData;
    week.combinedWeightageList = combinedWeightageList;
    week.selectedEarningItems = selectedEarningItems;

    let totalAddedCombinedWeighted = () => {
      let total = 0;
      combinedWeightageList?.forEach((element) => {
        total = total + parseInt(element?.earningWeightPercentage);
      });
      return total || 0;
    };

    console.log(totalAddedCombinedWeighted());

    if (
      totalAddedCombinedWeighted() === 100 ||
      totalAddedCombinedWeighted() === 0
    ) {
      const newWeek = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/${currentWeek?._id}`,
        week
      );

      if (newWeek?.data?.acknowledged) {
        toast.success("Week Updated Successfully");
        // Create a copy of the chapters array to avoid mutation
        const updatedWeeksArray = [...weeks];
        // Update the chapterName of the specific chapter in the copied array
        updatedWeeksArray[
          updatedWeeksArray.findIndex((item) => item?._id === currentWeek?._id)
        ] = currentWeek;
        // Update the chapters state with the updated array
        setWeeks(updatedWeeksArray);
        setEditWeekOpen(false);
        event.target.reset();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The total of combined weightage is not 100%",
      });
    }
  };

  const handleWeekDelete = async (id) => {
    if (weeks?.length === 1) {
      setOpenConfirmationDialog(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There only one week. Delete is not possible!",
      });
      return;
    }

    await axios
      .delete(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/${id}`)
      .then((result) => {
        if (result?.data?.deletedCount > 0) {
          toast.success("Week Deleted Successfully!");
          const remainingWeeks = weeks.filter((week) => week._id !== id);
          setWeeks(remainingWeeks);
          setCurrentWeek(remainingWeeks[0]);
          localStorage.setItem(
            "currentWeek",
            JSON.stringify(remainingWeeks[0])
          );
          setOpenConfirmationDialog(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleOptionChangeItem = (event, option) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedEarningItems([
        ...selectedEarningItems,
        option?.earningItemName,
      ]);
    } else {
      setSelectedEarningItems(
        selectedEarningItems.filter((item) => item !== option?.earningItemName)
      );
    }
  };
  console.log(tasksNumber, totalGamificationValue());
  return (
    <div
      className={`relative inline-block ${
        Role === "admin" ? " mt-[10px] md:mt-[20px] md:basis-1/2" : "mt-[120px]"
      }  mb-[10px] flex items-center gap-[14px] md:gap-[32px] `}
    >
      <div className="">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer bg-[#FFDB70] text-[12px] md:text-[15px] font-sans font-[600] py-[10px] md:py-[20px] px-[15px] md:px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]"
        >
          {currentWeek?.weekName}
          <svg
            className=" ml-[14px] md:ml-[20px]"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
          >
            <g clip-path="url(#clip0_3016_13126)">
              <path
                d="M1.52352 5.08398L5.82231 9.38277L10.1211 5.08398"
                stroke="#282828"
                stroke-width="1.43293"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3016_13126">
                <rect
                  width="12.5818"
                  height="12.5818"
                  fill="white"
                  transform="matrix(0 1 -1 0 12.6328 0.890625)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
        {isOpen && weeks?.length > 1 && (
          <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
            {weeks?.map((option, index) => {
              if (option?._id !== currentWeek?._id)
                return (
                  <li
                    key={index}
                    className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                    onClick={() => {
                      setCurrentWeek(option);
                      localStorage.setItem(
                        "currentWeek",
                        JSON.stringify(option)
                      );
                      setIsOpen(false);
                    }}
                  >
                    {option?.weekName}
                  </li>
                );
            })}
          </ul>
        )}
      </div>
      {Role === "admin" && (
        <>
          {/* Add Week start */}
          <DialogLayout
            open={addWeekOpen}
            setOpen={setAddWeekOpen}
            width={900}
            borderRadius="15px"
            title={
              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                Add Week Name
              </p>
            }
          >
            <form onSubmit={handleAddWeek} className="px-[32px] py-[24px] ">
              <h1 className=" text-[18px] font-[700] mb-[24px] ">Week Name</h1>
              <input
                type="text"
                name="weekName"
                placeholder="Eg. Onboarding"
                className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
              />
              <>
                <h1 className=" text-[26px] font-[700] mt-[30px] mb-[4px] ">
                  Schedule List
                </h1>

                {batchesData?.map((batch, index) => {
                  return (
                    <div
                      key={index}
                      className="tag-container flex flex-wrap w-full px-1 bg-slate-100 rounded-lg my-2 py-3 "
                    >
                      <div className="basis-full px-2 flex items-center justify-between">
                        <h1 className=" text-[20px] font-[700]  ">
                          {batch?.batchName}
                        </h1>
                      </div>
                      <div className="basis-1/2 px-2">
                        <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                          Week Starting Date
                        </h1>
                        <input
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                          // onChange={(e) => {
                          //   let updatedWeek = currentWeek;
                          //   updatedWeek.schedules[
                          //     index
                          //   ].weekStartDate = e.target.value;
                          //   setCurrentWeek(updatedWeek);
                          // }}
                          name={`weekStartDate${batch?._id}`}
                          type="date"
                          placeholder="Eg. Entrepreneurship Lab"
                        />
                      </div>
                      <div className="basis-1/2 px-2">
                        <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                          Week Ending Date
                        </h1>
                        <input
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                          // onChange={(e) => {
                          //   let updatedWeek = currentWeek;
                          //   updatedWeek.schedules[
                          //     index
                          //   ].weekEndDate = e.target.value;
                          //   setCurrentWeek(updatedWeek);
                          // }}
                          name={`weekEndDate${batch?._id}`}
                          type="date"
                          placeholder="Eg. Entrepreneurship Lab"
                        />
                      </div>
                    </div>
                  );
                })}
              </>
              <div className="w-full flex items-center justify-center mt-[40px]">
                <input
                  type="submit"
                  value="Add"
                  className="py-[15px] cursor-pointer px-[48px] text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                />
              </div>
            </form>
          </DialogLayout>
          {/* Add Week end */}
          <button
            onClick={() => setAddWeekOpen(true)}
            className="bg-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                fill="white"
              />
            </svg>
          </button>
          {/* Edit week name start */}
          <DialogLayoutForFromControl
            open={editWeekOpen}
            setOpen={setEditWeekOpen}
            width={900}
            borderRadius="15px"
            title={
              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                Edit Week
              </p>
            }
          >
            <form
              onSubmit={handleEditWeekName}
              className="px-[32px] py-[24px] w-full "
            >
              <div>
                <h1 className=" text-[18px] font-[700] mb-[20px] ">
                  Week Name
                </h1>
                <input
                  type="text"
                  name="weekName"
                  defaultValue={currentWeek?.weekName}
                  onChange={(e) => {
                    currentWeek.weekName = e.target.value;
                  }}
                  placeholder="Eg. Onboarding"
                  className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                />
              </div>
              <div>
                <div className="flex items-center justify-between mt-[30px]">
                  <h1 className=" text-[26px] font-[700] mb-[4px] ">
                    Task Weightage Distribution
                  </h1>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <p>Apply to all weeks</p>
                  </div>
                </div>
                <p>
                  Select Earning Parameters (Any other parameter not selected
                  will be counted over and above)
                </p>
                <div className="mt-4 flex items-start gap-4">
                  <div
                    onMouseLeave={() => setIsShowSelectEarningItems(false)}
                    onMouseEnter={() => setIsShowSelectEarningItems(true)}
                    className="w-full"
                  >
                    <div
                      onClick={() =>
                        setIsShowSelectEarningItems(!isShowSelectEarningItems)
                      }
                      className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] cursor-pointer "
                    >
                      {selectedEarningItems?.length > 0 ? (
                        <p>
                          {selectedEarningItems?.map((item) => {
                            return item + ", ";
                          })}
                        </p>
                      ) : (
                        <p>No item selected</p>
                      )}
                    </div>
                    {isShowSelectEarningItems &&
                      earningItemsData?.length > 0 && (
                        <ul className="w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
                          {earningItemsData?.map((option, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                                  style={{
                                    boxShadow: "0px 2px 0px 0px #E6E6E6",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id="student"
                                    name={option?.earningItemName}
                                    value={option?.earningItemName}
                                    checked={selectedEarningItems.find(
                                      (item) => item === option?.earningItemName
                                    )}
                                    onChange={(e) =>
                                      handleOptionChangeItem(e, option)
                                    }
                                    className=" mb-1"
                                  />
                                  <div className="flex mb-1 items-center">
                                    <label
                                      className="ms-4"
                                      htmlFor={option?.earningItemName}
                                    >
                                      {option?.earningItemName}
                                    </label>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      )}
                  </div>
                  <input
                    type="text"
                    value="100%"
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                  />
                </div>
                <div className="mt-4">
                  <div className=" flex items-center gap-4">
                    <h1 className="basis-1/2 text-lg font-bold">
                      Type of Task
                    </h1>
                    <h1 className="basis-1/2 text-lg font-bold">
                      Combined Weightage(%)
                    </h1>
                  </div>
                  {combinedWeightageList?.map((singleWight, index) => (
                    <div key={index} className=" flex items-start gap-4 mt-2">
                      <div
                        onMouseLeave={() => setIsShowSelectTasks(false)}
                        onMouseEnter={() => {
                          setIsShowSelectTasks(true);
                          setOpenWeightageIndex(index);
                        }}
                        className="w-full basis-1/2"
                      >
                        <div
                          onClick={() => {
                            setIsShowSelectTasks(!isShowSelectTasks);
                            setOpenWeightageIndex(index);
                          }}
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] cursor-pointer "
                        >
                          {singleWight?.tasks?.length > 0 ? (
                            <p>
                              {singleWight?.tasks?.map((item) => {
                                return item + ", ";
                              })}
                            </p>
                          ) : (
                            <p>No task selected</p>
                          )}
                        </div>
                        {isShowSelectTasks &&
                          index === openWeightageIndex &&
                          taskTypes?.length > 0 && (
                            <ul className="w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
                              {taskTypes?.map((option, index) => {
                                return (
                                  <>
                                    <li
                                      key={index}
                                      className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                                      style={{
                                        boxShadow: "0px 2px 0px 0px #E6E6E6",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id="student"
                                        name={option}
                                        value={option}
                                        checked={singleWight?.tasks?.find(
                                          (item) => item === option
                                        )}
                                        onChange={(e) => {
                                          const optionValue = e.target.value;
                                          const isChecked = e.target.checked;

                                          if (isChecked) {
                                            singleWight.tasks = [
                                              ...singleWight?.tasks,
                                              option,
                                            ];
                                            setValue(value + 1);
                                          } else {
                                            singleWight.tasks = [
                                              ...singleWight?.tasks.filter(
                                                (item) => item !== option
                                              ),
                                            ];
                                            setValue(value + 1);
                                          }
                                        }}
                                        className=" mb-1"
                                      />
                                      <div className="flex mb-1 items-center">
                                        <label
                                          className="ms-4"
                                          htmlFor={option}
                                        >
                                          {option}
                                        </label>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          )}
                      </div>
                      <div className="basis-1/2 flex items-center">
                        <input
                          type="text"
                          value={singleWight?.earningWeightPercentage}
                          onChange={(e) => {
                            singleWight.earningWeightPercentage =
                              e.target.value;
                            setValue(value + 1);
                          }}
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setCombinedWeightageList([
                              ...combinedWeightageList,
                              {
                                tasks: [],
                                earningWeightPercentage: 0,
                              },
                            ]);
                          }}
                          className="px-2 py-2 ml-2 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-full text-3xl "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <path
                              d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mt-[30px]">
                    <h1 className=" text-[26px] font-[700] mb-[4px] ">
                      Gamification Setting
                    </h1>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <p>Apply to all weeks</p>
                    </div>
                  </div>
                  <div className=" flex items-center gap-4">
                    <h1 className="basis-1/2 text-lg font-bold">
                      Type of Task
                    </h1>
                    <h1 className="basis-1/2 text-lg font-bold">
                      Earning Parameter
                    </h1>
                    <h1 className="basis-1/2 text-lg font-bold">
                      Total value for the week
                    </h1>
                  </div>
                  {gamificationData?.map((singleGamification, index) => (
                    <div key={index} className=" flex items-start gap-4 mt-2">
                      <div
                        onMouseLeave={() =>
                          setIsShowSelectTasksForGamification(false)
                        }
                        onMouseEnter={() => {
                          setIsShowSelectTasksForGamification(true);
                          setOpenGamificationIndex(index);
                        }}
                        className="w-full basis-1/2"
                      >
                        <div
                          onClick={() => {
                            setIsShowSelectTasksForGamification(
                              !isShowSelectTasksForGamification
                            );
                            setOpenGamificationIndex(index);
                          }}
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] cursor-pointer "
                        >
                          {singleGamification?.tasks?.length > 0 ? (
                            <p>
                              {singleGamification?.tasks?.map((item) => {
                                return item + ", ";
                              })}
                            </p>
                          ) : (
                            <p>No task selected</p>
                          )}
                        </div>
                        {isShowSelectTasksForGamification &&
                          index === openGamificationIndex &&
                          taskTypes?.length > 0 && (
                            <ul className="w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
                              {taskTypes?.map((option, index) => {
                                return (
                                  <>
                                    <li
                                      key={index}
                                      className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                                      style={{
                                        boxShadow: "0px 2px 0px 0px #E6E6E6",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id="student"
                                        name={option}
                                        value={option}
                                        checked={singleGamification?.tasks?.find(
                                          (item) => item === option
                                        )}
                                        onChange={(e) => {
                                          const optionValue = e.target.value;
                                          const isChecked = e.target.checked;

                                          if (isChecked) {
                                            singleGamification.tasks = [
                                              ...singleGamification?.tasks,
                                              option,
                                            ];
                                            setValue(value + 1);
                                          } else {
                                            singleGamification.tasks =
                                              singleGamification?.tasks.filter(
                                                (item) => item !== option
                                              );
                                            setValue(value + 1);
                                          }
                                        }}
                                        className=" mb-1"
                                      />
                                      <div className="flex mb-1 items-center">
                                        <label
                                          className="ms-4"
                                          htmlFor={option}
                                        >
                                          {option}
                                        </label>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          )}
                      </div>
                      <div
                        onMouseLeave={() =>
                          setIsShowSelectedEarningParameter(false)
                        }
                        onMouseEnter={() => {
                          setIsShowSelectedEarningParameter(true);
                          setOpenGamificationIndex(index);
                        }}
                        className="w-full basis-1/2"
                      >
                        <div
                          onClick={() => {
                            setIsShowSelectedEarningParameter(
                              !isShowSelectedEarningParameter
                            );
                            setOpenGamificationIndex(index);
                          }}
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] cursor-pointer "
                        >
                          {singleGamification?.earningItemName ? (
                            <p>{singleGamification?.earningItemName}</p>
                          ) : (
                            <p>No parameter selected</p>
                          )}
                        </div>
                        {isShowSelectedEarningParameter &&
                          index === openGamificationIndex &&
                          selectedEarningItems?.length > 0 && (
                            <ul className="w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
                              {selectedEarningItems?.map((option, index) => {
                                if (
                                  !selectedEarningParameterForGamification?.find(
                                    (item) => item === option
                                  )
                                )
                                  return (
                                    <>
                                      <li
                                        key={index}
                                        className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                                        style={{
                                          boxShadow: "0px 2px 0px 0px #E6E6E6",
                                        }}
                                      >
                                        <input
                                          type="checkbox"
                                          id="student"
                                          name={option}
                                          value={option}
                                          checked={
                                            singleGamification?.earningItemName ===
                                            option
                                          }
                                          onChange={async (e) => {
                                            const isChecked = e.target.checked;
                                            if (isChecked) {
                                              const oldItem =
                                                singleGamification?.earningItemName;
                                              const newItem = option;
                                              if (
                                                singleGamification?.earningItemName
                                              ) {
                                                await setSelectedEarningParameterForGamification(
                                                  [
                                                    ...selectedEarningParameterForGamification.filter(
                                                      (item) => item !== oldItem
                                                    ),
                                                    newItem,
                                                  ]
                                                );
                                                setValue(value + 1);
                                              } else {
                                                selectedEarningParameterForGamification.push(
                                                  option
                                                );
                                              }
                                              singleGamification.earningItemName =
                                                option;
                                            } else {
                                              setValue(value + 1);
                                              singleGamification.earningItemName =
                                                "";
                                              setSelectedEarningParameterForGamification(
                                                selectedEarningParameterForGamification.filter(
                                                  (item) => item !== option
                                                )
                                              );
                                            }
                                            setValue(value + 1);
                                          }}
                                          className=" mb-1"
                                        />
                                        <div className="flex mb-1 items-center">
                                          <label
                                            className="ms-4"
                                            htmlFor={option}
                                          >
                                            {option}
                                          </label>
                                        </div>
                                      </li>
                                    </>
                                  );
                              })}
                            </ul>
                          )}
                      </div>
                      <div className="basis-1/2 flex items-center">
                        <input
                          type="number"
                          value={singleGamification?.value}
                          onChange={(e) => {
                            singleGamification.value = e.target.value;
                            setValue(value + 1);
                          }}
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setGamificationData([
                              ...gamificationData,
                              {
                                tasks: [],
                                earningItemName: "",
                                value: 0,
                              },
                            ]);
                          }}
                          className="px-2 py-2 ml-2 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-full text-3xl "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <path
                              d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* <div className=" flex items-center gap-4 mt-2">
                    <input
                      type="text"
                      value="Assignment"
                      className="bg-[#F6F7FF] basis-1/2 border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <input
                      type="text"
                      value="Creativity"
                      className="bg-[#F6F7FF] basis-1/2 border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <div className="basis-1/2 flex items-center">
                      <input
                        type="text"
                        value="10"
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                      />
                      <button className="px-2 py-2 ml-2 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-full text-3xl ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className=" flex items-center gap-4 mt-2">
                    <input
                      type="text"
                      value="Assignment"
                      className="bg-[#F6F7FF] basis-1/2 border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <input
                      type="text"
                      value="Delight"
                      className="bg-[#F6F7FF] basis-1/2 border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <div className="basis-1/2 flex items-center">
                      <input
                        type="text"
                        value="0"
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                      />
                      <button className="px-2 py-2 ml-2 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-full text-3xl ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
              <>
                <h1 className=" text-[26px] font-[700] mt-[30px] mb-[4px] ">
                  Schedule List
                </h1>

                {currentWeek?.schedules?.map((singleSchedule, index) => {
                  return (
                    <div
                      key={index}
                      className="tag-container flex flex-wrap w-full px-1 bg-slate-100 rounded-lg my-2 py-3 "
                    >
                      <div className="basis-full px-2 flex items-center justify-between">
                        <h1 className=" text-[20px] font-[700]  ">
                          {singleSchedule?.batch}
                        </h1>
                      </div>
                      <div className="basis-1/2 px-2">
                        <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                          Week Starting Date
                        </h1>
                        <input
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                          defaultValue={singleSchedule?.weekStartDate}
                          onChange={(e) => {
                            let updatedWeek = currentWeek;
                            updatedWeek.schedules[index].weekStartDate =
                              e.target.value;
                            setCurrentWeek(updatedWeek);
                            localStorage.setItem(
                              "currentWeek",
                              JSON.stringify(updatedWeek)
                            );
                          }}
                          name={`weekStartDate${index}`}
                          type="date"
                          placeholder="Eg. Entrepreneurship Lab"
                        />
                      </div>
                      <div className="basis-1/2 px-2">
                        <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                          Week Ending Date
                        </h1>
                        <input
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                          defaultValue={singleSchedule?.weekEndDate}
                          onChange={(e) => {
                            let updatedWeek = currentWeek;
                            updatedWeek.schedules[index].weekEndDate =
                              e.target.value;
                            setCurrentWeek(updatedWeek);
                            localStorage.setItem(
                              "currentWeek",
                              JSON.stringify(updatedWeek)
                            );
                          }}
                          name={`weekEndDate${index}`}
                          type="date"
                          placeholder="Eg. Entrepreneurship Lab"
                        />
                      </div>
                    </div>
                  );
                })}
              </>
              <div className="w-full flex items-center justify-center mt-[40px]">
                <input
                  type="submit"
                  value="Update"
                  className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                />
              </div>
            </form>
          </DialogLayoutForFromControl>
          {/* Edit week name end */}
          <button onClick={() => setEditWeekOpen(true)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <circle cx="14.6641" cy="14.2275" r="14" fill="#172D6E" />
              <path
                d="M18.8571 6.82129L21.6209 9.58506L19.514 11.6929L16.7502 8.92912L18.8571 6.82129ZM8.73438 19.7078H11.4981L18.2113 12.9946L15.4476 10.2309L8.73438 16.9441V19.7078Z"
                fill="white"
              />
            </svg>
          </button>
          {/* Dialog for confirmation start */}
          <DialogLayout
            open={openConfirmationDialog}
            width={500}
            bgColor="#3E4DAC"
            borderRadius={10}
            close={true}
          >
            <div className=" py-[56px] px-[40px] ">
              <h1 className=" text-[#F0E823] text-[28px] font-[700] w-[332px] mx-auto text-center ">
                Are you sure you want to delete the week?
              </h1>
              <div className="mt-[64px] flex items-center justify-between ">
                <button
                  onClick={() => handleWeekDelete(currentWeek?._id)}
                  className=" py-[16px] px-[64px] rounded-[20px] border-[3px] text-[21px] font-[600] border-[#FFF] text-white  "
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmationDialog(false);
                  }}
                  className=" py-[16px] px-[64px] rounded-[20px] border-[3px] text-[21px] font-[600] border-[#FF557A] bg-[#FF557A]  "
                >
                  No
                </button>
              </div>
            </div>
          </DialogLayout>
          {/* Dialog for confirmation end */}
          <button
            onClick={() => setOpenConfirmationDialog(true)}
            className=" bg-sky-950 p-[6px] rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M6 7.83105H5V20.8311C5 21.3615 5.21071 21.8702 5.58579 22.2453C5.96086 22.6203 6.46957 22.8311 7 22.8311H17C17.5304 22.8311 18.0391 22.6203 18.4142 22.2453C18.7893 21.8702 19 21.3615 19 20.8311V7.83105H6ZM16.618 4.83105L15 2.83105H9L7.382 4.83105H3V6.83105H21V4.83105H16.618Z"
                fill="#ED1010"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default WeekConfiguration;
