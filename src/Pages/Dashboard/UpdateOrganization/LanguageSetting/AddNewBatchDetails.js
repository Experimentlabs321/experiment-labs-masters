//AddNewBatchDetails.js

import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";

const AddNewBatchDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/addNewBatch/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          /*   if(response?.data==="Item with name not found"){
                        setAdminLoading(true);  
                    } */
          // console.log(response)
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)
  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/addNewBatch/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const newAddNewBatchName = form.addNewBatch?.value;
    const newEditBatchName = form.editBatch?.value;
    const newBatchNameName = form.batchName?.value;
    const newBatchStartingDateName = form.batchStartingDate?.value;
    const newBatchEndingDateName = form.batchEndingDate?.value;
    const newBatchPriceName = form.batchPrice?.value;
    const newAddName = form.add?.value;

    const itemDetail = {
      addNewBatch: newAddNewBatchName,
      editBatch: newEditBatchName,
      batchName: newBatchNameName,
      batchStartingDate: newBatchStartingDateName,
      batchEndingDate: newBatchEndingDateName,
      batchPrice: newBatchPriceName,
      add: newAddName,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/addNewBatch/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (item?.data === "Content Manage Sub Details updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Name added Successfully");
      form.reset();
    }
  };

  return (
    <div>
      {adminLoading ? (
        <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2 border p-4 rounded-xl">
          <div className=" grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Add New Batch</p>
              <input
                name="addNewBatch"
                defaultValue={itemDetails?.addNewBatch}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Edit Batch</p>
              <input
                name="editBatch"
                defaultValue={itemDetails?.editBatch}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Batch Name</p>
              <input
                name="batchName"
                defaultValue={itemDetails?.batchName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Batch Starting Date</p>
              <input
                name="batchStartingDate"
                defaultValue={itemDetails?.batchStartingDate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Batch Ending Date</p>
              <input
                name="batchEndingDate"
                defaultValue={itemDetails?.batchEndingDate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Batch Price</p>
              <input
                name="batchPrice"
                defaultValue={itemDetails?.batchPrice}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Add</p>
              <input
                name="add"
                defaultValue={itemDetails?.add}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNewBatchDetails;
