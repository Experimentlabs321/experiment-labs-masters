import React, { useState, useEffect } from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import axios from "axios";
import toast from "react-hot-toast";

const StudentList = ({
  studentListOpen,
  setStudentListOpen,
  selectedBatchId,
  participants,
  classId,
  reloadClassData,
}) => {
  const [students, setStudents] = useState([]);
  const [localParticipants, setLocalParticipants] = useState([]);

  useEffect(() => {
    if (selectedBatchId && studentListOpen) {
      fetchStudentData(selectedBatchId);
      setLocalParticipants(participants || []);
    }
  }, [selectedBatchId, studentListOpen, participants]);

  const fetchStudentData = async (batchId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/getAllUserByBatchId/${batchId}`
      );
      setStudents(response?.data.reverse());
    } catch (error) {
      console.error(error);
      toast.error("Failed to load student data.");
    }
  };

  const handlePresent = async (email, id) => {
    try {
      const updateParticipant = await axios.patch(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/classes/updateParticipants/${classId}`,
        {
          email: email,
          participantId: id,
          status: "Completed",
        }
      );

      if (updateParticipant?.data.result?.modifiedCount === 1) {
        toast.success("Status updated to present successfully!");

        setLocalParticipants((prevParticipants) => [
          ...(Array.isArray(prevParticipants) ? prevParticipants : []),
          { participant: { email } },
        ]);

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? { ...student, present: true } : student
          )
        );

        reloadClassData();
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
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/classes/deleteParticipants/${classId}`,
        {
          email: email,
          participantId: id,
          status: "Completed",
        }
      );

      if (updateParticipant?.data.result?.modifiedCount === 1) {
        toast.success("Status updated to absent successfully!");

        setLocalParticipants((prevParticipants) =>
          (Array.isArray(prevParticipants) ? prevParticipants : []).filter(
            (participant) => participant.participant.email !== email
          )
        );

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? { ...student, present: false } : student
          )
        );

        reloadClassData();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating status.");
    }
  };

  const sortedStudents = students.sort((a, b) => {
    const isPresentA = localParticipants.some(
      (par) => par.participant.email === a.email || a.present
    );
    const isPresentB = localParticipants.some(
      (par) => par.participant.email === b.email || b.present
    );

    return isPresentA === isPresentB ? 0 : isPresentA ? -1 : 1;
  });

  return (
    <div>
      <DialogLayoutForFromControl
        open={studentListOpen}
        setOpen={(open) => {
          setStudentListOpen(open);
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
              {sortedStudents?.map((student) => {
                const present = localParticipants?.some(
                  (par) => par.participant.email === student?.email || student?.present
                );

                return (
                  <tr key={student?.email} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{student?.name}</td>
                    <td className="border border-gray-300 p-2">{student?.email}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        present ? "bg-lime-900 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      <select
                        className={`w-full ${
                          present ? "bg-lime-900 text-white" : "bg-red-500 text-white"
                        }`}
                        onChange={(e) => {
                          if (e.target.value === "absent") {
                            handleAbsent(student?.email, student._id);
                          } else if (e.target.value === "present") {
                            handlePresent(student?.email, student._id);
                          }
                        }}
                        value={present ? "present" : "absent"}
                      >
                        <option value="absent">Absent</option>
                        <option value="present">Present</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default StudentList;
