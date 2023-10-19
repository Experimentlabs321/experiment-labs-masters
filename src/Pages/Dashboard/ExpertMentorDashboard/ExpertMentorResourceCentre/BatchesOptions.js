import React from "react";

const BatchesOptions = ({ batches, setSelectedBatchId }) => {
  return (
    <div>
      <select
        className=" py-3 px-5 text-[#676767] text-lg font-semibold"
        name=""
        id=""
        style={{
          borderRadius: "8px",
          background: "#F8F9FE",
          boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
        }}
        onChange={(e) => setSelectedBatchId(e.target.value)}
      >
        {batches?.length > 0 && <option>Select a Batch</option>}
        {batches?.length > 0 ? (
          batches?.map((batch) => (
            <option key={batch.batchId} value={batch?._id}>
              {batch.batchName}
            </option>
          ))
        ) : (
          <option value="">No batches</option>
        )}
      </select>
    </div>
  );
};

export default BatchesOptions;
