import React, { useState } from "react";
import EditAssignment from "./EditAssignment";
import EditClasses from "./EditClasses";
import EditReading from "./EditReading";
import EditQuiz from "./EditQuiz";
import EditLiveTest from "./EditLiveTest";
import EditVideo from "./EditVideo";
import EditAudio from "./EditAudio";
import EditFiles from "./EditFiles";

const EditTasks = () => {
  const [task, setTask] = useState(JSON.parse(localStorage.getItem("task")));
  const [taskData, setTaskData] = useState();
  return (
    <div>
      {task?.taskType === "Classes" && <EditClasses taskData={taskData} />}
      {task?.taskType === "Assignment" && (
        <EditAssignment taskData={taskData} />
      )}
      {task?.taskType === "Reading" && <EditReading taskData={taskData} />}
      {task?.taskType === "Quiz" && <EditQuiz taskData={taskData} />}
      {task?.taskType === "Live Test" && <EditLiveTest taskData={taskData} />}
      {task?.taskType === "Video" && <EditVideo taskData={taskData} />}
      {task?.taskType === "Audio" && <EditAudio taskData={taskData} />}
      {task?.taskType === "Files" && <EditFiles taskData={taskData} />}
    </div>
  );
};

export default EditTasks;
