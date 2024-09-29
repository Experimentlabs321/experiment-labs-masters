import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const DeviceLimit = ({ maxDeviceCount, setMaxDeviceCount, orgData }) => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/limitDevice/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          // console.log(response)
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    const orgInfo = {
      maxDeviceCount,
    };
    // console.log("Data ==========>",orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      Swal.fire({
        title: itemDetails?.updatedSuccessfully
          ? itemDetails?.updatedSuccessfully
          : "Updated successfully!",
        icon: "success",
      });
    }
  };

  return (
    <div className="px-4 mt-4">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex gap-10">
          <div>
            <label
              htmlFor="textInput"
              className="block text-lg font-semibold text-gray-700"
            >
              {itemDetails?.deviceLimit
                ? itemDetails?.deviceLimit
                : "Device Limit"}
            </label>
            <div className="flex gap-3 items-center mt-1">
              <div
                onClick={() => setMaxDeviceCount(+maxDeviceCount + 1)}
                className="w-[40px] h-[40px] border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-center flex justify-center items-center cursor-pointer"
              >
                <span className="text-2xl font-bold">+</span>
              </div>
              <input
                type="text"
                value={maxDeviceCount}
                className="w-[40px] h-[40px] border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-center"
              />
              <div
                onClick={() =>
                  setMaxDeviceCount(
                    +maxDeviceCount > 0 ? +maxDeviceCount - 1 : 0
                  )
                }
                className="w-[40px] h-[40px] border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-center flex justify-center items-center cursor-pointer"
              >
                <span className="text-2xl font-bold">-</span>
              </div>
            </div>
          </div>
        </div>
        <input
          className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg cursor-pointer"
          value={itemDetails?.save ? itemDetails?.save : "Save"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default DeviceLimit;
