import React, { useContext, useEffect, useState } from "react";
import DialogLayout from "../Shared/DialogLayout";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import { toast } from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const BatchConfiguration = ({
  selectedBatches,
  setSelectedBatches,
  batchesData,
  setBatchesData,
  count,
  setCount,
}) => {
  const Role = localStorage.getItem("role");
  const rootUrl = window.location.origin;
  const [isOpenBatches, setIsOpenBatches] = useState(false);
  const [addBatchOpen, setAddBatchOpen] = useState(false);
  const [participant, setParticipant] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [showEditBatchDialog, setShowEditBatchDialog] = useState(false);

  const { id } = useParams();
  const { user, userInfo, createUser } = useContext(AuthContext);

  const handleOptionChangeBatch = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBatches([...selectedBatches, { batchName: optionValue }]);
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchName !== optionValue)
      );
    }
  };

  const handleAddBatch = async (event) => {
    event.preventDefault();
    Loading();
    const sendData = {
      user: {
        participants: participantsData,
      },
      batch: {
        courseId: id,
        batchName: event?.target?.batchName?.value,
        batchStartDate: event?.target?.batchStartDate?.value,
        batchEndDate: event?.target?.batchEndDate?.value,
        creator: {
          name: userInfo?.name,
          email: userInfo?.email,
          photoURL: userInfo?.photoURL,
        },
        organization: {
          organizationId: userInfo?.organizationId,
          organizationName: userInfo?.organizationName,
        },
        price: event?.target?.price?.value,
        // participants: participants,
      },
    };

    console.log(sendData);

    const newBatch = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/batches`,
      sendData
    );

    console.log(newBatch);

    // sendData?.user?.participants?.forEach((element) => {
    //   createUser(element?.email, element?.password);
    // });

    if (newBatch?.status === 200) {
      toast.success("Batch Added Successfully");
      batchesData?.push(sendData?.batch);
      setAddBatchOpen(false);
      event.target.reset();
    }
    Loading().close();
    // console.log("Add chapter----->", week);
  };

  const handleEditBatch = async (event) => {
    event.preventDefault();
    const sendData = {
      courseId: id,
      batchName: event?.target?.batchName?.value,
      batchStartDate: event?.target?.batchStartDate?.value,
      batchEndDate: event?.target?.batchEndDate?.value,
      creator: {
        name: userInfo?.name,
        email: userInfo?.email,
        photoURL: userInfo?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
      price: event?.target?.price?.value,
      // participants: participants,
    };

    console.log(sendData);

    try {
      const editBatch = await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/v1/batches/updateBatch/batchId/${selectedBatches[0]?._id}`,
        sendData
      );

      console.log(editBatch); // Log the response data

      if (editBatch?.status === 200) {
        toast.success("Batch Updated Successfully");
        // batchesData?.push(sendData?.batch);
        setShowEditBatchDialog(false);
        event.target.reset();
      } else {
        toast.error("Failed to update batch");
      }
    } catch (error) {
      console.error("Error updating batch:", error);
      toast.error("An error occurred while updating the batch");
    }
  };

  const handleBatchDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Loading();
        try {
          const deleteBatch = await axios.delete(
            `${process.env.REACT_APP_SERVER_API}/api/v1/batches/deleteBatch/batchId/${selectedBatches[0]?._id}`
          );

          console.log(deleteBatch);

          // sendData?.user?.participants?.forEach((element) => {
          //   createUser(element?.email, element?.password);
          // });

          if (deleteBatch?.status === 200) {
            setSelectedBatches(
              selectedBatches?.filter(
                (item) => item?._id !== selectedBatches[0]?._id
              )
            );
            setBatchesData(
              batchesData?.filter(
                (item) => item?._id !== selectedBatches[0]?._id
              )
            );
            setCount(count + 1);
            Loading().close();
            Swal.fire({
              title: "Deleted!",
              text: "Your batch has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something wrong happened!",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error?.message}`,
          });
          console.log(error?.message);
        }
      }
    });
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.length > 0) {
        if (
          e.target.value === "" ||
          participants.indexOf(e.target.value) !== -1
        ) {
          e.target.value = "";
          return;
        }
        setParticipants([...participants, e.target.value]);
        e.target.value = "";
      }
    }
    if (e.key === ",") {
      if (e.target.value.length > 0) {
        if (
          e.target.value === "" ||
          participants.indexOf(
            e.target.value.substring(0, e.target.value.length - 1)
          ) !== -1 ||
          e.target.value === ","
        ) {
          e.target.value = "";
          return;
        }
        setParticipants([
          ...participants,
          e.target.value.substring(0, e.target.value.length - 1),
        ]);
        e.target.value = "";
      }
    }
  };
  const removeParticipant = (participant) => {
    const newParameters = participants.filter(
      (tag) => tag?.email !== participant?.email
    );
    setParticipants(newParameters);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`relative inline-block ${
        Role === "admin" ? "mt-[40px]" : "mt-[140px]"
      } basis-1/2 mb-[10px] flex items-center gap-[32px] `}
    >
      <div>
        <button
          onClick={() => {
            setIsOpenBatches(!isOpenBatches);
          }}
          className="cursor-pointer bg-[#FFDB70] text-[15px] font-[600] py-[20px] px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]"
        >
          {selectedBatches[0] ? (
            selectedBatches?.map((batch) => (
              <span className="mr-1" key={batch?.key}>
                {batch?.batchName},
              </span>
            ))
          ) : (
            <span>Select Batch</span>
          )}

          <svg
            className="ml-[20px]"
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
        {isOpenBatches && batchesData?.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
            {batchesData?.map((option, index) => {
              return (
                <>
                  <li
                    className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                    style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                  >
                    <input
                      type="checkbox"
                      id="student"
                      name={option?.batchName}
                      value={option?.batchName}
                      checked={selectedBatches.find(
                        (item) => item?.batchName === option?.batchName
                      )}
                      onChange={(e) => {
                        const isChecked = e.target.checked;

                        // Toggle the selection based on whether the batch is already in selectedBatches
                        setSelectedBatches((prevSelectedBatches) => {
                          if (isChecked) {
                            // Add the batch if it's not in the array
                            return [...prevSelectedBatches, option];
                          } else {
                            // Remove the batch if it's in the array
                            return prevSelectedBatches.filter(
                              (item) => item?.batchName !== option?.batchName
                            );
                          }
                        });
                      }}
                      className=" mb-1"
                    />
                    <div className="flex mb-1 items-center">
                      <label className="ms-4" htmlFor={option?.batchName}>
                        {option?.batchName}
                      </label>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
      {Role === "admin" && (
        <>
          {/* Add batch start */}
          <DialogLayoutForFromControl
            title={
              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                Add New Batch
              </p>
            }
            width={900}
            setOpen={setAddBatchOpen}
            open={addBatchOpen}
          >
            <form onSubmit={handleAddBatch} className="px-[8px] py-[16px] ">
              <div className="flex items-center flex-wrap ">
                <div className=" basis-full px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Name
                  </h1>
                  <input
                    required
                    type="text"
                    defaultValue={`Batch ${batchesData.length + 1}`}
                    name="batchName"
                    placeholder="Eg. Onboarding"
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                  />
                </div>
                <div className="basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Starting Date
                  </h1>
                  <input
                    required
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    name="batchStartDate"
                    type="date"
                    placeholder="Eg. Entrepreneurship Lab"
                    min={getCurrentDate()}
                  />
                </div>
                <div className="basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Ending Date
                  </h1>
                  <input
                    required
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    name="batchEndDate"
                    type="date"
                    placeholder="Eg. Entrepreneurship Lab"
                    min={getCurrentDate()}
                  />
                </div>
                <div className=" basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Price
                  </h1>
                  <input
                    required
                    type="number"
                    name="price"
                    placeholder="Eg. 5000"
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                  />
                </div>
                {/* {!participants[0] && (
                  <button
                    onClick={() => {
                      setParticipants([
                        ...participants,
                        { email: "", name: "" },
                      ]);
                      setParticipantsData([
                        ...participantsData,
                        {
                          email: "",
                          name: "",
                          phone: "",
                          password: "",
                          organizationId: userInfo?.organizationId,
                          organizationName: userInfo?.organizationName,
                          role: "user",
                        },
                      ]);
                    }}
                    className="flex items-center gap-2 mx-2 mt-[24px] bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-[15px] px-[18px]"
                  >
                    Add Participant
                    <span className="bg-black rounded-full">
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
                    </span>
                  </button>
                )}
                {participants.length > 0 && (
                  <>
                    <h1 className=" text-[26px] px-2 font-[700] mt-[30px] mb-[4px] ">
                      Participants List
                    </h1>

                    {participants?.map((participant, index) => {
                      return (
                        <div
                          key={index}
                          className="tag-container flex flex-wrap w-full px-1 bg-slate-100 mx-2 rounded-lg my-2 py-3 "
                        >
                          <div className="basis-full px-2 flex items-center justify-between">
                            <h1 className=" text-[20px] font-[700]  ">
                              Participant {index + 1}
                            </h1>
                            <button
                              onClick={() => removeParticipant(participant)}
                            >
                              <span className="cursor-pointer pl-1 text-3xl font-bold">
                                ×
                              </span>
                            </button>
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Email
                            </h1>
                            <input
                              type="email"
                              required
                              defaultValue={participant?.email}
                              onChange={(e) => {
                                participants[index].email = e.target.value;
                                participantsData[index].email = e.target.value;
                              }}
                              name="email"
                              placeholder="Email"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Name
                            </h1>
                            <input
                              type="text"
                              required
                              defaultValue={participant?.name}
                              onChange={(e) => {
                                participants[index].name = e.target.value;
                                participantsData[index].name = e.target.value;
                              }}
                              name="name"
                              placeholder="Name"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Password
                            </h1>
                            <input
                              type="password"
                              required
                              defaultValue={participant?.password}
                              onChange={(e) => {
                                participantsData[index].password =
                                  e.target.value;
                              }}
                              name="password"
                              placeholder="Password"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Phone
                            </h1>
                            <input
                              type="text"
                              required
                              defaultValue={participant?.phone}
                              onChange={(e) => {
                                participantsData[index].phone = e.target.value;
                              }}
                              name="phone"
                              placeholder="Phone"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                {participants[0] && (
                  <button
                    onClick={() => {
                      setParticipants([
                        ...participants,
                        { email: "", name: "" },
                      ]);
                      setParticipantsData([
                        ...participantsData,
                        {
                          email: "",
                          name: "",
                          phone: "",
                          password: "",
                          organizationId: userInfo?.organizationId,
                          organizationName: userInfo?.organizationName,
                          role: "user",
                        },
                      ]);
                    }}
                    className="flex items-center gap-2 mx-2 mt-[24px] bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-[15px] px-[18px]"
                  >
                    Add Participant
                    <span className="bg-black rounded-full">
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
                    </span>
                  </button>
                )} */}
              </div>
              <div className="w-full flex items-center justify-center mt-[40px]">
                <input
                  type="submit"
                  value="Add"
                  className="py-[15px] cursor-pointer px-[48px] text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                />
              </div>
            </form>
          </DialogLayoutForFromControl>
          {/* Add batch end */}
          <button
            onClick={() => setAddBatchOpen(true)}
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
          {/* Edit batch start */}
          <DialogLayoutForFromControl
            title={
              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                Edit Batch
              </p>
            }
            width={900}
            setOpen={setShowEditBatchDialog}
            open={showEditBatchDialog}
          >
            <form onSubmit={handleEditBatch} className="px-[8px] py-[16px] ">
              <div className="flex items-center flex-wrap ">
                <div className=" basis-full px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Name
                  </h1>
                  <input
                    required
                    type="text"
                    defaultValue={selectedBatches[0]?.batchName}
                    name="batchName"
                    placeholder="Eg. Onboarding"
                    className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                  />
                </div>
                <div className="basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Starting Date
                  </h1>
                  <input
                    required
                    className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    name="batchStartDate"
                    defaultValue={selectedBatches[0]?.batchStartDate}
                    // min={getCurrentDate()}
                    type="date"
                  />
                </div>
                <div className="basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Ending Date
                  </h1>
                  <input
                    required
                    className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    name="batchEndDate"
                    defaultValue={selectedBatches[0]?.batchEndDate}
                    type="date"
                    // min={getCurrentDate()}
                  />
                </div>
                <div className=" basis-1/2 px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Price
                  </h1>
                  <input
                    required
                    type="number"
                    name="price"
                    defaultValue={selectedBatches[0]?.price}
                    placeholder="Eg. 5000"
                    className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] py-[15px] px-[18px] w-full rounded-[6px] "
                  />
                </div>
                <div className=" px-2">
                  <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                    Batch Price
                  </h1>
                  <div className="flex">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/payment/${id}?batch=${selectedBatches[0]?._id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                      className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] py-[15px] px-[18px] rounded-l-md w-fit "
                    >{`${rootUrl}/payment/${id}?batch=${selectedBatches[0]?._id}`}</button>
                    <button
                      className="bg-[#F6F7FF] font-sans border-[1px] border-[#CECECE] py-[15px] px-[18px] rounded-r-md w-fit "
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/payment/${id}?batch=${selectedBatches[0]?._id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                    >
                      <FileCopyIcon />
                    </button>
                  </div>
                </div>
                <>
                  {/* {!participants[0] && (
                  <button
                    onClick={() => {
                      setParticipants([
                        ...participants,
                        { email: "", name: "" },
                      ]);
                      setParticipantsData([
                        ...participantsData,
                        {
                          email: "",
                          name: "",
                          phone: "",
                          password: "",
                          organizationId: userInfo?.organizationId,
                          organizationName: userInfo?.organizationName,
                          role: "user",
                        },
                      ]);
                    }}
                    className="flex items-center gap-2 mx-2 mt-[24px] bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-[15px] px-[18px]"
                  >
                    Add Participant
                    <span className="bg-black rounded-full">
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
                    </span>
                  </button>
                )}
                {participants.length > 0 && (
                  <>
                    <h1 className=" text-[26px] px-2 font-[700] mt-[30px] mb-[4px] ">
                      Participants List
                    </h1>

                    {participants?.map((participant, index) => {
                      return (
                        <div
                          key={index}
                          className="tag-container flex flex-wrap w-full px-1 bg-slate-100 mx-2 rounded-lg my-2 py-3 "
                        >
                          <div className="basis-full px-2 flex items-center justify-between">
                            <h1 className=" text-[20px] font-[700]  ">
                              Participant {index + 1}
                            </h1>
                            <button
                              onClick={() => removeParticipant(participant)}
                            >
                              <span className="cursor-pointer pl-1 text-3xl font-bold">
                                ×
                              </span>
                            </button>
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Email
                            </h1>
                            <input
                              type="email"
                              required
                              defaultValue={participant?.email}
                              onChange={(e) => {
                                participants[index].email = e.target.value;
                                participantsData[index].email = e.target.value;
                              }}
                              name="email"
                              placeholder="Email"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Name
                            </h1>
                            <input
                              type="text"
                              required
                              defaultValue={participant?.name}
                              onChange={(e) => {
                                participants[index].name = e.target.value;
                                participantsData[index].name = e.target.value;
                              }}
                              name="name"
                              placeholder="Name"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Password
                            </h1>
                            <input
                              type="password"
                              required
                              defaultValue={participant?.password}
                              onChange={(e) => {
                                participantsData[index].password =
                                  e.target.value;
                              }}
                              name="password"
                              placeholder="Password"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                          <div className="basis-1/2 px-2">
                            <h1 className=" text-[18px] font-[700] mt-[16px] mb-[8px] ">
                              Phone
                            </h1>
                            <input
                              type="text"
                              required
                              defaultValue={participant?.phone}
                              onChange={(e) => {
                                participantsData[index].phone = e.target.value;
                              }}
                              name="phone"
                              placeholder="Phone"
                              className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                {participants[0] && (
                  <button
                    onClick={() => {
                      setParticipants([
                        ...participants,
                        { email: "", name: "" },
                      ]);
                      setParticipantsData([
                        ...participantsData,
                        {
                          email: "",
                          name: "",
                          phone: "",
                          password: "",
                          organizationId: userInfo?.organizationId,
                          organizationName: userInfo?.organizationName,
                          role: "user",
                        },
                      ]);
                    }}
                    className="flex items-center gap-2 mx-2 mt-[24px] bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-[15px] px-[18px]"
                  >
                    Add Participant
                    <span className="bg-black rounded-full">
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
                    </span>
                  </button>
                )} */}
                </>
              </div>
              <div className="w-full flex items-center justify-center mt-[40px]">
                <input
                  type="submit"
                  value="Add"
                  className="py-[15px] cursor-pointer px-[48px] text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                />
              </div>
            </form>
          </DialogLayoutForFromControl>
          {/* Edit batch end */}
          <button onClick={() => setShowEditBatchDialog(true)} className="">
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
          <button
            onClick={() => handleBatchDelete()}
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

export default BatchConfiguration;
