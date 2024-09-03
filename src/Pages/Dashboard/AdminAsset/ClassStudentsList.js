import React, { useState, useEffect } from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress"; 

const ClassStudentsList = ({
  studentListOpen,
  setStudentListOpen,
  selectedBatchId,
  participants,
  classId,
  reloadClassData,
  allUsers,
  totalStudent
}) => {
  const [students, setStudents] = useState([]);
  const [localParticipants, setLocalParticipants] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (selectedBatchId && studentListOpen) {
      setLoading(true); // Start loading
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/getAllUserByBatchId/${selectedBatchId}`
        )
        .then((response) => {
          setStudents(response?.data.reverse());
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to load student data.");
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });

      setLocalParticipants(participants || []);
    }
  }, [selectedBatchId, studentListOpen, participants]);

  const sortedStudents = totalStudent?.sort((a, b) => {
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
        {loading ? (
            <div className="flex align-items-center my-5 py-5">
              <CircularProgress className="w-full mx-auto" />
            </div>
          ) : (
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
                  (par) =>
                    par.participant.email === student?.email || student?.present
                );

                return (
                  <tr key={student?.email} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      {student?.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {student?.email}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        present
                          ? "bg-lime-900 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {present ? "Present" : "Absent"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default ClassStudentsList;
