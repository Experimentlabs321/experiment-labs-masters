
import 'react-circular-progressbar/dist/styles.css';

import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import axios from 'axios';
import { red } from '@mui/material/colors';
import { AuthContext } from '../../../contexts/AuthProvider';
import Layout from '../Layout';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import googlemeet from "../../../assets/icons/googlemeet.png";
import zoom from "../../../assets/icons/zoom-240.png";
import eye from "../../../assets/ExecutionMentor/eye.svg";
import toast from 'react-hot-toast';
import ExecutionMentorBookSchedule from './ExecutionMentorBookSchedule';
const MentorScheduleList = () => {
    const { userInfo, user } = useContext(AuthContext);
    const [scheduleList, setScheduleList] = useState({});

    const [addBookOpen, setAddBookOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [selectedC, setSelectedC] = useState("");
    const [offDays, setOffDays] = useState([]);
    const [dateRange, setDateRange] = useState("");
    const [duration, setDuration] = useState("");
    const [selectedMin, setSelectedMin] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState("");
    const [selectedMax, setSelectedMax] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [meetingType, setMeetingType] = useState("");
    const [scheduleEvents, setScheduleEvents] = useState([]);
    useEffect(() => {
        if (!userInfo?._id) {
            return;
        }
        Loading();
        axios
            .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/schedules/mentorId/${userInfo?._id}`)
            .then((response) => {
                Loading().close();

                setScheduleList(response?.data?.data);

            })
            .catch((error) => {
                Loading().close();
                console.error(error);
            })
            .finally(() => {
                Loading().close();
            });
    }, [userInfo]);


    // Helper function to get today's date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleBooking = (schedule, course, batch, maximum, minimum, e,type,off,range,events,mail,time) => {
        setSelectedSchedule(schedule);
        setSelectedC(course);
        setSelectedBatch(batch);
        setSelectedMax(maximum);
        setSelectedMin(minimum);
        setSelected(e);
        setMeetingType(type)
        setOffDays(off);
        setDateRange(range);
        setScheduleEvents(events);
        setSelectedAdmin(mail);
        setDuration(time);
        setAddBookOpen(true);
    }
    console.log(scheduleList);


    return (
        <div>
            <div>
                <ExecutionMentorBookSchedule
                    selectedSchedule={selectedSchedule}
                    selectedC={selectedC}
                    selectedBatch={selectedBatch}
                    selectedMax={selectedMax}
                    selectedMin={selectedMin}
                    selected={selected}
                    meetingmedium={meetingType}
                    offDays={offDays}
                    dateRange={dateRange}
                    scheduleEvents={scheduleEvents}
                    selectedAdmin={selectedAdmin}
                    durationMeeting={duration}
                    addBookOpen={addBookOpen}
                    setAddBookOpen={setAddBookOpen}
                />
            </div>
            {scheduleList?.length > 0 ? (
                // Render content specific to events where the user is the requester
                <>

                    <div
                        style={{
                            maxWidth: `${window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
                                }px`,
                        }}
                        className={`h-[70vh] mx-auto w-fit overflow-y-auto mt-5 border `}
                    >
                        <table className={` font-sans bg-white border border-gray-300`}>
                            <thead className="bg-gray-800 text-white sticky top-0">
                                <tr>
                                    <th className="py-3 px-6 border-b text-left whitespace-nowrap ">
                                        Schedule Name
                                    </th>
                                    <th className="py-3 px-6 border-b text-left whitespace-nowrap ">
                                        Course Name
                                    </th>
                                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                                        Created By
                                    </th>
                                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                                        Meeting Type
                                    </th>
                                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                                        Meeting Duration
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {scheduleList?.map((event, index) => {
                                    //   const eventStartTime = new Date(event.start_time || event.start.dateTime || event.start);
                                    return (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                                            }
                                        >
                                            <td onClick={() => handleBooking(event?.scheduleName || event?.taskName, event?.courseName, event?.batches[0]?.batchName, event?.maximumTime, event?.minimumTime, event?.courseId,event?.meetingType,event?.offDays,event?.dateRange,event?.events,event?.adminCalendarEmail,event?.meetingDuration)} className="cursor-pointer py-4 px-6 border-b text-left whitespace-nowrap">

                                                {event?.scheduleName ? event?.scheduleName : event?.taskName}
                                            </td>
                                            <td className="py-4 px-6 border-b text-left">
                                                {event?.courseName}
                                            </td>
                                            <td className="py-4 px-6 border-b text-left">
                                                {event?.usersession?.user?.user_metadata?.name}
                                            </td>
                                            <td className="py-4 px-6 border-b ">
                                                {event?.meetingType === "googlemeet" ? <div className='flex gap-2 items-center'><img src={googlemeet} alt="googlemeet" className="w-8 h-8" /><p>Google Meet</p></div> : <div className='flex gap-2 items-center'><img src={zoom} alt="zoom" className="w-8 h-8" /><p>Zoom</p></div>}
                                            </td>
                                            <td className="py-4 px-6 border-b ">
                                                {event?.meetingDuration} minutes
                                            </td>


                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )
                : <p className="text-center font-medium text-sky-400 mt-5 ">No Upcoming Scheduled Events</p>}
        </div>
    );
};

export default MentorScheduleList;


