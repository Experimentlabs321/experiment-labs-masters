import React from 'react';

const BatchInfoTable = ({ batches }) => {
    // console.log(batches);
    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4">Batch Information</h2>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-800 text-left text-gray-100 uppercase text-sm tracking-wider">
                        <th className="py-3 px-5">Batch Name</th>
                        <th className="py-3 px-5">Course Name</th>
                        <th className="py-3 px-5">Batch Price</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map((batch) => (
                        <tr key={batch._id} className="border-b border-gray-600 text-left tracking-wider">
                            <td className="py-5 px-5">{batch.batchName}</td>
                            <td className="py-5 px-5">{batch.courseInfo ? batch.courseInfo.courseFullName : 'N/A'}</td>
                            <td className="py-5 px-5">{batch.price ? batch.price+"₹": 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BatchInfoTable;
