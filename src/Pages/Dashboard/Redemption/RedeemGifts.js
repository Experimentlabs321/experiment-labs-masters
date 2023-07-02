import React, { useState } from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CreateYourPortfolio from "../../../assets/Dashboard/CreateYourPortfolio.png";

import classNames from "classnames";
const cheaps = [
  "Skill support",
  "Training",
  "Software support",
  "Competition",
  "Networking events",
  "Counselling",
  "Domain",
  "Get featured",
  "Media coverage",
  "Vouchers",
  "Shadow internship",
];

const cardsData = [
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Execution support",
    description:
      "Redeem an hour with our faculty for your doubts and interaction.",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "No code support",
    description: "Redeem an hour of support for no code software",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Sales support",
    description:
      "Redeem an hour with our faculty for sales support of your product",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Presentation skill",
    description:
      "Redeem an hour with our faculty to build up your presentation skills",
    cheap: "Skill support",
  },
];

const RedeemGifts = ({ setState, state }) => {
  const [items, setItems] = useState(cheaps);
  const handleCheap = (index) => {
    const rest = items.slice(index, cheaps.length);
    const others = items.slice(0, index);
    const all = [...rest, ...others];
    // console.log(all);
    setItems(all);
  };
  return (
    <div className="py-[65px] px-4">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-[30px] font-[700]">
            What would you like to redeem?
          </h1>
          <h1 className="text-[#AAA] text-[15px]">
            Use the points you have earned to redeem what you want
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <img
              className="absolute top-[12px] left-[10px]"
              src={SearchIcon}
              alt="SearchIcon"
            />
            <input
              style={{
                boxShadow: "0px 15px 23px 0px rgba(149, 156, 225, 0.36)",
              }}
              className="rounded-[8px] bg-[#F8F9FE] py-[10px] pl-[35px] pr-[10px]"
              placeholder="Search"
              type="text"
            />
          </div>
          <img
            className="mb-[-20px]"
            src={NotificationIcon}
            alt="NotificationIcon"
          />
        </div>
      </div>
      <div className="mt-[50px]">
        {state === "Points statistics" ? (
          <button
            style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
            className={`bg-[#3E4DAC] py-[15px] px-[30px] rounded-[32px] text-white text-[12px] lg:text-[18px] font-[700] z-[1] mr-[32px]`}
          >
            Points statistics
          </button>
        ) : (
          <button
            onClick={() => setState("Points statistics")}
            className={`bg-[#F8F9FE] py-[15px] px-[30px] rounded-[32px] text-[12px] lg:text-[18px] font-[700] z-[1] border mr-[32px]`}
          >
            Points statistics
          </button>
        )}
        {state === "Redeem gifts" ? (
          <button
            style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
            className={`bg-[#3E4DAC] py-[15px] px-[30px] rounded-[32px] text-white text-[12px] lg:text-[18px] font-[700] z-[1]`}
          >
            Redeem gifts
          </button>
        ) : (
          <button
            onClick={() => setState("Redeem gifts")}
            className={`bg-[#F8F9FE] py-[15px] px-[30px] rounded-[32px] text-[12px] lg:text-[18px] font-[700] z-[1] border`}
          >
            Redeem gifts
          </button>
        )}
      </div>
      <div className=" max-w-full w-full">
        <ul className="flex flex-row space-x-4 mt-[30px] w-[100px]">
          {items?.map((cheap, index) => (
            <li
              onClick={() => handleCheap(index)}
              key={index}
              className={classNames(
                " w-fit cursor-pointer",
                {
                  "ml-4": index > 0,
                },
                `${
                  index === 0
                    ? "text-[#3E4DAC] text-[16px] font-[700] py-4 pr-4"
                    : "text-[#676767] text-[16px] font-[400] p-4"
                }`
              )}
            >
              <button className=" w-max flex flex-col items-center">
                {cheap}
                {index === 0 && (
                  <hr className="w-[50px] h-[4px] bg-[#3E4DAC] rounded-[12px] mt-[5px]" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          {/* <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
            <h1 className="text-[16px] font-[700] mt-[6px] max-w-[205px]">
              Create your portfolio
            </h1>
            <p className="text-[#979797] text-[11px] font-[400] max-w-[190px]">
              Redeem an hour with our faculty for your doubts and interaction.
            </p>
            <button
              className={`bg-[#F8F9FE] py-[7px] px-[15px] rounded-[32px] text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
            >
              Redeem now
            </button>
          </div> */}
        </div>
        <button className="absolute bottom-[30px] right-[25px] bg-[#FF557A] rounded-[10px] py-2 px-10 text-[15px] font-[700]">
          Next
        </button>
      </div>
    </div>
  );
};

export default RedeemGifts;
