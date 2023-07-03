import React from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";

const RedemptionProduct = ({ setState, state, redemptionProduct }) => {
  console.log(redemptionProduct);
  return (
    <div className="py-[65px] px-4">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-[30px] font-[700]">
            Redemption of {redemptionProduct?.name}
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
        {state === "Redemption product" ? (
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
    </div>
  );
};

export default RedemptionProduct;
