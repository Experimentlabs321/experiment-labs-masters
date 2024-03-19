import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function WeekChapData({ weekData, serial }) {
  const [chapterData, setChapterData] = useState([]);
  console.log(weekData)
  useEffect(() => {
    const fetchChapterDetails = async () => {
      // Since weekData is now an object, directly use its _id to fetch chapters
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${weekData._id}`);
        // Assuming response.data is the array of chapters for the week
        setChapterData([{ weekId: weekData._id, chapters: response.data }]);
      } catch (error) {
        console.error(`Error fetching chapters for weekId: ${weekData._id}`, error);
      }
    };

    // Only attempt to fetch chapter details if weekData has a valid _id
    if (weekData && weekData._id) {
      fetchChapterDetails();
    }
  }, [weekData]);

  console.log(chapterData);
  return (
    <>
      <tr className="bg-gray-50 border-b">
        {/* <td className="py-2 px-5 border-b text-left">Week {serial+1}</td> */}
        <td className="py-2 px-5 border-b text-left">{weekData?.weekName}</td>
        <tr>
          {chapterData?.chapters?.map((chapter, index) => (
            <td key={index} className="py-2 px-5 border-b text-left">
              {chapter}
            </td>
          ))}
        </tr>
      </tr>

    </>
  );
}
