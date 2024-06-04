import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import filter from "../../../assets/ExecutionMentor/filter.svg";
import active from "../../../assets/ExecutionMentor/active.svg";
import clock from "../../../assets/ExecutionMentor/clock.svg";
import list from "../../../assets/ExecutionMentor/list.svg";
import UpComingClasses from "./UpComingClasses";
import DoubtClearingClasses from "./DoubtClearingClasses";
import ExecutionMentorCreateClass from "./ExecutionMentorCreateClass";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import StudentList from "./StudentList";

const PastClasses = () => {
  const { userInfo } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("doubtClearingClasses");
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState();
  const [classes, setClasses] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [participants, setParticipants] = useState();
  const [loading, setLoading] = useState(false);
  const [classId, setClassId] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///
  useEffect(() => {
    if (userInfo?.email) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/classes/classesByMentorEmail/${userInfo?.email}`
        )
        .then((response) => {
          setClasses(response?.data.reverse());
          setLoading(false);
        })
        .catch((error) => console.error(error));
      setLoading(false);
    }
  }, [userInfo?.email]);

  const reloadClassData = () => {
    if (userInfo?.email) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/classes/classesByMentorEmail/${userInfo?.email}`
        )
        .then((response) => {
          setClasses(response?.data.reverse());
          setLoading(false);
        })
        .catch((error) => console.error(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
        )
        .then((response) => {
          setAllUsers(response?.data);
        })
        .catch((error) => console.error(error));
    }
  }, [userInfo?.organizationId]);

  // Get current date and time
  const currentDate = new Date();

  // Filter classes with past dates
  const filteredClasses = classes?.filter((cls) => {
    const classDate = new Date(cls.courseStartingDateTime);
    return classDate < currentDate;
  });

  const listView = (id, participants, classId) => {
    setStudentListOpen(true);
    setSelectedBatchId(id);
    setParticipants(participants);
    setClassId(classId);

    //  console.log(id)
  };
// console.log(filteredClasses)
  return (
    <div>
      <Layout>
        <div className=" lg:block hidden">
          <AssignmentUpNev
            setAddTaskOpen={setAddTaskOpen}
            page={"liveClasses"}
          />
        </div>
        <div>
          <ExecutionMentorCreateClass
            addTaskOpen={addTaskOpen}
            setAddTaskOpen={setAddTaskOpen}
          />
        </div>
        <div>
          <StudentList
            studentListOpen={studentListOpen}
            setStudentListOpen={setStudentListOpen}
            selectedBatchId={selectedBatchId}
            participants={participants}
            classId={classId}
            reloadClassData={reloadClassData}
          />
        </div>
        <div className="flex mt-24 lg:mx-10">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="px-10 flex gap-10 pb-3 text-lg mt-10  ">
                <Link
                  onClick={() => handleTabClick("doubtClearingClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "doubtClearingClasses"
                        ? "bold"
                        : "normal",
                    borderBottom:
                      selectedTab === "doubtClearingClasses"
                        ? "2px solid black"
                        : "none",
                    color:
                      selectedTab === "doubtClearingClasses"
                        ? "black"
                        : "#BEBEBE",
                  }}
                >
                  Doubt Clearing Classes
                </Link>

                <Link
                  onClick={() => handleTabClick("upcomingClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "upcomingClasses" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "upcomingClasses"
                        ? "2px solid black"
                        : "none",
                    color:
                      selectedTab === "upcomingClasses" ? "black" : "#BEBEBE",
                  }}
                >
                  Upcoming classes
                </Link>

                <Link
                  onClick={() => handleTabClick("pastClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "pastClasses" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "pastClasses"
                        ? "2px solid black"
                        : "none",
                    color: selectedTab === "pastClasses" ? "black" : "#BEBEBE",
                  }}
                >
                  Past Classes
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-2 text-lg font-medium bg-[#EFEFEF] rounded-lg px-4 py-2 ">
                <img src={filter} alt="filter" />
                <p>filter</p>
              </div>
            </div>

            {selectedTab === "pastClasses" &&
              (loading ? (
                <p className=" flex justify-center items-center mt-10">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </p>
              ) : filteredClasses?.length ? (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mx-5 my-10 h-[700px] overflow-y-auto">
                  {filteredClasses?.map((cls) => {
                    const classDate = new Date(cls.courseStartingDateTime);
                    const formattedDate = classDate.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });

                    const totalStudents = allUsers?.filter((std) =>
                      std?.courses?.some(
                        (data) => data?.batchId === cls?.batches[0]?.batchId
                      )
                    );

                    const totalStudent = totalStudents?.length;

                    return (
                      <div
                        key={cls.id} // Assuming each class has a unique id
                        className="p-5 h-[250px]"
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #EFEFEF",
                          background: "#FFF",
                          boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                        }}
                      >
                        <div className="flex gap-2 border-b pb-2">
                          <div className="">
                            <img src={cls.imageUrl} alt="" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-xl font-medium">
                              {cls.taskName}
                            </p>
                            <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                              {cls.creatorName}
                              <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                                <img src={active} alt="" />
                                <span>online</span>
                              </span>
                            </p>
                            <p className="text-[#2E8760] text-sm font-normal">
                              {formattedDate}
                            </p>
                          </div>
                        </div>
                        <div className="text-[#8A8A8A] text-base font-normal my-5">
                          <p className="flex gap-5">
                            <img src={clock} alt="clock" /> Class ended
                          </p>
                          <p
                            onClick={() =>
                              listView(
                                cls?.batches[0].batchId,
                                cls?.participants,
                                cls?._id
                              )
                            }
                            className="mt-3 flex gap-5 cursor-pointer"
                          >
                            <img src={list} alt="list" /> Students -{" "}
                            {cls?.participants?.length | 0}/{totalStudent}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          {/*   <button
                        className="px-6 py-1 text-[#fff] text-base font-medium"
                        style={{
                          borderRadius: "7px",
                          background:
                            "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                        }}
                      >
                        Join Now
                      </button> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center font-medium text-sky-400 mt-5 ">
                No classes available
              </p>
              
              ))}
            {selectedTab === "upcomingClasses" && (
              <UpComingClasses classes={classes} />
            )}
            {selectedTab === "doubtClearingClasses" && <DoubtClearingClasses />}
          </div>

          {/*  <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default PastClasses;
