import React, { useEffect, useState } from "react";
import EditAssignment from "./EditAssignment";
import EditClasses from "./EditClasses";
import EditReading from "./EditReading";
import EditQuiz from "./EditQuiz";
import EditLiveTest from "./EditLiveTest";
import EditVideo from "./EditVideo";
import EditAudio from "./EditAudio";
import EditFiles from "./EditFiles";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditSchedule from "./EditSchedule";

const EditTasks = () => {
  const { id } = useParams();

  const queryParameters = new URLSearchParams(window.location.search);
  const queryTaskType = queryParameters.get("taskType");
  const [task, setTask] = useState(JSON.parse(localStorage.getItem("task")));
  const [taskData, setTaskData] = useState();

  return (
    <div>
      {queryTaskType === "Classes" && <EditClasses taskData={taskData} />}
      {queryTaskType === "Assignment" && <EditAssignment taskData={taskData} />}
      {queryTaskType === "Reading" && <EditReading taskData={taskData} />}
      {queryTaskType === "Quiz" && <EditQuiz taskData={taskData} />}
      {queryTaskType === "Live Test" && <EditLiveTest taskData={taskData} />}
      {queryTaskType === "Video" && <EditVideo taskData={taskData} />}
      {queryTaskType === "Audio" && <EditAudio taskData={taskData} />}
      {queryTaskType === "Files" && <EditFiles taskData={taskData} />}
      {queryTaskType === "Schedule" && <EditSchedule taskData={taskData} />}
    </div>
  );
};

export default EditTasks;
