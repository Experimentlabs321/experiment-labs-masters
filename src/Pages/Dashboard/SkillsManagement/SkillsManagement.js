import React from "react";
import Layout from "../Layout";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import image1 from "../../../assets/SkillsManagement/Image1.png";
import Image2 from "../../../assets/SkillsManagement/Image2.png";
import man from "../../../assets/userManagement/man.png";
import money from "../../../assets/userManagement/money.png";

const SkillsManagement = () => {
  return (
    <div>
      <Layout>
        <div className="flex items-center justify-center gap-7 pt-20 lg:pt-10">
          <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">
            Skills Management
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
        <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-7 px-7">
          <Link
            to="/skillsCreations"
            className="WithMedia w-full h-fit p-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-4 inline-flex"
          >
            <div className="CardTop self-stretch justify-start items-start gap-4 inline-flex">
              <img
                className="Image w-40 h-44 relative rounded-lg"
                src={image1}
                alt=""
              />
              <div className="Content grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="CardTitle self-stretch text-black text-[24px] font-normal leading-normal">
                  Skills Creations
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
            to="/skillsImprovementEngine"
            className="WithMedia w-full h-fit p-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-4 inline-flex"
          >
            <div className="CardTop self-stretch justify-start items-start gap-4 inline-flex">
              <img
                className="Image w-40 h-44 relative rounded-lg"
                src={Image2}
                alt=""
              />
              <div className="Content grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="CardTitle self-stretch text-black text-[24px] font-normal leading-normal">
                  Skills Improvement Engine
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

export default SkillsManagement;
