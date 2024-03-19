import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WeekChapData({ weekData }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${weekData._id}`);
        // Assuming response.data is an array of chapters
        setChapters(response.data); 
      } catch (error) {
        console.error(`Error fetching chapters for weekId: ${weekData._id}`, error);
      }
    };

    if (weekData && weekData._id) {
      fetchChapterDetails();
    }
  }, [weekData]);

  return (
    <>
      {chapters.map((chapter, chapterIndex) => {
        // We'll use the chapter index to check if we need to add a rowSpan for the week name
        const isFirstChapter = chapterIndex === 0;
        const chapterTaskRows = chapter.tasks ? chapter.tasks.length : 0;

        return chapter.tasks.map((task, taskIndex) => (
          <tr key={task._id} className="border-b">
            {isFirstChapter && taskIndex === 0 && (
              // rowspan for the week name should be the total count of all tasks in all chapters
              <td rowSpan={chapters.reduce((sum, curr) => sum + (curr.tasks ? curr.tasks.length : 0), 0)} 
              className="min-w-[120px] py-2 px-5 text-left border-r align-top">
                {weekData.weekName}
              </td>
            )}
            {taskIndex === 0 && (
              // rowspan for the chapter name should be the number of tasks in that chapter
              <td rowSpan={chapterTaskRows} className="min-w-[120px] py-2 px-5 text-left border-r align-top">
                {chapter.chapterName}
              </td>
            )}
            <td className="min-w-[120px] py-2 px-5 text-left">{task.taskName}</td>
            {/* Additional task details columns can be added here */}
          </tr>
        ));
      })}
    </>
  );
}


// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// export default function WeekChapData({ weekData, serial }) {
//   const [chapters, setChapters] = useState([]);

//   useEffect(() => {
//     const fetchChapterDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${weekData._id}`);
//         setChapters(response.data); // Assuming response.data is an array of chapters
//       } catch (error) {
//         console.error(`Error fetching chapters for weekId: ${weekData._id}`, error);
//       }
//     };

//     if (weekData && weekData._id) {
//       fetchChapterDetails();
//     }
//   }, [weekData]);


//   console.log(chapters);
//   const totalRows = chapters.reduce((total, chapter) => total + (chapter.tasks ? chapter.tasks.length : 0), 0);

//   return (
//     <>
//       {chapters.length > 0 && chapters.map((chapter, chapterIndex) => (
//         chapter.tasks.map((task, taskIndex) => (
//           <tr key={task._id} className="border-b">
//             {chapterIndex === 0 && taskIndex === 0 && (
//               // This cell will only be added to the first task of the first chapter
//               <td rowSpan={totalRows} className="py-2 px-5 text-left align-top">
//                 {weekData.weekName}
//               </td>
//             )}
//             <td className="py-2 px-5 text-left">{chapterIndex === 0 && taskIndex === 0 ? chapter.chapterName : ''}</td>
//             <td className="py-2 px-5 text-left">{task.name}</td>
//             <td className="py-2 px-5 text-left">{task.status}</td>
//             <td className="py-2 px-5 text-left">{task.deadline || 'NA'}</td>
//             <td className="py-2 px-5 text-left">{task.nudge}</td>
//           </tr>
//         ))
//       ))}
//     </>
//   );
// }