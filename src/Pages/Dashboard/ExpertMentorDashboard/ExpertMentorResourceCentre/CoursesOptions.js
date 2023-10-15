import React from 'react';

const CoursesOptions = ({courses, selectedCourseId, handleCourseChange}) => {
    return (
        <div>
            <select className="py-3 px-4 text-[#676767] text-lg font-semibold" name="" id=""
                style={{
                    borderRadius: "8px",
                    background: "#F8F9FE",
                    boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                }}
                value={selectedCourseId}
                onChange={handleCourseChange}
            >
                {
                    courses?.length > 0 &&
                    <option>Select an Option</option>
                }
                {
                    (courses?.length > 0 ?
                        courses?.map(course =>

                            <option key={course._id} value={course._id}>{course.courseFullName}</option>) :
                        <option value="">No Courses</option>)
                }
            </select>
        </div>
    );
};

export default CoursesOptions;