import React, { useEffect, useState } from "react";
import logo from "../../../../assets/Logos/Group 2859890.png";
import PersonProfilePic from "../../../../assets/Dashboard/PersonProfilePic.png";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import Aside from "./Aside";
import MenuIcon from "@mui/icons-material/Menu";
import WeekDetail from "../WeekDetail";
import Navbar from "../../Shared/Navbar";

const Week = () => {
  const [toggleButton, setToggleButton] = useState(
    JSON.parse(localStorage.getItem("toggleButton")) || true
  );
  const [screenSmall, setScreenSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const Role = localStorage.getItem("role");
  console.log(Role);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    if (windowWidth >= 1024) {
      setScreenSmall(false);
    } else {
      setScreenSmall(true);
    }
  }, [windowWidth]);

  const handleClick = () => {
    setToggleButton(!toggleButton);
  };
  useEffect(() => {
    // Save the toggleButton value to local storage
    localStorage.setItem("toggleButton", JSON.stringify(toggleButton));
  }, [toggleButton]);
  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
      <div>
        <div className=" font-sansita">
          <Navbar />
          <div className="flex overflow-hidden">
            <Aside
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
            />
            <button
              onClick={() => setToggleButton(true)}
              className="text-black bg-blue font-normal rounded-r-[15px] ml-[-10px] flex items-center px-[20px] pt-[10px] pb-[5px] absolute top-[95px] z-10  group"
            >
              <MenuIcon />{" "}
              <h1 className="ml-3 text-[12px] font-[500]">Open menu</h1>
            </button>
            <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div>
            <div
              id="main-content"
              className={`h-full w-full relative ${
                toggleButton ? "ml-[324px]" : ""
              }`}
            >
              <main className="min-h-[100vh]">
                <div className="">
                  <WeekDetail
                    toggleButton={toggleButton}
                    setToggleButton={setToggleButton}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Week;
