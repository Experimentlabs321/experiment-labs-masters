//AdminDashboardHome
import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import adminDas from "../../../assets/Dashboard/adminDash.png";
import AdminStatistics from "./AdminStatistics";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";

const AdminDashboardHome = () => {
  const { userInfo } = useContext(AuthContext);
  const [organization, setOrganization] = useState();

  useEffect(() => {
    Loading();
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrganization(response?.data);
      })
      .catch((error) => console.error(error));
    Loading().close();
  }, [userInfo]);
  console.log(organization);
  return (
    <div className="w-[97%] mx-auto">
      <Layout>
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
              Welcome,
            </p>
            <p className="text-[#E9E9E9] text-[20px] lg:text-[40px] text-center font-bold mt-[6px]">
              {organization?.organizationName}
            </p>
          </div>
        </div>
        <AdminStatistics />
      </Layout>
    </div>
  );
};

export default AdminDashboardHome;
