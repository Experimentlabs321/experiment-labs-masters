//RevenueChart.js

import React, {
  useEffect,
  useState,
} from 'react';

import ReactApexChart from 'react-apexcharts';

import { CircularProgress } from '@mui/material';

const SalesAndRevenueChart = ({
  selectedFilter,
  paidStudents,
  setTotalRevenue,
  fromDate,
  toDate,
  selectedCourses,
  selectedBatches,
}) => {
  const [chartState, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //////// 7 days revenue vs discount ----------------------
  const [revenueSevenDaysArr, setRevenueSevenDaysArr] = useState([]);
  const [totalRevenueSevenDays, setTotalRevenueSevenDays] = useState([]);
  const [totalDiscountSevenDays, setTotalDiscountSevenDays] = useState([]);

  //////// 30 days revenue vs discount
  const [lastMonthArr, setLastMonthArr] = useState([]);
  const [totalRevenueLastMonthDay, setTotalRevenueLastMonthDay] = useState([]);
  const [totalDiscountLastMonthDay, setTotalDiscountLastMonthDay] = useState(
    []
  );

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
      paidStudents?.forEach((student) => {
        const studentDate = new Date(student?.paidAt);
        const studentRevenue = +student?.paidAmount || 0;
        const studentDiscount = +student?.discountAmount || 0;

        if (studentDate >= startDate && studentDate <= endDate) {
          const index = days?.findIndex(
            (day) => day === studentDate.toISOString().substring(0, 10)
          );

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

      paidStudents?.forEach((student) => {
        const studentDate = new Date(student.paidAt);
        const studentRevenue = +student.paidAmount || 0;
        const studentDiscount = +student.discountAmount || 0;

        if (studentDate >= startDate && studentDate <= endDate) {
          const index = days?.findIndex(
            (day) => day === studentDate.toISOString().substring(0, 10)
          );

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
        const startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        monthsStartDate.push(startDate);

        const monthName = startDate.toLocaleString("default", {
          month: "long",
        });
        monthNames.push(monthName);
      }

      const revenueSums = Array(monthsStartDate.length).fill(0);
      const discountSums = Array(monthsStartDate.length).fill(0);

      let totalRevenueSum = 0;

      paidStudents?.forEach((student) => {
        const studentDate = new Date(student.paidAt);
        const studentRevenue = +student.paidAmount || 0;
        const studentDiscount = +student.discountAmount || 0;

        for (let i = 0; i < monthsStartDate.length; i++) {
          const startDate = monthsStartDate[i];
          const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            0
          );

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
 /*  useEffect(() => {
    if (selectedFilter === "Overall" && paidStudents) {
      const currentDate = new Date();
      const startDate = new Date(
        paidStudents?.reduce((earliest, student) => {
          const studentDate = new Date(student.paidAt);
          return earliest
            ? studentDate < earliest
              ? studentDate
              : earliest
            : studentDate;
        }, null)
      );

      const monthsStartDate = [];
      const monthNames = [];

      let currentMonth = new Date(startDate);

      while (currentMonth <= currentDate) {
        monthsStartDate.push(new Date(currentMonth));
        const monthName = currentMonth.toLocaleString("default", {
          month: "long",
        });
        const year = currentMonth.getFullYear();
        monthNames.push(`${monthName} (${year})`);
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      const revenueSums = Array(monthsStartDate.length).fill(0);
      const discountSums = Array(monthsStartDate.length).fill(0);
      let totalRevenueSum = 0;

      paidStudents?.forEach((student) => {
        const studentDate = new Date(student.paidAt);
        const studentRevenue = +student.paidAmount || 0;
        const studentDiscount = +student.discountAmount || 0;

        for (let i = 0; i < monthsStartDate.length; i++) {
          const startDate = monthsStartDate[i];
          const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            0
          );

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
  }, [selectedFilter, paidStudents, setTotalRevenue]); */
  useEffect(() => {
    if (selectedFilter === "Overall" && paidStudents) {
      // Group paid students by year
      const studentsByYear = {};
      paidStudents.forEach(student => {
        const year = new Date(student.paidAt).getFullYear();
        if (!studentsByYear[year]) {
          studentsByYear[year] = [];
        }
        studentsByYear[year].push(student);
      });
  
      // Initialize arrays to store data for each year
      const years = Object.keys(studentsByYear);
      const totalRevenueByYear = [];
      const totalDiscountByYear = [];
      let totalRevenueSum = 0;
  
      // Calculate statistics for each year
      years.forEach(year => {
        const yearStudents = studentsByYear[year];
        const revenueSum = yearStudents.reduce((sum, student) => sum + (+student.paidAmount || 0), 0);
        const discountSum = yearStudents.reduce((sum, student) => sum + (+student.discountAmount || 0), 0);
  
        totalRevenueByYear.push(revenueSum);
        totalDiscountByYear.push(discountSum);
        totalRevenueSum += revenueSum;
      });
  
      // Set state variables
      setOverallArr(years);
      setTotalRevenueOverall(totalRevenueByYear);
      setTotalDiscountOverall(totalDiscountByYear);
      setTotalRevenue(totalRevenueSum);
  
      setIsLoading(false);
    }
  }, [selectedFilter, paidStudents, setTotalRevenue]);
  
  // custom date
  useEffect(() => {
    if (
      selectedFilter === "Custom date" &&
      fromDate &&
      toDate &&
      paidStudents
    ) {
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

      paidStudents?.forEach((student) => {
        const studentDate = new Date(student.paidAt);
        const studentRevenue = +student.paidAmount || 0;
        const studentDiscount = +student.discountAmount || 0;

        if (studentDate >= startDate && studentDate <= endDate) {
          const index = days.findIndex(
            (day) => day === studentDate.toISOString().substring(0, 10)
          );
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

  //   useEffect(() => {
  //     //total revenue for year
  //     let dataValue = revenueSevenDaysArr;
  //     let dataTotalValues = totalRevenueSevenDays;
  //     let dataDiscountValue = totalDiscountSevenDays;

  //     // total revenue for month

  //     if (selectedFilter === "Last 7 Days") {
  //       //total revenue
  //       dataValue = revenueSevenDaysArr;
  //       dataTotalValues = totalRevenueSevenDays;
  //       //total discount
  //       dataDiscountValue = totalDiscountSevenDays;
  //     }
  //     if (selectedFilter === "Last 30 Days") {
  //       dataValue = lastMonthArr;
  //       dataTotalValues = totalRevenueLastMonthDay;

  //       //total discount
  //       dataDiscountValue = totalDiscountLastMonthDay;
  //     }
  //     if (selectedFilter === "Last 11 Months") {
  //       dataValue = monthNamesArr;
  //       dataTotalValues = totalRevenueLastYear;

  //       //total discount
  //       dataDiscountValue = totalDiscountLastYear;
  //     }
  //     if (selectedFilter === "Overall") {
  //       dataValue = overallArr;
  //       dataTotalValues = totalRevenueOverall;

  //       //total discount
  //       dataDiscountValue = totalDiscountOverall;
  //     }
  //     if (selectedFilter === "Custom date") {
  //       dataValue = customDate;
  //       dataTotalValues = totalRevenueCustomDate;

  //       //total discount
  //       dataDiscountValue = totalDiscountCustomDate;
  //     }

  //     setChartData({
  //       series: [
  //         {
  //           name: "Total Revenue",
  //           data: dataTotalValues,
  //         },
  //         {
  //           name: "Total Discount",
  //           data: dataDiscountValue,
  //         },
  //       ],
  //       options: {
  //         chart: {
  //           height: 350,
  //           type: "line",
  //           zoom: {
  //             enabled: false,
  //           },
  //         },
  //         dataLabels: {
  //           enabled: false,
  //         },
  //         stroke: {
  //           width: [5, 7, 5],
  //           curve: "straight",
  //           dashArray: [0, 8, 5],
  //         },
  //         title: {
  //           text: "",
  //           align: "left",
  //         },
  //         legend: {
  //           tooltipHoverFormatter: function (val, opts) {
  //             return (
  //               val +
  //               " - <strong>" +
  //               opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
  //               "</strong>"
  //             );
  //           },
  //         },
  //         markers: {
  //           size: 0,
  //           hover: {
  //             sizeOffset: 6,
  //           },
  //         },
  //         xaxis: {
  //           categories: dataValue,
  //         },
  //         tooltip: {
  //           y: [
  //             {
  //               title: {
  //                 formatter: function (val) {
  //                   return val + " (mins)";
  //                 },
  //               },
  //             },
  //             {
  //               title: {
  //                 formatter: function (val) {
  //                   return val + " per session";
  //                 },
  //               },
  //             },
  //             {
  //               title: {
  //                 formatter: function (val) {
  //                   return val;
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //         grid: {
  //           borderColor: "#f1f1f1",
  //         },
  //       },
  //     });
  //   }, [
  //     revenueSevenDaysArr,
  //     totalRevenueSevenDays,
  //     totalDiscountSevenDays,
  //     selectedFilter,
  //     lastMonthArr,
  //     totalRevenueLastMonthDay,
  //     totalDiscountLastMonthDay,
  //     monthNamesArr,
  //     totalRevenueLastYear,
  //     totalDiscountLastYear,
  //     totalRevenueOverall,
  //     overallArr,
  //     totalDiscountOverall,
  //     customDate,
  //     totalRevenueCustomDate,
  //     totalDiscountCustomDate,
  //   ]);
  //----------chart-------//

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFilter || !selectedCourses || !paidStudents) return;

      const seriesData = [];
      const dataValue = []; // X-axis categories
      const totalRevenueData = []; // Total revenue for each course
      const totalDiscountData = []; // Total discount for each course

      // Logic to populate seriesData, dataValue, totalRevenueData, and totalDiscountData based on selectedFilter

      // For each course, calculate revenue and discount data
      selectedCourses.forEach((course) => {
        const courseRevenueData = [];
        const courseDiscountData = [];

        // Filter paid students for the current course
        let paidStudentsForCourse = paidStudents.filter(
          (student) => student?.courses[0]?.courseId === course._id
        );

        if (course?.selectedBatches && course?.selectedBatches[0]) {
          console.log("in");
          paidStudentsForCourse = paidStudentsForCourse.filter((student) =>
            course?.selectedBatches?.find(
              (batch) => batch?._id === student?.courses[0]?.batchId
            )
          );
        }

        // Calculate revenue and discount based on selected filter
        switch (selectedFilter) {
          case "Last 7 Days":
            calculateRevenueAndDiscountForDays(
              paidStudentsForCourse,
              7,
              courseRevenueData,
              courseDiscountData
            );
            break;
          case "Last 30 Days":
            calculateRevenueAndDiscountForDays(
              paidStudentsForCourse,
              30,
              courseRevenueData,
              courseDiscountData
            );
            break;
          case "Last 11 Months":
            calculateRevenueAndDiscountForMonths(
              paidStudentsForCourse,
              11,
              courseRevenueData,
              courseDiscountData
            );
            break;
          case "Overall":
            calculateOverallRevenueAndDiscount(
              paidStudentsForCourse,
              courseRevenueData,
              courseDiscountData
            );
            break;
          case "Custom date":
            calculateRevenueAndDiscountForCustomDate(
              paidStudentsForCourse,
              fromDate,
              toDate,
              courseRevenueData,
              courseDiscountData
            );
            break;
          default:
            break;
        }

        // Push course data to seriesData
        seriesData.push({
          name: course.courseFullName + " Revenue", // Course name
          data: courseRevenueData, // Revenue data for the course
        });
        seriesData.push({
          name: course.courseFullName + " Discount", // Course name with suffix to differentiate from revenue
          data: courseDiscountData, // Discount data for the course
        });
      });

      // Update chart data
      setChartData({
        series: seriesData,
        options: {
          // Chart options
        },
      });

      setIsLoading(false);
    };

    fetchData();
  }, [
    selectedFilter,
    selectedCourses,
    selectedBatches,
    paidStudents,
    fromDate,
    toDate,
  ]);

  // Helper function to calculate revenue and discount for a specific number of days
  const calculateRevenueAndDiscountForDays = (
    paidStudentsForCourse,
    days,
    courseRevenueData,
    courseDiscountData
  ) => {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - days + 1);

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const isoDateString = currentDate.toISOString().substring(0, 10);

      let dayRevenue = 0;
      let dayDiscount = 0;

      const paidStudentsForDay = paidStudentsForCourse.filter(
        (student) => student.paidAt.substring(0, 10) === isoDateString
      );

      paidStudentsForDay.forEach((student) => {
        dayRevenue += +student.paidAmount || 0;
        dayDiscount += +student.discountAmount || 0;
      });

      courseRevenueData.push(dayRevenue);
      courseDiscountData.push(dayDiscount);
    }
  };

  // Helper function to calculate revenue and discount for a specific number of months
  const calculateRevenueAndDiscountForMonths = (
    paidStudentsForCourse,
    months,
    courseRevenueData,
    courseDiscountData
  ) => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - months + 1,
      1
    );

    for (let i = 0; i < months; i++) {
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - months + i + 1,
        1
      );
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
      );

      let monthRevenue = 0;
      let monthDiscount = 0;

      paidStudentsForCourse.forEach((student) => {
        const studentDate = new Date(student.paidAt);
        if (studentDate >= startDate && studentDate <= endDate) {
          monthRevenue += +student.paidAmount || 0;
          monthDiscount += +student.discountAmount || 0;
        }
      });

      courseRevenueData.push(monthRevenue);
      courseDiscountData.push(monthDiscount);
    }
  };

  // Helper function to calculate overall revenue and discount
  const calculateOverallRevenueAndDiscount = (
    paidStudentsForCourse,
    courseRevenueData,
    courseDiscountData
  ) => {
    let overallRevenue = 0;
    let overallDiscount = 0;

    paidStudentsForCourse.forEach((student) => {
      overallRevenue += +student.paidAmount || 0;
      overallDiscount += +student.discountAmount || 0;
    });

    courseRevenueData.push(overallRevenue);
    courseDiscountData.push(overallDiscount);
  };

  // Helper function to calculate revenue and discount for custom date range
  const calculateRevenueAndDiscountForCustomDate = (
    paidStudentsForCourse,
    fromDate,
    toDate,
    courseRevenueData,
    courseDiscountData
  ) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const isoDateString = currentDate.toISOString().substring(0, 10);

      let dayRevenue = 0;
      let dayDiscount = 0;

      const paidStudentsForDay = paidStudentsForCourse.filter(
        (student) => student.paidAt.substring(0, 10) === isoDateString
      );

      paidStudentsForDay.forEach((student) => {
        dayRevenue += +student.paidAmount || 0;
        dayDiscount += +student.discountAmount || 0;
      });

      courseRevenueData.push(dayRevenue);
      courseDiscountData.push(dayDiscount);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  return (
    <div>
      <h1 className="my-3 mt-5 text-2xl font-bold">
        Total Revenue Vs Total Discount
      </h1>
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
            height={500}
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SalesAndRevenueChart;
