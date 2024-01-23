import React from 'react';

const test = () => {
    return (
        <div>
        <Layout>
          <div>
            {Role === "admin" && (
              <div>
                <div className="pt-[110px] border-b-2 ">
                  <div className="container mx-auto px-4 flex items-center justify-between ">
                    <div className="flex items-center pt-[30px] pb-[40px] ">
                      <Link
                        to="/courseAccess"
                        className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline"
                      >
                        My Courses
                      </Link>
                      <svg
                        className="mr-[30px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M9 18.667L15 12.667L9 6.66699"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                        {courseData?.courseFullName}
                      </button>
                    </div>
                    <div className="flex items-center mt-[-10px] ">
                      <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                        <h1 className="mr-[16px]">Preview Mode</h1>
                        {preview ? (
                          <svg
                            className="cursor-pointer"
                            onClick={() => setPreview(!preview)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="58"
                            height="27"
                            viewBox="0 0 58 27"
                            fill="none"
                          >
                            <rect
                              width="57.8422"
                              height="26.7841"
                              rx="13.392"
                              fill="#9747FF"
                            />
                            <circle
                              cx="44.4512"
                              cy="13.3916"
                              r="10.1153"
                              fill="white"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="cursor-pointer"
                            onClick={() => setPreview(!preview)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="58"
                            height="28"
                            viewBox="0 0 58 28"
                            fill="none"
                          >
                            <rect
                              y="0.608398"
                              width="57.8422"
                              height="26.7841"
                              rx="13.392"
                              fill="#A3A3A3"
                            />
                            <circle
                              cx="13.3926"
                              cy="14"
                              r="10.1153"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                      {/* Add task dialog start */}
                      <DialogLayout
                        open={addTaskOpen}
                        setOpen={setAddTaskOpen}
                        width={600}
                        title={
                          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                            Add Task
                          </p>
                        }
                      >
                        <div className="px-[32px] py-[24px] grid grid-cols-3 gap-[70px]">
                          {TaskTypeInfo?.map((taskType) => (
                            <Link
                              to={taskType?.route}
                              onMouseDown={() => {
                                localStorage.setItem("courseId", courseData?._id);
                                localStorage.setItem(
                                  "currentWeek",
                                  JSON.stringify(currentWeek)
                                );
                              }}
                              className="w-full bg-[#F6F7FF] rounded-[14px] p-[24px]"
                            >
                              <div
                                style={{ background: taskType?.theme }}
                                className={` flex items-center rounded-[12px] justify-center p-[18px]`}
                              >
                                <img src={taskType?.icon} alt="icon" />
                              </div>
                              <h1 className="text-[13px] font-[700] mt-[20px] text-center">
                                {taskType?.name}
                              </h1>
                            </Link>
                          ))}
                        </div>
                      </DialogLayout>
                      {/* Add task dialog end */}
                      {/* Add chapter dialog start */}
                      <DialogLayout
                        open={addChapterOpen}
                        setOpen={setAddChapterOpen}
                        width={440}
                        title={
                          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                            Add Chapter
                          </p>
                        }
                      >
                        <form
                          onSubmit={handleAddChapter}
                          className="px-[32px] py-[24px] "
                        >
                          <h1 className=" text-[18px] font-[700] mb-[24px] ">
                            Chapter Name
                          </h1>
                          <input
                            type="text"
                            name="chapterName"
                            placeholder="Eg. Onboarding"
                            className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                          />
                          <div className="w-full flex items-center justify-center mt-[40px]">
                            <input
                              type="submit"
                              value="Add"
                              className="py-[15px] cursor-pointer px-[48px] text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                            />
                          </div>
                        </form>
                      </DialogLayout>
                      {/* Add chapter dialog end */}
                      <>
                        <button
                          onClick={() => setAddChapterOpen(true)}
                          className="flex items-center bg-[#FF557A] text-[16px] font-[700] text-white p-[16px] rounded-[20px] mr-[32px] "
                        >
                          <svg
                            className="mr-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M19.8438 11H13.8438V5H11.8438V11H5.84375V13H11.8438V19H13.8438V13H19.8438V11Z"
                              fill="white"
                            />
                          </svg>
                          <h1 className="mr-[12px]">Add Chapter</h1>
                        </button>
                        <Link
                          to="/createCourse"
                          className="flex items-center bg-[#3E4DAC] text-[16px] font-[700] text-white p-[16px] rounded-[20px] "
                        >
                          <svg
                            className="mr-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.6267 0.665039L15.8438 3.81149L13.3913 6.21118L10.1742 3.06473L12.6267 0.665039ZM0.84375 15.3359H4.06079L11.875 7.69316L8.65795 4.54671L0.84375 12.1894V15.3359Z"
                              fill="white"
                            />
                          </svg>
                          <h1 className="mr-[12px]">Edit Course</h1>
                        </Link>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="px-4">
              <div className="flex items-center ">
                <WeekConfiguration
                  weeks={weeks}
                  setWeeks={setWeeks}
                  currentWeek={currentWeek}
                  setCurrentWeek={setCurrentWeek}
                  batchesData={batchesData}
                  courseId={id}
                  chapters={chapters}
                />
                {Role === "admin" && (
                  <BatchConfiguration
                    selectedBatches={selectedBatches}
                    setSelectedBatches={setSelectedBatches}
                    batchesData={batchesData}
                  />
                )}
              </div>
              <div>
                {/* Edit chapter name start */}
                <DialogLayout
                  open={editChapterOpen}
                  setOpen={setEditChapterOpen}
                  width={440}
                  borderRadius="15px"
                  title={
                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                      Edit Chapter Name
                    </p>
                  }
                >
                  <form
                    onSubmit={handleEditChapterName}
                    className="px-[32px] py-[24px] "
                  >
                    <h1 className=" text-[18px] font-[700] mb-[20px] ">
                      Chapter Name
                    </h1>
                    <input
                      type="text"
                      name="chapterName"
                      defaultValue={chapterData?.chapterName}
                      placeholder="Eg. Onboarding"
                      className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <div className="w-full flex items-center justify-center mt-[40px]">
                      <input
                        type="submit"
                        value="Update"
                        className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                      />
                    </div>
                  </form>
                </DialogLayout>
                {/* Edit chapter name end */}
                {/* Delete task start */}
                <DialogLayoutForFromControl
                  title={
                    <p className=" h-[80px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                      Delete Task
                    </p>
                  }
                  width={500}
                  setOpen={setDeleteTaskPopup}
                  open={deleteTaskPopup}
                >
                  <div className="w-full">
                    <p className="text-[20px] font-[700] mb-3">
                      Task:{" "}
                      <span className="font-[500]">
                        {selectedChapterAndTaskToDeleteTask &&
                          selectedChapterAndTaskToDeleteTask?.task?.taskName}
                      </span>
                    </p>
                    <p className=" mb-2 flex justify-between items-center">
                      <span className="text-[20px] font-[700]">
                        Select Batches:
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          checked={
                            selectedBatchesToDeleteTask?.length ===
                            selectedChapterAndTaskToDeleteTask?.task?.batches
                              ?.length
                          }
                          onChange={(event) => {
                            const isChecked = event.target.checked;
                            if (isChecked) {
                              setSelectedBatchesToDeleteTask(
                                selectedChapterAndTaskToDeleteTask?.task.batches
                              );
                            } else {
                              setSelectedBatchesToDeleteTask([]);
                            }
                          }}
                          className="mr-2"
                        />
                        <label>Select all</label>
                      </span>
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {selectedChapterAndTaskToDeleteTask?.task &&
                        selectedChapterAndTaskToDeleteTask?.task?.batches?.map(
                          (batch) => (
                            <div
                              key={batch.batchId}
                              className="flex items-center mb-2"
                            >
                              <input
                                type="checkbox"
                                checked={selectedBatchesToDeleteTask.includes(
                                  batch
                                )}
                                onChange={(event) => {
                                  const isChecked = event.target.checked;
                                  if (isChecked) {
                                    setSelectedBatchesToDeleteTask([
                                      ...selectedBatchesToDeleteTask,
                                      batch,
                                    ]);
                                  } else {
                                    setSelectedBatchesToDeleteTask(
                                      selectedBatchesToDeleteTask.filter(
                                        (singleBatch) =>
                                          singleBatch?.batchId !== batch?.batchId
                                      )
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label>{batch.batchName}</label>
                            </div>
                          )
                        )}
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => {
                          handleTaskDelete(
                            selectedChapterAndTaskToDeleteTask?.task,
                            selectedChapterAndTaskToDeleteTask?.chapter
                          );
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTaskPopup(false);
                          setSelectedBatchesToDeleteTask([]);
                          setSelectedChapterAndTaskToDeleteTask({});
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </DialogLayoutForFromControl>
                <div>
                  {chapters?.map((chapter, index) => (
                    <div key={chapter?._id} className="sortable-chapter">
                      <div className="relative">
                        <div className="flex items-center justify-between mt-[60px]">
                          <div className="flex items-center ">
                            <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                              <h1 className="text-[35px] font-[600] ">
                                {index + 1}
                              </h1>
                            </div>
                            <h1 className="text-[23px] font-[700] lg:ml-[40px] mx-5">
                              {chapter?.chapterName}{" "}
                              {Role === "admin" && (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditChapterOpen(true);
                                      setChapterData({
                                        ...chapter,
                                        index: index,
                                      });
                                    }}
                                    className="ml-[24px]"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="20"
                                      viewBox="0 0 18 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                        fill="#282828"
                                      />
                                    </svg>
                                  </button>
                                </>
                              )}
                            </h1>
                          </div>
                          {Role === "user" && (
                            <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                              In Progress
                            </button>
                          )}
                        </div>
                        <div className="sub-items">
                          {Role === "admin" && chapter?.tasks?.map((task, taskIndex) => (
                            <div key={task?.taskId} className="relative ">
                              <div className="flex items-center justify-between my-[60px] relative z-10 ">
                                <div className="flex gap-5 lg:gap-0 items-center w-full">
                                  {toggleButton && (
                                    <div className="w-[85px] flex items-center justify-center ">
                                      {Role !== "admin" && (
                                        <>
                                          {task?.participants?.find(
                                            (item) =>
                                              item?.participantId ===
                                              userInfo?._id
                                          ) ? (
                                            <>
                                              {task?.participants?.find(
                                                (item) =>
                                                  item?.participantId ===
                                                  userInfo?._id
                                              )?.status === "Completed" ? (
                                                <img
                                                  src={Completed}
                                                  alt="Completed"
                                                />
                                              ) :
                                                (
                                                  <img
                                                    src={InProgress}
                                                    alt="InProgress"
                                                  />
                                                )
                                              }
                                            </>
                                          ) : (
                                            <>
                                              <img src={Pending} alt="Pending" />
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                  <div className="flex w-full items-center">
                                    {task?.taskType === "Reading" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={ReadingTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Classes" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={ClassesTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Assignment" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={AssignmentTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Quiz" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={QuizTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Live Test" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={LiveTestTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Video" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={VideoTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Audio" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={AudioTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Files" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={FilesTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Schedule" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={calendar}
                                        alt="Schedule"
                                      />
                                    )}
                                    <div className="">
                                      <Link
                                        onClick={() => {
                                          localStorage.setItem(
                                            "chapter",
                                            chapter?.chapterName
                                          );
                                          localStorage.setItem(
                                            "task",
                                            JSON.stringify(task)
                                          );
                                          localStorage.setItem(
                                            "currentWeek",
                                            JSON.stringify(currentWeek)
                                          );
                                          localStorage.setItem(
                                            "courseId",
                                            JSON.stringify(courseData?._id)
                                          );
                                        }}
                                        to={`/week/${currentWeek?._id}`}
                                        className="text-[#3E4DAC] text-[22px] font-[700] "
                                      >
                                        {task?.taskName}
                                      </Link>
                                      <p className="text-[#626262] text-[18px] font-[500] ">
                                        {task?.taskType}
                                      </p>
                                    </div>
                                  </div>
                                  {!toggleButton && (
                                    <div className="mx-2 flex items-center justify-center ">
                                      {Role !== "admin" && (
                                        <>
                                          {task?.participants?.find(
                                            (item) =>
                                              item?.participantId ===
                                              userInfo?._id
                                          ) ? (
                                            <>
                                              {task?.participants?.find(
                                                (item) =>
                                                  item?.participantId ===
                                                  userInfo?._id
                                              )?.status === "Completed" ? (
                                                <img
                                                  src={Completed}
                                                  alt="Completed"
                                                />
                                              ) : (
                                                <img
                                                  src={InProgress}
                                                  alt="InProgress"
                                                />
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              <img src={Pending} alt="Pending" />
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {Role === "admin" && (
                                  <div className="max-w-[200px] flex gap-2 flex-wrap ">
                                    {task?.batches?.map((batch) => (
                                      <h1 className="p-1 bg-slate-200 font-sans rounded-md">
                                        {batch?.batchName}
                                      </h1>
                                    ))}
                                  </div>
                                )}
                                {Role === "admin" && (
                                  <div className="relative">
                                    <button
                                      onClick={() => {
                                        if (clickedTask === task)
                                          setClickedTask(null);
                                        else setClickedTask(task);
                                      }}
                                      onBlur={() => setClickedTask(null)}
                                      className=" mr-[25px] "
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="31"
                                        viewBox="0 0 30 31"
                                        fill="none"
                                      >
                                        <path
                                          d="M15.0166 12.6104C13.6432 12.6104 12.5195 13.734 12.5195 15.1074C12.5195 16.4808 13.6432 17.6045 15.0166 17.6045C16.39 17.6045 17.5137 16.4808 17.5137 15.1074C17.5137 13.734 16.39 12.6104 15.0166 12.6104ZM15.0166 5.11914C13.6432 5.11914 12.5195 6.24282 12.5195 7.61621C12.5195 8.9896 13.6432 10.1133 15.0166 10.1133C16.39 10.1133 17.5137 8.9896 17.5137 7.61621C17.5137 6.24282 16.39 5.11914 15.0166 5.11914ZM15.0166 20.1016C13.6432 20.1016 12.5195 21.2252 12.5195 22.5986C12.5195 23.972 13.6432 25.0957 15.0166 25.0957C16.39 25.0957 17.5137 23.972 17.5137 22.5986C17.5137 21.2252 16.39 20.1016 15.0166 20.1016Z"
                                          fill="black"
                                        />
                                      </svg>
                                    </button>
                                    {clickedTask === task && (
                                      <ul className="absolute right-5 top-[35px] w-max border  bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                        <li
                                          onMouseDown={() => {
                                            localStorage.setItem(
                                              "chapter",
                                              chapter?.chapterName
                                            );
                                            localStorage.setItem(
                                              "task",
                                              JSON.stringify(task)
                                            );
                                            localStorage.setItem(
                                              "course",
                                              courseData?.courseFullName
                                            );
                                            localStorage.setItem(
                                              "currentWeek",
                                              JSON.stringify(currentWeek)
                                            );
                                            navigate(
                                              `/editTask/${currentWeek?._id}`
                                            );
                                          }}
                                          className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                                        >
                                          Edit Task
                                        </li>
                                        <li
                                          className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                                          onMouseDown={() => {
                                            // handleTaskDelete(task, chapter);
                                            setDeleteTaskPopup(true);
                                            setSelectedChapterAndTaskToDeleteTask(
                                              { task, chapter }
                                            );
                                          }}
                                        >
                                          Delete Task
                                        </li>
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </div>
                              {chapter?.tasks?.length - 1 !== taskIndex && (
                                <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] lg:left-[175px] left-[20px]" />
                              )}
                            </div>
                          ))}
                          {Role !== "admin" && chapter?.tasks?.map((task, taskIndex) => {
                            const userIsParticipant = task?.participants?.some(
                              (item) => item?.participantId === userInfo?._id
                            );
  
                            const isPreviousTaskCompleted =
                              taskIndex === 0 || // Always allow navigation for the first task
                              chapter?.tasks?.[taskIndex - 1]?.participants?.some(
                                (item) => item?.participantId === userInfo?._id && item?.status === "Completed"
                              );
  
                            return (
                              <div key={task?.taskId} className="relative">
                                <div className="flex items-center justify-between my-[60px] relative z-10">
                                  {toggleButton && (
                                    <div className="w-[85px] flex items-center justify-center ">
                                      {Role !== "admin" && (
                                        <>
                                          {userIsParticipant ? (
                                            <>
                                              {task?.participants?.find(
                                                (item) => item?.participantId === userInfo?._id
                                              )?.status === "Completed" ? (
                                                <img src={Completed} alt="Completed" />
                                              ) : (
                                                <img src={InProgress} alt="InProgress" />
                                              )}
                                            </>
                                          ) : (
                                            <div className="w-full flex items-center justify-start gap-2">
                                              <img src={Pending} alt="Pending" />
                                              {!isPreviousTaskCompleted && <img className="w-[35px]" src={lock} alt="Lock" />}
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                  <div className="flex w-full items-center">
                                    {task?.taskType === "Reading" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={ReadingTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Classes" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={ClassesTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Assignment" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={AssignmentTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Quiz" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={QuizTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Live Test" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={LiveTestTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Video" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={VideoTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Audio" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={AudioTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Files" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={FilesTask}
                                        alt="Task"
                                      />
                                    )}
                                    {task?.taskType === "Schedule" && (
                                      <img
                                        className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                        src={calendar}
                                        alt="Task"
                                      />
                                    )}
                                    <div className="">
                                      {isPreviousTaskCompleted ? (
                                        <Link
                                          onClick={() => {
                                            localStorage.setItem("chapter", chapter?.chapterName);
                                            localStorage.setItem("task", JSON.stringify(task));
                                            localStorage.setItem("currentWeek", JSON.stringify(currentWeek));
                                            localStorage.setItem("courseId", JSON.stringify(courseData?._id));
                                          }}
                                          to={`/week/${currentWeek?._id}`}
                                          className="text-[#3E4DAC] text-[22px] font-[700]"
                                        >
                                          {task?.taskName}
                                        </Link>
                                      ) : (
                                        <span onClick={() => toast.error("Complete The Previous Task")} className="text-[#3E4DAC] text-[22px] font-[700]">{task?.taskName}</span>
                                      )}
                                      <p className="text-[#626262] text-[18px] font-[500]">{task?.taskType}</p>
                                    </div>
                                  </div>
                                  {!toggleButton && (
                                    <div className="mx-2 flex items-center justify-center ">
                                      {Role !== "admin" && (
                                        <>
                                          {userIsParticipant ? (
                                            <>
                                              {task?.participants?.find(
                                                (item) => item?.participantId === userInfo?._id
                                              )?.status === "Completed" ? (
                                                <img src={Completed} alt="Completed" />
                                              ) : (
                                                <img src={InProgress} alt="InProgress" />
                                              )}
                                            </>
                                          ) : (
                                            <img src={Pending} alt="Pending" />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {chapter?.tasks?.length - 1 !== taskIndex && (
                                  <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] lg:left-[175px] left-[20px]" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {Role === "admin" && (
                        <div
                          onClick={() => {
                            setAddTaskOpen(true);
                            setChapterData(chapter);
                          }}
                          className="py-[32px] cursor-pointer px-[40px] bg-[#FFFEE8] my-[45px] rounded-[15px] "
                        >
                          <div className="flex items-center">
                            <svg
                              className=" bg-[#FF557A] rounded-full w-[38px] h-[38px] mr-[24px] "
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                            >
                              <path
                                d="M19 11.5H13V5.5H11V11.5H5V13.5H11V19.5H13V13.5H19V11.5Z"
                                fill="white"
                              />
                            </svg>
                            <h1 className="text-[20px] font-[600]"> Add Task</h1>
                          </div>
                        </div>
                      )}
                      {index !== chapters?.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
};

export default test;