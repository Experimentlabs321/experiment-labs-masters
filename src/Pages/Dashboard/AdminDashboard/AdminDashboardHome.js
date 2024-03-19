//AdminDashboardHome
import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import adminDas from "../../../assets/Dashboard/adminDash.png";
import AdminStatistics from "./AdminStatistics";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";

import { CircularProgress } from "@mui/material";

const AdminDashboardHome = () => {
  const { userInfo } = useContext(AuthContext);
  const [organization, setOrganization] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrganization(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);
  useEffect(() => {
    if (userInfo) {
      //  setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getItemDetailsByOrganizationAndName/dashboard/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          //    setAdminLoading(false);
        });
    }
    //  setAdminLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)
  //console.log(organization)
  return (
    <Layout>
      <div className="w-[97%] mx-auto">
        {isLoading && (
          <div className=" flex align-items-center my-5 py-5">
            <CircularProgress className="w-full mx-auto" />
          </div>
        )}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #D9D9D9",
            background:
              "linear-gradient(91deg, #4A56A9 11.84%, #4250AC 78.46%)",
          }}
          className=" lg:flex items-center justify-between mt-[10px] lg:ps-[40px] py-5 "
        >
          <div className="lg:ms-10 flex items-center justify-center">
            <img
              className="w-[150px]"
              src={organization?.org_logo}
              alt="icon"
            />
          </div>

          <div className="lg:me-[100px]">
            <p className="text-[#E9E9E9] text-[20px] lg:text-[40px] font-normal text-center ">
              {itemDetails?.welcome ? itemDetails?.welcome : "Welcome"},
            </p>
            <p className="text-[#E9E9E9] text-[20px] lg:text-[40px] text-center font-bold mt-[6px]">
              {organization?.organizationName}
            </p>
          </div>
        </div>
        <AdminStatistics itemDetails={itemDetails} />
      </div>
    </Layout>
  );
};

export default AdminDashboardHome;
