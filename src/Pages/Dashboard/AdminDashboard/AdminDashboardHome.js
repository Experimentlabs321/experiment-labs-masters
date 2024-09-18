import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
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
    if (userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo.organizationId}`
        )
        .then((response) => {
          setOrganization(response?.data || []);
        })
        .catch((error) => {
          console.error("Error fetching organization:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/dashboard/organizationsId/${userInfo.organizationId}`
        )
        .then((response) => {
          if (response?.data) {
            setItemDetails(response.data);
          } else {
            setItemDetails([]); // Set to empty array if no data
          }
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
          setItemDetails([]); // Set to empty array on error
        });
    }
  }, [userInfo]);

  return (
    <Layout>
      <div className="w-[97%] mx-auto">
        {isLoading ? (
          <div className="flex align-items-center my-5 py-5">
            <CircularProgress className="w-full mx-auto" />
          </div>
        ) : (
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #D9D9D9",
              background:
                "linear-gradient(91deg, #4A56A9 11.84%, #4250AC 78.46%)",
            }}
            className="lg:flex items-center justify-between lg:mt-[10px] mt-24 lg:ps-[40px] py-5"
          >
            <div className="lg:ms-10 flex items-center justify-center">
              <img
                className="w-[150px]"
                src={organization?.org_logo}
                alt="Organization Logo"
              />
            </div>

            <div className="lg:me-[100px]">
              <p className="text-[#E9E9E9] text-[20px] lg:text-[40px] font-normal text-center">
                {itemDetails?.welcome || "Welcome"},
              </p>
              <p className="text-[#E9E9E9] text-[20px] lg:text-[40px] text-center font-bold mt-[6px]">
                {organization?.organizationName}
              </p>
            </div>
          </div>
        )}

        <AdminStatistics itemDetails={itemDetails} />
      </div>
    </Layout>
  );
};

export default AdminDashboardHome;
