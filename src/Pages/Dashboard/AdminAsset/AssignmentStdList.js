import React, { useState, useEffect } from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI

const AssignmentStdList = ({
  studentListOpen,
  setStudentListOpen,
  selectedBatchId,
  participants,
  allUsers,
  selectedBatch
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

  const sortedStudents = allUsers?.sort((a, b) => {
    const isSubmitedA = localParticipants.some(
      (par) => par.participant.email === a.email || a.Submited
    );
    const isSubmitedB = localParticipants.some(
      (par) => par.participant.email === b.email || b.Submited
    );

    return isSubmitedA === isSubmitedB ? 0 : isSubmitedA ? -1 : 1;
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
                  const Submited = localParticipants?.some(
                    (par) =>
                      par.participant.email === student?.email ||
                      student?.Submited
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
                          Submited
                            ? "bg-lime-900 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {Submited ? "Submited" : "No submit"}
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

export default AssignmentStdList;
