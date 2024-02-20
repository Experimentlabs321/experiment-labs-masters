//RevenueChart.js

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../../Shared/Loading/Loading";

import { CircularProgress } from "@mui/material";

const RevenueChart = ({

    selectedFilter,
    paidStudents,
    setTotalRevenue,
    fromDate,
    toDate

}) => {
    const [chartState, setChartData] = useState();
    const [isLoading, setIsLoading] = useState(true)
    //////// 7 days revenue vs discount ----------------------
    const [revenueSevenDaysArr, setRevenueSevenDaysArr] = useState([]);
    const [totalRevenueSevenDays, setTotalRevenueSevenDays] = useState([]);
    const [totalDiscountSevenDays, setTotalDiscountSevenDays] = useState([]);


    //////// 30 days revenue vs discount 
    const [lastMonthArr, setLastMonthArr] = useState([]);
    const [totalRevenueLastMonthDay, setTotalRevenueLastMonthDay] = useState([]);
    const [totalDiscountLastMonthDay, setTotalDiscountLastMonthDay] = useState([]);

    //////// 30 days revenue vs discount 
    const [monthNamesArr, setMonthNamesArr] = useState([]);
    const [totalRevenueLastYear, setTotalRevenueLastYear] = useState([]);
    const [totalDiscountLastYear, setTotalDiscountLastYear] = useState([]);

    //////// overall revenue vs discount 
    const [overallArr, setOverallArr] = useState([]);
    const [totalRevenueOverall, setTotalRevenueOverall] = useState([]);
    const [totalDiscountOverall, setTotalDiscountOverall] = useState([]);
    //////// overall revenue vs discount 
    const [customDate, setCustomDate] = useState([]);
    const [totalRevenueCustomDate, setTotalRevenueCustomDate] = useState([]);
    const [totalDiscountCustomDate, setTotalDiscountCustomDate] = useState([]);



    // 7 days for revenue vs discount
    useEffect(() => {
        if (selectedFilter === "Last 7 Days" && paidStudents) {


            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 6);

            const endDate = new Date();

            const days = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {

                const isoString = currentDate.toISOString();

                const dateString = isoString.substring(0, 10);
                days.push(dateString);

                currentDate.setDate(currentDate.getDate() + 1);
            }


            const revenueSums = Array(days.length).fill(0);
            const discountSums = Array(days.length).fill(0);

            let totalRevenueSum = 0;
            paidStudents?.forEach(student => {
                const studentDate = new Date(student?.paidAt);
                const studentRevenue = student?.paidAmount || 0;
                const studentDiscount = student?.discountAmount || 0;

                if (studentDate >= startDate && studentDate <= endDate) {

                    const index = days?.findIndex(day => day === studentDate.toISOString().substring(0, 10));


                    revenueSums[index] += studentRevenue;
                    discountSums[index] += studentDiscount;


                    totalRevenueSum += studentRevenue;
                }
            });

            setRevenueSevenDaysArr(days);
            setTotalRevenueSevenDays(revenueSums);
            setTotalDiscountSevenDays(discountSums);
            setTotalRevenue(totalRevenueSum);

            setIsLoading(false);
        }
    }, [selectedFilter, paidStudents, setTotalRevenue]);

    // last 30 days revenue vs discount
    useEffect(() => {
        if (selectedFilter === "Last 30 Days" && paidStudents) {

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 29);

            const endDate = new Date();

            const days = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {

                const isoString = currentDate.toISOString();

                const dateString = isoString.substring(0, 10);
                days.push(dateString);

                currentDate.setDate(currentDate.getDate() + 1);
            }


            const revenueSums = Array(days.length).fill(0);
            const discountSums = Array(days.length).fill(0);


            let totalRevenueSum = 0;


            paidStudents?.forEach(student => {
                const studentDate = new Date(student.paidAt);
                const studentRevenue = student.paidAmount || 0;
                const studentDiscount = student.discountAmount || 0;


                if (studentDate >= startDate && studentDate <= endDate) {

                    const index = days?.findIndex(day => day === studentDate.toISOString().substring(0, 10));


                    revenueSums[index] += studentRevenue;
                    discountSums[index] += studentDiscount;


                    totalRevenueSum += studentRevenue;
                }
            });

            setLastMonthArr(days);
            setTotalRevenueLastMonthDay(revenueSums);
            setTotalDiscountLastMonthDay(discountSums);
            setTotalRevenue(totalRevenueSum);

            setIsLoading(false);
        }
    }, [selectedFilter, paidStudents, setTotalRevenue]);

    // last 12 month revenue vs discount

    useEffect(() => {
        if (selectedFilter === "Last 11 Months" && paidStudents) {
            const currentDate = new Date();


            const monthsStartDate = [];


            const monthNames = [];


            for (let i = 11; i >= 0; i--) {

                const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                monthsStartDate.push(startDate);


                const monthName = startDate.toLocaleString('default', { month: 'long' });
                monthNames.push(monthName);
            }


            const revenueSums = Array(monthsStartDate.length).fill(0);
            const discountSums = Array(monthsStartDate.length).fill(0);


            let totalRevenueSum = 0;


            paidStudents?.forEach(student => {
                const studentDate = new Date(student.paidAt);
                const studentRevenue = student.paidAmount || 0;
                const studentDiscount = student.discountAmount || 0;


                for (let i = 0; i < monthsStartDate.length; i++) {
                    const startDate = monthsStartDate[i];
                    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

                    if (studentDate >= startDate && studentDate <= endDate) {
                        revenueSums[i] += studentRevenue;
                        discountSums[i] += studentDiscount;
                        totalRevenueSum += studentRevenue;
                        break;
                    }
                }
            });

            setMonthNamesArr(monthNames);
            setTotalRevenueLastYear(revenueSums);
            setTotalDiscountLastYear(discountSums);
            setTotalRevenue(totalRevenueSum);

            setIsLoading(false);
        }
    }, [selectedFilter, paidStudents, setTotalRevenue]);

    /// overall revenue vs discount
    useEffect(() => {
        if (selectedFilter === "Overall" && paidStudents) {

            const currentDate = new Date();
            const startDate = new Date(paidStudents?.reduce((earliest, student) => {
                const studentDate = new Date(student.paidAt);
                return earliest ? (studentDate < earliest ? studentDate : earliest) : studentDate;
            }, null));

            const monthsStartDate = [];
            const monthNames = [];

            let currentMonth = new Date(startDate);

            while (currentMonth <= currentDate) {
                monthsStartDate.push(new Date(currentMonth));
                const monthName = currentMonth.toLocaleString('default', { month: 'long' });
                const year = currentMonth.getFullYear();
                monthNames.push(`${monthName} (${year})`);
                currentMonth.setMonth(currentMonth.getMonth() + 1);
            }

            const revenueSums = Array(monthsStartDate.length).fill(0);
            const discountSums = Array(monthsStartDate.length).fill(0);
            let totalRevenueSum = 0;

            paidStudents?.forEach(student => {
                const studentDate = new Date(student.paidAt);
                const studentRevenue = student.paidAmount || 0;
                const studentDiscount = student.discountAmount || 0;

                for (let i = 0; i < monthsStartDate.length; i++) {
                    const startDate = monthsStartDate[i];
                    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

                    if (studentDate >= startDate && studentDate <= endDate) {
                        revenueSums[i] += studentRevenue;
                        discountSums[i] += studentDiscount;
                        totalRevenueSum += studentRevenue;
                        break;
                    }
                }
            });

            setOverallArr(monthNames);
            setTotalRevenueOverall(revenueSums);
            setTotalDiscountOverall(discountSums);
            setTotalRevenue(totalRevenueSum);

            setIsLoading(false);
        }
    }, [selectedFilter, paidStudents, setTotalRevenue]);

    // custom date 
    useEffect(() => {
        if (selectedFilter === "Custom date" && fromDate && toDate && paidStudents) {
        

            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);

            // Ensure the fromDate is before or equal to the toDate
            if (startDate > endDate) {
                console.error("Invalid date range!");
                setIsLoading(false);
                return;
            }

            const days = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                const isoString = currentDate.toISOString();
                const dateString = isoString.substring(0, 10);
                days.push(dateString);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const revenueSums = Array(days.length).fill(0);
            const discountSums = Array(days.length).fill(0);
            let totalRevenueSum = 0;

            paidStudents?.forEach(student => {
                const studentDate = new Date(student.paidAt);
                const studentRevenue = student.paidAmount || 0;
                const studentDiscount = student.discountAmount || 0;

                if (studentDate >= startDate && studentDate <= endDate) {
                    const index = days.findIndex(day => day === studentDate.toISOString().substring(0, 10));
                    revenueSums[index] += studentRevenue;
                    discountSums[index] += studentDiscount;
                    totalRevenueSum += studentRevenue;
                }
            });

            setCustomDate(days);
            setTotalRevenueCustomDate(revenueSums);
            setTotalDiscountCustomDate(discountSums);
            setTotalRevenue(totalRevenueSum);

            setIsLoading(false);
        }
    }, [selectedFilter, fromDate, toDate, paidStudents, setTotalRevenue]);




    //----------chart-------//

    useEffect(() => {
        //total revenue for year
        let dataValue = revenueSevenDaysArr;
        let dataTotalValues = totalRevenueSevenDays;
        let dataDiscountValue = totalDiscountSevenDays;

        // total revenue for month


        if (selectedFilter === "Last 7 Days") {
            //total revenue
            dataValue = revenueSevenDaysArr;
            dataTotalValues = totalRevenueSevenDays;
            //total discount
            dataDiscountValue = totalDiscountSevenDays;


        }
        if (selectedFilter === "Last 30 Days") {
            dataValue = lastMonthArr;
            dataTotalValues = totalRevenueLastMonthDay;

            //total discount
            dataDiscountValue = totalDiscountLastMonthDay;

        }
        if (selectedFilter === "Last 11 Months") {
            dataValue = monthNamesArr;
            dataTotalValues = totalRevenueLastYear;

            //total discount
            dataDiscountValue = totalDiscountLastYear;

        }
        if (selectedFilter === "Overall") {
            dataValue = overallArr;
            dataTotalValues = totalRevenueOverall;

            //total discount
            dataDiscountValue = totalDiscountOverall;

        }
        if (selectedFilter === "Custom date") {
            dataValue = customDate;
            dataTotalValues = totalRevenueCustomDate;

            //total discount
            dataDiscountValue = totalDiscountCustomDate;

        }

        setChartData({

            series: [
                {
                    name: "Total Revenue",
                    data: dataTotalValues,
                },
                {
                    name: "Total Discount",
                    data: dataDiscountValue,
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

    }, [revenueSevenDaysArr,
        totalRevenueSevenDays,
        totalDiscountSevenDays,
        selectedFilter,
        lastMonthArr,
        totalRevenueLastMonthDay,
        totalDiscountLastMonthDay,
        monthNamesArr,
        totalRevenueLastYear,
        totalDiscountLastYear, totalRevenueOverall, overallArr, totalDiscountOverall, customDate, totalRevenueCustomDate,
        totalDiscountCustomDate])



    return (
        <div>
            <h1 className="my-3 mt-5 text-2xl font-bold">Total Revenue Vs Total Discount</h1>
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

export default RevenueChart;
