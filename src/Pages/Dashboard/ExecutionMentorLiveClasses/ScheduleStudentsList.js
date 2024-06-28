import React, { useState, useEffect } from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";

const ScheduleStudentsList = ({ eventDetails, setStudentOpen, studentOpen, reloadEventData }) => {
  const [students, setStudents] = useState([]);
  const [localParticipants, setLocalParticipants] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (eventDetails) {
      setStudents([eventDetails]);
      setLocalParticipants(eventDetails.participants || []);
      setStatus(
        eventDetails.requester === eventDetails.participants?.[0]?.email
          ? "present"
          : "absent"
      );
    }
  }, [eventDetails]);

  const handlePresent = async (email, id) => {
    try {
      const updateParticipant = await axios.patch(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/updateEventParticipants/${eventDetails?._id}`,
        {
          email: email,
          status: "Completed",
        }
      );

      if (updateParticipant?.data.result?.modifiedCount === 1) {
        toast.success("Status updated to present successfully!");
        setStatus("present");

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? { ...student, present: true } : student
          )
        );
        reloadEventData();
        setLocalParticipants((prevParticipants) => [
          ...(Array.isArray(prevParticipants) ? prevParticipants : []),
          { email },
        ]);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating status.");
    }
  };

  const handleAbsent = async (email, id) => {
    try {
      const updateParticipant = await axios.patch(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/deleteEventParticipants/${eventDetails?._id}`,
        {
          email: email,
          status: "Completed",
        }
      );

      if (updateParticipant?.data.result?.modifiedCount === 1) {
        toast.success("Status updated to absent successfully!");
        setStatus("absent");
        reloadEventData();
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? { ...student, present: false } : student
          )
        );

        setLocalParticipants((prevParticipants) =>
          (Array.isArray(prevParticipants) ? prevParticipants : []).filter(
            (participant) => participant.email !== email
          )
        );
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating status.");
    }
  };

  return (
    <div>
      <DialogLayoutForFromControl
        open={studentOpen}
        setOpen={(open) => {
          setStudentOpen(open);
          if (!open) {
            // Reset state when modal closes
            setLocalParticipants([]);
            setStudents([]);
          }
        }}
        width={800}
        title={
          <p className="h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Students list
          </p>
        }
      >
        <div className="w-full">
          <table className="w-full border border-collapse border-gray-300">
            <thead>
              <tr className="border border-gray-300">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {eventDetails && (
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 p-2">
                    {eventDetails.studentName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {eventDetails.requester}
                  </td>
                  <td className={`border border-gray-300 p-2 ${
                        status === "present"
                          ? "bg-lime-900 text-white"
                          : "bg-red-500 text-white"
                      }`}>
                    <select
                      className={`w-full ${
                        status === "present"
                          ? "bg-lime-900 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onChange={(e) => {
                        if (e.target.value === "absent") {
                          handleAbsent(eventDetails.requester, eventDetails._id);
                        } else if (e.target.value === "present") {
                          handlePresent(eventDetails.requester, eventDetails._id);
                        }
                      }}
                      value={status}
                    >
                      <option value="absent">Absent</option>
                      <option value="present">Present</option>
                    </select>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default ScheduleStudentsList;
