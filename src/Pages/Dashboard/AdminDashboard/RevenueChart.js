//RevenueChart.js


import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const RevenueChart = ({ overViewCount }) => {
    const { userInfo } = useContext(AuthContext);

    const [enrolledStudents, setEnrolledStudents] = useState();


    console.log(enrolledStudents)
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_SERVER_API}/api/v1/users/students/${userInfo?.organizationId}`
            )
            .then((response) => {

                const enrolledStudents = response?.data?.filter((student) => (student?.courses && student?.courses?.length > 0 && student?.role === "user"))
                setEnrolledStudents(enrolledStudents)


            })
            .catch((error) => console.error(error));
    }, [userInfo]);



    //////////////////

    const [selectedFilter, setSelectedFilter] = useState('Year');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');

    const [yearlyData, setYearlyData] = useState([]);
    const [yearlyEnrollData, setYearlyEnrollData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [monthlyEnrollData, setMonthlyEnrollData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        filterData();
    }, [selectedFilter, selectedYear, selectedMonth, selectedWeek]);

    const filterData = () => {
        if (selectedFilter === 'Year') {
            filterByYear(selectedYear);
        } else if (selectedFilter === 'Month') {
            filterByMonth(selectedMonth);
        }/*  else if (selectedFilter === 'Week') {
            filterByWeek(selectedWeek);
        } */
    };

    /// year 
    const filterByYear = (year) => {

        //enroll Student
        const yearFilteredEnrollData = enrolledStudents?.filter((student) => {
            const studentYear = new Date(student.dateCreated).getFullYear().toString();
            return year ? studentYear === year : true;
        });
        setYearlyEnrollData(yearFilteredEnrollData);


    };



    const filterByMonth = (month) => {

        const currentYear = new Date().getFullYear().toString();

        //enroll students
        const monthFilteredEnrollData = enrolledStudents?.filter((student) => {
            const studentYear = new Date(student.dateCreated).getFullYear().toString();
            const studentMonth = new Date(student.dateCreated).getMonth();
            return studentYear === currentYear && (month ? studentMonth === month : true);
        });
        setMonthlyEnrollData(monthFilteredEnrollData);


    };

    /*  const filterByWeek = (week) => {
         const weekFilteredData = students?.filter((student) => {
             const studentDay = new Date(student.dateCreated).getDay();
             return week ? week.includes(dayToString(studentDay)) : true;
         });
         setWeeklyData(weekFilteredData);
     };
 
     const dayToString = (day) => {
         const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
         return daysOfWeek[day];
     }; */

    const monthToString = (month) => {
        const monthsOfYear = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthsOfYear[month];
    };

    const getLocalizedDayNames = () => {
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            daysOfWeek.push(dayFormatter.format(new Date(2022, 0, i + 1))); // Assuming 2022 is not a leap year
        }
        return daysOfWeek;
    };

    /*    const currentWeek = getLocalizedDayNames()?.map((day) => ({
           day,
           count: weeklyData?.filter((student) => dayToString(new Date(student.dateCreated).getDay()) === day).length,
       })); */

    //  const availableMonths = Array.from(new Set(students?.map((student) => new Date(student.dateCreated).getMonth()))).sort((a, b) => a - b);



    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();


    const desiredMonths = [];
    for (let i = 0; i < 9; i++) {
        const month = (currentMonth - i + 12) % 12; // Ensure positive result for previous months
        desiredMonths.push(month);
    }

    console.log(desiredMonths);
    /*  const availableEnrollMonths = Array.from(new Set(enrolledStudents?.map((student) => new Date(student.dateCreated).getMonth())));
     console.log(availableEnrollMonths) */

    const availableWeeks = getLocalizedDayNames();


    ////////////////////////////////////////////////////////////////
    const [chartState, setChartData] = useState();
    //total students
    const [yearsArray, setYearsRevenueArray] = useState([]);
    const [totalValuesArray, setTotalValuesYearRevenueArray] = useState([]);
    //total enroll
    const [yearsForEnrollArray, setYearsForEnrollArray] = useState([]);
    const [totalValuesForEnrollArray, setTotalValuesYearForEnrollArray] = useState([]);

    //total students
    const [monthArray, setMonthArray] = useState([]);
    const [totalValuesMonthArray, setTotalValuesMonthArray] = useState([]);

    //Enroll students
    const [monthForEnrollArray, setMonthForEnrollArray] = useState([]);
    const [totalValuesMonthForEnrollArray, setTotalValuesMonthForEnrollArray] = useState([]);


    //for year
    useEffect(() => {
        if (selectedFilter === "Year" && enrolledStudents) {
            Loading();

            // Extract years and paidAmount from the courses array
            const courseYears = enrolledStudents?.map((student) => {
                return {
                    year: new Date(student.courses[0]?.enrollDate).getFullYear().toString(),
                    paidAmount: student.courses[0]?.paidAmount || 0
                };
            });

            // Group data by year and calculate the sum of paidAmount for each year
            const groupedData = courseYears.reduce((acc, current) => {
                const year = current.year;
                const paidAmount = current.paidAmount;

                if (!acc[year]) {
                    acc[year] = {
                        year: year,
                        paidAmountSum: 0
                    };
                }

                acc[year].paidAmountSum += paidAmount;

                return acc;
            }, {});

            // Extract years for the previous 3 years and the next 1 year
            const currentYear = new Date().getFullYear();
            const previous3Years = Array.from({ length: 3 }, (_, index) => (currentYear - index - 1).toString());
            const next1Year = (currentYear + 1).toString();

            // Filter grouped data for the previous 3 years and the next 1 year
            const filteredData = Object.keys(groupedData)
                .filter((year) => previous3Years.includes(year) || year === next1Year)
                .reduce((acc, year) => {
                    acc[year] = groupedData[year];
                    return acc;
                }, {});

            // Convert filtered data to arrays for YearsRevenueArray and TotalValuesYearRevenueArray
            const years = Object.keys(filteredData);
            const paidAmountSumEachYear = years.map((year) => filteredData[year].paidAmountSum);

            setYearsRevenueArray(years);
            setTotalValuesYearRevenueArray(paidAmountSumEachYear);

            Loading().close();
        }
    }, [enrolledStudents, selectedFilter]);







    //for month 
    /*    useEffect(() => {
           if(selectedFilter === "Month"){
            
           
              
               const namesForEnroll = availableMonths.map(month => monthToString(month));
               setMonthForEnrollArray(namesForEnroll);
   
               const valuesForEnroll = availableMonths?.map(month =>
                   monthlyData?.filter(student => new Date(student.dateCreated).getMonth() === month).length
               );
               setTotalValuesMonthForEnrollArray(valuesForEnroll);
             
   
           
           }
        
           
       }, [selectedFilter, monthlyData,]); */

    console.log(totalValuesArray)
    console.log(yearsArray)


    /// for week
    /* useEffect(() => {
     
      const today = new Date();
      const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  
      const studentsInCurrentWeek = students?.filter(student => {
        const studentDateCreated = new Date(student.dateCreated);
        return studentDateCreated >= currentWeekStart && studentDateCreated <= currentWeekEnd;
      });
  
     
      const dayCounts = {};
  
      
      studentsInCurrentWeek?.forEach(student => {
        const studentDate = new Date(student.dateCreated);
        const dayOfWeek = studentDate.getDay(); 
  
      
        const adjustedDay = (dayOfWeek + 6) % 7 + 1;
  
      
        if (dayCounts[adjustedDay]) {
          dayCounts[adjustedDay]++;
        } else {
          dayCounts[adjustedDay] = 1;
        }
      });
  
     
      const days = Object.keys(dayCounts).map(day => parseInt(day, 10));
      const studentCounts = Object.values(dayCounts);
  
      console.log('Days:', days);
      console.log('Student Counts:', studentCounts);
    }, [students]); */




    useEffect(() => {
        //total students
        let dataValue = yearsArray;
        let dataTotalValues = totalValuesArray;
        //enroll
        let dataForEnrollValue = yearsForEnrollArray;
        let dataTotalForEnrollValues = totalValuesForEnrollArray;

        if (selectedFilter === "Year") {
            //total students
            dataValue = yearsArray;
            dataTotalValues = totalValuesArray;
            // enroll
            dataForEnrollValue = yearsForEnrollArray;
            dataTotalForEnrollValues = totalValuesForEnrollArray

        }
        if (selectedFilter === "Month") {
            //total students
            dataValue = monthArray;
            dataTotalValues = totalValuesMonthArray;
            //enroll
            dataForEnrollValue = monthForEnrollArray;
            dataTotalForEnrollValues = totalValuesMonthForEnrollArray;

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

    }, [selectedFilter, yearsArray, totalValuesArray, yearsForEnrollArray, monthArray, monthForEnrollArray, totalValuesMonthArray, totalValuesMonthForEnrollArray, totalValuesForEnrollArray])



    return (
        <div>
            <h1 className="my-3 mt-5 text-2xl font-bold">Total Revenue Vs Total Discount</h1>
            <div className="mb-5 flex gap-5 items-center">
                <label>Select Filter:</label>
                <select className="p-2 border rounded" onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>

                    <option value="Year">Year</option>
                    <option value="Month">Month</option>
                    {/* <option value="Week">Week</option> */}
                </select>

                {/* P */}

                {/*   {selectedFilter === 'Week' && (
                    <div>
                      
                        <h3>Current Week</h3>
                        {currentWeek?.map((day) => (
                            <div key={day.day}>
                                {day.day} - Total Students: {day.count}
                            </div>
                        ))}
                    </div>
                )} */}
            </div>



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

export default RevenueChart;
