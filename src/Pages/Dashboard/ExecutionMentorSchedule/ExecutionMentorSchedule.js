
import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";


import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Give Quizzes to all the respective batches',
        start: new Date(2023, 7, 7, 9, 0),
        end: new Date(2023, 7, 7, 9, 30),
    },
    {
        title: 'Work',
        start: new Date(2023, 7, 7, 9, 30),
        end: new Date(2023, 7, 7, 10, 0),
    },
    // Add more events here
];


const ExecutionMentorSchedule = () => {





    return (
        <div>
            <Layout>



                <div className=''>

                    <AssignmentUpNev page={'schedule'} />

                </div>


                <div className="flex mt-24">
                    <div className="w-full ms-10 mt-10">
                        <div className="text-2xl font-semibold">
                            <p>My Schedule</p>

                        </div>

                        <div className="mt-10">
                            
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                            />

                        </div>



                    </div>


                    <div>
                        <AssignmentRightNev />

                    </div>


                </div>




            </Layout>
        </div >




    );
};

export default ExecutionMentorSchedule;

