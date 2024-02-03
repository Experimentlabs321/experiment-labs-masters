// ApexChart.jsx
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const ApexChart = ({ overViewCount }) => {
    const { userInfo } = useContext(AuthContext);
    const [students, setStudents] = useState();
    const [enrolledStudents, setEnrolledStudents] = useState();

   // console.log(overViewCount)
    console.log(students)
   // console.log(enrolledStudents)
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_SERVER_API}/api/v1/users/students/${userInfo?.organizationId}`
            )
            .then((response) => {

                const enrolledStudents = response?.data?.filter((student)=>(student?.courses))
                setEnrolledStudents(enrolledStudents)
                setStudents(response?.data);

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
        //totalStudent
        const yearFilteredData = students?.filter((student) => {
            const studentYear = new Date(student.dateCreated).getFullYear().toString();
            return year ? studentYear === year : true;
        });
        setYearlyData(yearFilteredData);
        //enroll Student
        const yearFilteredEnrollData = enrolledStudents?.filter((student) => {
            const studentYear = new Date(student.dateCreated).getFullYear().toString();
            return year ? studentYear === year : true;
        });
        setYearlyEnrollData(yearFilteredEnrollData);
        

    };
     
 

    const filterByMonth = (month) => {

        const currentYear = new Date().getFullYear().toString();
        //total students
        const monthFilteredData = students?.filter((student) => {
            const studentYear = new Date(student.dateCreated).getFullYear().toString();
            const studentMonth = new Date(student.dateCreated).getMonth();
            return studentYear === currentYear && (month ? studentMonth === month : true);
        });
        setMonthlyData(monthFilteredData);

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

    const availableMonths = Array.from(new Set(students?.map((student) => new Date(student.dateCreated).getMonth()))).sort((a, b) => a - b);
    
    console.log(availableMonths)
    
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
    const [yearsArray, setYearsArray] = useState([]);
    const [totalValuesArray, setTotalValuesYearArray] = useState([]);
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
        if(selectedFilter === "Year"){
            Loading();
            //total students
            const years = Array.from(new Set(students?.map((student) => new Date(student.dateCreated).getFullYear().toString())));
            const totalValues = years?.map((year) => students?.filter((student) => new Date(student.dateCreated).getFullYear().toString() === year).length);
    
            setYearsArray(years);
            setTotalValuesYearArray(totalValues);

            //enrolled student
            const yearsForEnroll = Array.from(new Set(enrolledStudents?.map((student) => new Date(student.dateCreated).getFullYear().toString())));
            const totalForEnrollValues = years?.map((year) => enrolledStudents?.filter((student) => new Date(student.dateCreated).getFullYear().toString() === year).length);
    
            setYearsForEnrollArray(yearsForEnroll);
            setTotalValuesYearForEnrollArray(totalForEnrollValues);

            Loading().close();
        }
      
       
    }, [students,selectedFilter,enrolledStudents]);


   
    //for month 
    useEffect(() => {
        if(selectedFilter === "Month"){
         
          ///total Students
            const names = availableMonths.map(month => monthToString(month));
            setMonthArray(names);

            const values = availableMonths?.map(month =>
                monthlyData?.filter(student => new Date(student.dateCreated).getMonth() === month).length
            );
            setTotalValuesMonthArray(values);

            // enroll students
            const namesForEnroll = availableMonths.map(month => monthToString(month));
            setMonthForEnrollArray(namesForEnroll);

            const valuesForEnroll = availableMonths?.map(month =>
                monthlyData?.filter(student => new Date(student.dateCreated).getMonth() === month).length
            );
            setTotalValuesMonthForEnrollArray(valuesForEnroll);
          

        
        }
     
        
    }, [selectedFilter, monthlyData,availableMonths]);

    console.log(monthArray)
    console.log(totalValuesMonthArray)
    console.log(monthForEnrollArray)
    console.log(totalValuesMonthForEnrollArray)
    
  /// for week
  useEffect(() => {
    // Filter students for the current week
    const today = new Date();
    const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    const studentsInCurrentWeek = students?.filter(student => {
      const studentDateCreated = new Date(student.dateCreated);
      return studentDateCreated >= currentWeekStart && studentDateCreated <= currentWeekEnd;
    });

    // Initialize an object to store counts for each day
    const dayCounts = {};

    // Loop through students in the current week and categorize by day
    studentsInCurrentWeek?.forEach(student => {
      const studentDate = new Date(student.dateCreated);
      const dayOfWeek = studentDate.getDay(); // 0 for Sunday, 1 for Monday, and so on

      // Adjust dayOfWeek to make day 1 as Saturday
      const adjustedDay = (dayOfWeek + 6) % 7 + 1;

      // Increment count for the day
      if (dayCounts[adjustedDay]) {
        dayCounts[adjustedDay]++;
      } else {
        dayCounts[adjustedDay] = 1;
      }
    });

    // Separate the data into two arrays
    const days = Object.keys(dayCounts).map(day => parseInt(day, 10));
    const studentCounts = Object.values(dayCounts);

    console.log('Days:', days);
    console.log('Student Counts:', studentCounts);
  }, [students]);

 
     

     useEffect(() => {
        //total students
        let dataValue = yearsArray;
        let dataTotalValues = totalValuesArray;
        //enroll
        let dataForEnrollValue = yearsForEnrollArray;
        let dataTotalForEnrollValues = totalValuesForEnrollArray;

        if(selectedFilter === "Year"){
            //total students
            dataValue = yearsArray;
            dataTotalValues = totalValuesArray;
            // enroll
            dataForEnrollValue = yearsForEnrollArray;
            dataTotalForEnrollValues = totalValuesForEnrollArray

        }
        if(selectedFilter === "Month"){
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

    }, [selectedFilter, yearsArray, totalValuesArray, yearsForEnrollArray,monthArray,monthForEnrollArray,totalValuesMonthArray,totalValuesMonthForEnrollArray,totalValuesForEnrollArray]) 



    return (
        <div>
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

export default ApexChart;
