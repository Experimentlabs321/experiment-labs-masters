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




    const [selectedFilter, setSelectedFilter] = useState('Year');

    const [chartState, setChartData] = useState();
    //total students
    const [yearsArray, setYearsRevenueArray] = useState([]);
    const [totalValuesArray, setTotalValuesYearRevenueArray] = useState([]);

    const [monthsRevenueArray, setMonthsRevenueArray] = useState([]);
    const [monthlyValuesRevenueArray, setMonthlyValuesRevenueArray] = useState([]);



    //for year total revenue
    useEffect(() => {
        if (selectedFilter === "Year" && enrolledStudents) {
            Loading();
    
            // Extract years and paidAmount from the courses array
            const courseYears = enrolledStudents.flatMap(student => {
                return student.courses.map(course => ({
                    year: new Date(course.enrollDate).getFullYear().toString(),
                    paidAmount: course.paidAmount || 0
                }));
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
    
            // Extract unique years
            const uniqueYears = Array.from(new Set(courseYears.map(course => course.year)));
    
            // Calculate previous, current, and next year counts
            const years = uniqueYears.flatMap(year => {
                const previousYear = (parseInt(year) - 1).toString();
                const nextYear = (parseInt(year) + 1).toString();
                return [previousYear, year, nextYear];
            }).filter(year => !isNaN(parseInt(year)));
    
            // Convert grouped data to arrays for TotalValuesYearRevenueArray
            const paidAmountSumEachYear = years.map(year => groupedData[year]?.paidAmountSum || 0);
    
            setYearsRevenueArray(years);
            setTotalValuesYearRevenueArray(paidAmountSumEachYear);
    
            Loading().close();
        }
    }, [enrolledStudents, selectedFilter]);
    
    // for month total revenue
    useEffect(() => {
        if (selectedFilter === "Month" && enrolledStudents) {
            Loading();
    
            const currentYear = new Date().getFullYear();
    
            // Create an array of 12 months for the current year
            const months = Array.from({ length: 12 }, (_, index) => {
                const monthIndex = index + 1;
                return new Date(currentYear, index, 1).toLocaleString('en-US', { month: 'long' });
            });
    
            // Extract months and paidAmount from the courses array
            const courseMonths = enrolledStudents.flatMap(student => {
                return student.courses.map(course => ({
                    month: new Date(course.enrollDate).toLocaleString('en-US', { month: 'long' }),
                    paidAmount: course.paidAmount || 0
                }));
            });
    
            // Group data by month and calculate the sum of paidAmount for each month
            const groupedData = courseMonths.reduce((acc, current) => {
                const month = current.month;
                const paidAmount = current.paidAmount;
    
                if (!acc[month]) {
                    acc[month] = {
                        month: month,
                        paidAmountSum: 0
                    };
                }
    
                acc[month].paidAmountSum += paidAmount;
    
                return acc;
            }, {});
    
            // Set revenue count for each month of the current year
            const monthlyRevenueCount = months.map(month => groupedData[month]?.paidAmountSum || 0);
    
            setMonthsRevenueArray(months);
            setMonthlyValuesRevenueArray(monthlyRevenueCount);
    
            Loading().close();
        }
    }, [enrolledStudents, selectedFilter]);
    
    


    console.log(monthsRevenueArray)
    console.log(monthlyValuesRevenueArray)


    useEffect(() => {
        //total revenue for year
        let dataValue = yearsArray;
        let dataTotalValues = totalValuesArray;
        
        // total revenue for month


        if (selectedFilter === "Year") {
            //total revenue
            dataValue = yearsArray;
            dataTotalValues = totalValuesArray;
         

        }
        if (selectedFilter === "Month") {
            dataValue = monthsRevenueArray;
            dataTotalValues= monthlyValuesRevenueArray;

        }

        setChartData({

            series: [
                {
                    name: "Total Revenue",
                    data: dataTotalValues,
                },
                {
                    name: "Total Discount",
                    data: [],
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

    }, [selectedFilter, yearsArray, totalValuesArray,monthlyValuesRevenueArray,monthsRevenueArray ])



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
