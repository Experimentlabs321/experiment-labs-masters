import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const ScheduleTask = ({ taskData }) => {
  const {userInfo} = useContext(AuthContext);
  if(userInfo.role !== 'admin'){
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };

  console.log(taskData)
  return (
    <div>

      <p>calendar</p>
    </div>
  );
};

export default ScheduleTask;
