import React from 'react';

const BundleInfoTable = ({ bundles }) => {
    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4">Bundle Information</h2>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-800 text-left text-gray-100 uppercase text-sm tracking-wider">
                        <th className="py-3 px-5">Bundle Name</th>
                        <th className="py-3 px-5">Course Name</th>
                        <th className="py-3 px-5">Batch Name</th>
                        <th className="py-3 px-5">Bundle Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bundles.map((bundle, bundleIndex) => (
                        <>
                            {bundle.courses.map((course, courseIndex) => (
                                <tr key={`${bundle._id}-${courseIndex}`} className='border-b border-gray-600 text-left tracking-wider'>
                                    {/* Conditionally render the Bundle Name and Price only on the first row of each bundle */}
                                    {courseIndex === 0 ? (
                                        <>
                                            <td rowSpan={bundle.courses.length} className="border p-3">{bundle.bundleFullName}</td>
                                            <td className="border p-3">{course.courseInfo ? course.courseInfo.courseFullName : 'N/A'}</td>
                                            <td className="border p-3">{course.batchInfo ? course.batchInfo.batchName : 'N/A'}</td>
                                            <td rowSpan={bundle.courses.length} className="border p-3">{bundle.price ? bundle.price + "₹" : "N/A"}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-3">{course.courseInfo ? course.courseInfo.courseFullName : 'N/A'}</td>
                                            <td className="border p-3">{course.batchInfo ? course.batchInfo.batchName : 'N/A'}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default BundleInfoTable;
