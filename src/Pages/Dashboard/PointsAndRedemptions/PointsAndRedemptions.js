import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import Console from "../../../assets/userManagement/console.png";
import man from "../../../assets/userManagement/man.png";
import money from "../../../assets/userManagement/money.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const PointsAndRedemptions = () => {
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  console.log(orgData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    if (orgData?._id) {
      const orgInfo = { ...orgData };
      orgInfo.showPointsAndRedemptions = !orgData?.showPointsAndRedemptions;
      delete orgInfo._id;
      console.log("Data ==========>", orgInfo);

      const updateOrg = await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${orgData?._id}`,
        orgInfo
      );

      if (updateOrg?.data?.acknowledged) {
        setOrgData({ _id: orgData?._id, ...orgInfo });
        toast.success(
          "Visibility of point and redemptions edited Successfully"
        );
        // event.target.reset();
      }
    }
  };

  return (
    <div>
      <Layout>
        <div className="flex items-center justify-center gap-7 mt-20 lg:mt-10">
          <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">
            Points And Redemptions
          </div>
          <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
            <input
              className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent"
              placeholder="Search"
            />
            <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
              <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
            </div>
          </div>
          <Badge badgeContent={1} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </div>

        <div className="my-8 px-7">
          <label
            htmlFor="showLabJourneyToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="showLabJourneyToggle"
                className="sr-only"
                checked={orgData?.showPointsAndRedemptions}
                onChange={(e) => {
                  handleSubmit(e);
                  setCount(count + 1);
                }}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  orgData?.showPointsAndRedemptions
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!orgData?.showPointsAndRedemptions ? "Show" : "Remove"} Points
              And Redemptions
            </div>
          </label>
        </div>

        <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-7 px-7">
          <Link
            to="/gamifiedSettings"
            className="WithMedia w-full h-fit p-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-4 inline-flex"
          >
            <div className="CardTop self-stretch justify-start items-start gap-4 inline-flex">
              <img
                className="Image w-40 h-44 relative rounded-lg"
                src={Console}
                alt=""
              />
              <div className="Content grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="CardTitle self-stretch text-black text-[24px] font-normal leading-normal">
                  Gamified Setting
                </div>
                <div className="CardDesription self-stretch">
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Card desription.{" "}
                  </span>
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    rhoncus imperdiet nisi.
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/earningLogics"
            className="WithMedia w-full h-fit p-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-4 inline-flex"
          >
            <div className="CardTop self-stretch justify-start items-start gap-4 inline-flex">
              <img
                className="Image w-40 h-44 relative rounded-lg"
                src={money}
                alt=""
              />
              <div className="Content grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="CardTitle self-stretch text-black text-[24px] font-normal leading-normal">
                  Earning Logic
                </div>
                <div className="CardDesription self-stretch">
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Card desription.{" "}
                  </span>
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    rhoncus imperdiet nisi.
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/redemptionLogics"
            className="WithMedia w-full h-fit p-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-4 inline-flex"
          >
            <div className="CardTop self-stretch justify-start items-start gap-4 inline-flex">
              <img
                className="Image w-40 h-44 relative rounded-lg"
                src={man}
                alt=""
              />
              <div className="Content grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="CardTitle self-stretch text-black text-[24px] font-normal leading-normal">
                  Redemption Logic
                </div>
                <div className="CardDesription self-stretch">
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Card desription.{" "}
                  </span>
                  <span className="text-zinc-900 text-[16px] font-normal leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    rhoncus imperdiet nisi.
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default PointsAndRedemptions;
