// ApexChart.jsx
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../../Shared/Loading/Loading";
import { CircularProgress } from "@mui/material";
const ApexChart = ({ selectedFilter, students, setTotalStudents, setTotalEnrolledStudents, fromDate, toDate }) => {


    const [chartState, setChartData] = useState();
    ///7 days total vs enrolled students
    const [isLoading, setIsLoading] = useState(true);
    const [dayArr, setSevenDayArr] = useState([]);
    const [totalStudentsSevenDays, setTotalStudentsSevenDays] = useState([]);
    const [totalSevenDaysDayEnrolled, setTotalSevenDaysDayEnrolled] = useState([]);
    ////////30 days total vs enrolled students
    const [lastMonthDayArr, setLastMonthDayArr] = useState([]);
    const [totalStudentsLastMonth, setTotalStudentsLastMonth] = useState([]);
    const [totalLastMonthEnrolled, setTotalLastMonthEnrolled] = useState([]);
    //////// last year total vs enrolled students
    const [monthsArr, setMonthsArr] = useState([]);
    const [totalStudentsLastYear, setTotalStudentsLastYear] = useState([]);
    const [totalLastYearEnrolled, setTotalLastYearEnrolled] = useState([]);

    //////// Overall total vs enrolled students
    const [overallMonthsArr, setOverallMonthsArr] = useState([]);
    const [totalStudentsOverall, setTotalStudentsOverall] = useState([]);
    const [totalOverallEnrolled, setTotalOverallEnrolled] = useState([]);

    //////// Custom total vs enrolled students
    const [customDayArr, setCustomDayArr] = useState([]);
    const [totalStudentsCustom, setTotalStudentsCustom] = useState([]);
    const [totalCustomEnrolled, setTotalCustomEnrolled] = useState([]);

    //////// 7 days for total vs enrolled students
    useEffect(() => {
        if (selectedFilter === "Last 7 Days" && students) {
            const fromDateObj = new Date();
            fromDateObj.setDate(fromDateObj.getDate() - 6);
            const toDateObj = new Date();
            const days = [];
            const currentDate = new Date(fromDateObj);
            while (currentDate <= toDateObj) {
                days.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            const studentCountByDay = days?.reduce((acc, day) => {
                acc[day.toDateString()] = students?.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString();
                }).length;
                return acc;
            }, {});
            const dayAndStudentCountArray = days?.map(day => ({
                day: day.toLocaleDateString('en-US'),
                totalStudents: studentCountByDay[day.toDateString()] || 0
            }));


            const dayArr = dayAndStudentCountArray?.map(item => item.day);
            const totalStudentsPerDay = dayAndStudentCountArray?.map(item => item.totalStudents);


            const totalStudentsSum = totalStudentsPerDay?.reduce((total, count) => total + count, 0);

            setSevenDayArr(dayArr);
            setTotalStudentsSevenDays(totalStudentsPerDay);
            
            setTotalStudents(totalStudentsSum);
            const totalEnrolledArray = days?.map(day => {
                return students?.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString() && student?.courses && student.courses.length > 0 && student.role === "user";
                }).length;
            });


            const totalEnrolledSum = totalEnrolledArray?.reduce((total, count) => total + count, 0);

            setTotalSevenDaysDayEnrolled(totalEnrolledArray);

            setTotalEnrolledStudents(totalEnrolledSum);

            setIsLoading(false);
        }
    }, [students, selectedFilter, setTotalEnrolledStudents, setTotalStudents]);

    //////// 30 days for total vs enrolled students

    useEffect(() => {
        if (selectedFilter === "Last 30 Days" && students) {
            const fromDateObj = new Date();
            fromDateObj.setDate(fromDateObj.getDate() - 29);

            // End date is today
            const toDateObj = new Date();


            const days = [];
            const currentDate = new Date(fromDateObj);
            while (currentDate <= toDateObj) {
                days.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }


            const studentCountByDay = days?.reduce((acc, day) => {
                acc[day.toDateString()] = students?.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString();
                }).length;
                return acc;
            }, {});


            const dayAndStudentCountArray = days?.map(day => ({
                day: day.toLocaleDateString('en-US'),
                totalStudents: studentCountByDay[day.toDateString()] || 0
            }));


            const dayArr = dayAndStudentCountArray?.map(item => item.day);
            const totalStudentsPerDay = dayAndStudentCountArray?.map(item => item.totalStudents);


            const totalStudentsSum = totalStudentsPerDay?.reduce((total, count) => total + count, 0);

            setLastMonthDayArr(dayArr);
            setTotalStudentsLastMonth(totalStudentsPerDay);

            setTotalStudents(totalStudentsSum);


            const totalEnrolledArray = days?.map(day => {
                return students.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString() && student?.courses && student.courses.length > 0 && student.role === "user";
                }).length;
            });


            const totalEnrolledSum = totalEnrolledArray?.reduce((total, count) => total + count, 0);

            setTotalLastMonthEnrolled(totalEnrolledArray);

            setTotalEnrolledStudents(totalEnrolledSum);

            setIsLoading(false);
        }
    }, [students, selectedFilter, setTotalStudents, setTotalEnrolledStudents]);


    ///// last year for total vs enrolled students

    useEffect(() => {
        if (selectedFilter === "Last 11 Months" && students) {
            const fromDateObj = new Date();
            fromDateObj.setMonth(fromDateObj.getMonth() - 11);
            const toDateObj = new Date();
            const monthNames = []
            const monthsStartDate = [];

            let currentDate = new Date(fromDateObj);
            while (currentDate <= toDateObj) {
                const monthName = currentDate.toLocaleString('default', { month: 'long' });
                monthNames.push(monthName);
                monthsStartDate.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            const studentCountByMonth = monthsStartDate?.map((startDate, index) => {
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(endDate.getDate() - 1);

                return students?.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate >= startDate && studentDate <= endDate;
                }).length;
            });

            setMonthsArr(monthNames);
            setTotalStudentsLastYear(studentCountByMonth);


            const totalStudentsSum = studentCountByMonth?.reduce((total, count) => total + count, 0);

            setTotalStudents(totalStudentsSum);


            const totalEnrolledArray = monthsStartDate?.map((startDate, index) => {
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(endDate.getDate() - 1);

                return students?.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate >= startDate && studentDate <= endDate && student?.courses && student.courses.length > 0 && student.role === "user";
                }).length;
            });


            const totalEnrolledSum = totalEnrolledArray?.reduce((total, count) => total + count, 0);
            setTotalLastYearEnrolled(totalEnrolledArray);

            setTotalEnrolledStudents(totalEnrolledSum);

            setIsLoading(false);
        }
    }, [students, selectedFilter, setTotalStudents, setTotalEnrolledStudents]);

    ////// overall total vs enrolled students

    useEffect(() => {
        if (selectedFilter === "Overall" && students) {

            // Find the earliest and latest dates in the dataset
            const dates = students.map(student => new Date(student.dateCreated));
            const earliestDate = new Date(Math.min(...dates));
            const latestDate = new Date(Math.max(...dates));

            const monthNames = [];
            const monthsStartDate = [];

            let currentDate = new Date(earliestDate);
            while (currentDate <= latestDate) {
                const monthName = currentDate.toLocaleString('default', { month: 'long' });
                const year = currentDate.getFullYear();
                const monthYear = `${monthName} (${year})`;
                monthNames.push(monthYear);
                monthsStartDate.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            const studentCountByMonth = monthsStartDate.map((startDate, index) => {
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(endDate.getDate() - 1);

                return students.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate >= startDate && studentDate <= endDate;
                }).length;
            });

            setOverallMonthsArr(monthNames);
            setTotalStudentsOverall(studentCountByMonth);

            const totalStudentsSum = studentCountByMonth.reduce((total, count) => total + count, 0);
            setTotalStudents(totalStudentsSum);

            const totalEnrolledArray = monthsStartDate.map((startDate, index) => {
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(endDate.getDate() - 1);

                return students.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate >= startDate && studentDate <= endDate && student?.courses && student.courses.length > 0 && student.role === "user";
                }).length;
            });

            const totalEnrolledSum = totalEnrolledArray.reduce((total, count) => total + count, 0);
            setTotalOverallEnrolled(totalEnrolledArray);
            setTotalEnrolledStudents(totalEnrolledSum);
            setIsLoading(false);
        }
    }, [students, selectedFilter, setTotalStudents, setTotalEnrolledStudents]);

    //// custom total vs enrolled students
    useEffect(() => {
        if (selectedFilter === "Custom date" && fromDate && toDate && students) {

            const fromDateTime = new Date(fromDate);
            const toDateTime = new Date(toDate);

            // Check if fromDate is before toDate
            if (fromDateTime.getTime() > toDateTime.getTime()) {
                // Handle invalid date range
                console.error("Invalid date range!");
                setIsLoading(false);
                return;
            }

            // Filter students based on the custom date range
            const filteredStudents = students.filter(student => {
                const studentDate = new Date(student.dateCreated);
                return studentDate >= fromDateTime && studentDate <= toDateTime;
            });

            const days = [];
            const currentDate = new Date(fromDateTime);
            while (currentDate <= toDateTime) {
                days.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const studentCountByDay = days.reduce((acc, day) => {
                acc[day.toDateString()] = filteredStudents.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString();
                }).length;
                return acc;
            }, {});

            const dayAndStudentCountArray = days.map(day => ({
                day: day.toLocaleDateString('en-US'),
                totalStudents: studentCountByDay[day.toDateString()] || 0
            }));

            const dayArr = dayAndStudentCountArray.map(item => item.day);
            const totalStudentsPerDay = dayAndStudentCountArray.map(item => item.totalStudents);

            const totalStudentsSum = totalStudentsPerDay.reduce((total, count) => total + count, 0);

            setCustomDayArr(dayArr);
            setTotalStudentsCustom(totalStudentsPerDay);
            setTotalStudents(totalStudentsSum);

            const totalEnrolledArray = days.map(day => {
                return filteredStudents.filter(student => {
                    const studentDate = new Date(student.dateCreated);
                    return studentDate.toDateString() === day.toDateString() && student?.courses && student.courses.length > 0 && student.role === "user";
                }).length;
            });

            const totalEnrolledSum = totalEnrolledArray.reduce((total, count) => total + count, 0);

            setTotalCustomEnrolled(totalEnrolledArray);
            setTotalEnrolledStudents(totalEnrolledSum);

            setIsLoading(false);
        }
    }, [students, selectedFilter, fromDate, toDate, setTotalStudents, setTotalEnrolledStudents]);


    useEffect(() => {
        //total students
        let dataValue = dayArr;
        let dataTotalValues = totalStudentsSevenDays;

        let dataTotalForEnrollValues = totalSevenDaysDayEnrolled;

        if (selectedFilter === "Last 7 Days") {
            //total students
            dataValue = dayArr;
            dataTotalValues = totalStudentsSevenDays;
            // enroll
            dataTotalForEnrollValues = totalSevenDaysDayEnrolled;

        }
        if (selectedFilter === "Last 30 Days") {
            //total students
            dataValue = lastMonthDayArr;
            dataTotalValues = totalStudentsLastMonth;
            // enroll
            dataTotalForEnrollValues = totalLastMonthEnrolled;

        }
        if (selectedFilter === "Last 11 Months") {
            //total students
            dataValue = monthsArr;
            dataTotalValues = totalStudentsLastYear;
            // enroll
            dataTotalForEnrollValues = totalLastYearEnrolled;

        }
        if (selectedFilter === "Overall") {
            //total students
            dataValue = overallMonthsArr;
            dataTotalValues = totalStudentsOverall;
            // enroll
            dataTotalForEnrollValues = totalOverallEnrolled;

        }
        if (selectedFilter === "Custom date") {
            //total students
            dataValue = customDayArr;
            dataTotalValues = totalStudentsCustom;
            // enroll
            dataTotalForEnrollValues = totalCustomEnrolled;

        }

        setChartData({

            series: [
                {
                    name: "Total Students",
                    data: dataTotalValues,
                },
                {
                    name: "Enrolled Students",
                    data: dataTotalForEnrollValues,
                },

            ],
            options: {
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [5, 7, 5],
                    curve: "straight",
                    dashArray: [0, 8, 5],
                },
                title: {
                    text: "",
                    align: "left",
                },
                legend: {
                    tooltipHoverFormatter: function (val, opts) {
                        return (
                            val +
                            ' - <strong>' +
                            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                            "</strong>"
                        );
                    },
                },
                markers: {
                    size: 0,
                    hover: {
                        sizeOffset: 6,
                    },
                },
                xaxis: {
                    categories: dataValue
                },
                tooltip: {
                    y: [
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " (mins)";
                                },
                            },
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " per session";
                                },
                            },
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val;
                                },
                            },
                        },
                    ],
                },
                grid: {
                    borderColor: "#f1f1f1",
                },
            },
        });

    }, [dayArr, totalStudentsSevenDays, totalSevenDaysDayEnrolled, selectedFilter, lastMonthDayArr, totalStudentsLastMonth, totalLastMonthEnrolled,
        monthsArr, totalStudentsLastYear, totalLastYearEnrolled, overallMonthsArr, totalStudentsOverall, totalOverallEnrolled, customDayArr, totalStudentsCustom, totalCustomEnrolled])

    return (
        <div>
            <h1 className="my-3 text-2xl font-bold">Total Students Vs Enrolled Students</h1>
            {isLoading && (
                <div className=" flex align-items-center my-5 py-5">
                    <CircularProgress className="w-full mx-auto" />
                </div>
            )}

            <div id="chart">
                {chartState && chartState.options && chartState.series && (
                    <ReactApexChart
                        options={chartState.options}
                        series={chartState.series}
                        type="line"
                        height={350}
                    />
                )}
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
