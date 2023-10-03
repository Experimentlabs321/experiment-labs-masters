//RedemptionCongratulation

import React, { useContext } from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import NotificationIconMobile from "../../../assets/Dashboard/NotificationIconMobile.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import Congratulation from "../../../assets/Dashboard/Congratulation.png";
import SearchIconMobile from "../../../assets/Dashboard/SearchIconMobile.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";


const RedemptionCongratulation = ({ setState, state, redemptionProduct }) => {
    console.log(redemptionProduct);
    const { userInfo } = useContext(AuthContext)
    console.log(userInfo)
    return (
        <div className="py-[65px] px-4">
            <div className="hidden lg:flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[30px] font-[700]">
                        Redemption of " {redemptionProduct?.redemptionItemName} "
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
            <div className="mt-[20px] lg:mt-[50px] flex justify-between items-center">
                <div>
                  {/*   {state === "Points statistics" ? (
                        <button
                            // style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
                            className={`bg-[#3E4DAC] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-white text-[8px] lg:text-[15px] font-[700] z-[1] mr-[16px] lg:mr-[32px] shadow-[0px_3px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                        >
                            Points statistics
                        </button>
                    ) : (
                        <button
                            onClick={() => setState("Points statistics")}
                            className={`bg-[#F8F9FE] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-[8px] lg:text-[15px] font-[700] z-[1] border mr-[16px] lg:mr-[32px]`}
                        >
                            Points statistics
                        </button>
                    )} */}
                    {state === "Redemption Congratulation" ? (
                        <button
                            // style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
                            className={`bg-[#3E4DAC] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-white text-[8px] lg:text-[15px] font-[700] z-[1] mr-[16px] lg:mr-[32px] shadow-[0px_3px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                        >
                            Redeem gifts
                        </button>
                    ) : (
                        <button
                            onClick={() => setState("Redeem gifts")}
                            className={`bg-[#F8F9FE] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-[8px] lg:text-[15px] font-[700] z-[1] border mr-[16px] lg:mr-[32px]`}
                        >
                            Redeem gifts
                        </button>
                    )}
                </div>
                <div className="flex lg:hidden items-center">
                    <img
                        className="mb-[-20px]"
                        src={SearchIconMobile}
                        alt="NotificationIcon"
                    />
                    <img
                        className="mb-[-20px]"
                        src={NotificationIconMobile}
                        alt="NotificationIcon"
                    />
                </div>
            </div>
            <div className="block lg:hidden my-[20px]">
                <div>
                    <h1 className=" text-[14px] lg:text-[30px] font-[700]">
                        Redemption of " {redemptionProduct?.redemptionItemName} "
                    </h1>
                    <h1 className="text-[#AAA] text-[8px] lg:text-[15px]">
                        Use the points you have earned to redeem what you want
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 ">

                <div className="lg:flex gap-10 items-center mt-10">
                    <img src={Congratulation} alt="image" />
                    <p className="text-3xl font-bold mt-5 lg:mt-0">{userInfo.name},congratulations. The "{redemptionProduct?.redemptionItemName}" is available to you.</p>

                </div>

                <div className="flex lg:mx-20  items-center justify-between border-y-2 border-[#B1B8D0] lg:mr-[140px] mt-[40px] lg:mt-[30px] py-[30px]">
                    <div className="flex gap-2 lg:gap-10 items-center">
                        <img className="h-[100px] lg:h-[200px]" src={redemptionProduct?.selectedIcon} alt="icon" />
                        <div>
                            <p className="text-lg font-bold">{redemptionProduct?.redemptionItemName}</p>
                            <p className="text-[#979797] text-[6px] lg:text-[11px] font-[400] max-w-[190px]">{redemptionProduct?.description}</p>

                        </div>
                    </div>
                  
                    <div className="lg:w-[160px]">
                    <Link to={redemptionProduct?.redemptionLink}
                        
                        className="w-[100px] lg:w-[160px] bg-[#6055ff] rounded-full lg:rounded-[10px] py-2 px-10 text-[12px] lg:text-[15px] font-[700]">
                        View
                    </Link>
                        {/* <Link to='' className=" lg:w-[160px] bg-[#FF557A] rounded-full lg:rounded-[10px] py-2 text-[12px] lg:text-[15px] font-[700]"  >View</Link> */}
                    </div>
                </div>





                <div className="flex lg:justify-end gap-5  mt-10 lg:mt-[27px] mb-[20px] lg:mb-0">
                    <button
                        onClick={() => setState("Redeem gifts")}
                        className="w-[100px] lg:w-[160px] bg-[#FF557A] rounded-full lg:rounded-[10px] py-2 px-4 text-[12px] lg:text-[15px] font-[700]">
                        Back
                    </button>
                    <button className="w-[200px] lg:w-[200px] bg-[#FF557A] rounded-full lg:rounded-[10px] py-2 text-[12px] lg:text-[15px] font-[700]">
                    Go back to the Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RedemptionCongratulation;
