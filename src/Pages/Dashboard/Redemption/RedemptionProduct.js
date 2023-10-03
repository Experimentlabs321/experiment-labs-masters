import React, { useContext } from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import NotificationIconMobile from "../../../assets/Dashboard/NotificationIconMobile.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import SearchIconMobile from "../../../assets/Dashboard/SearchIconMobile.svg";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";


const RedemptionProduct = ({ setState, state, redemptionProduct }) => {
  console.log(redemptionProduct);
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);
  const totalPoints= localStorage.getItem("EarningTotalPoint")
  const handleRedemption = async (event) => {
    event.preventDefault();
    
 
  
    const newItem = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/redemptionAccess`,
        {
            organizationId: userInfo?.organizationId,
            userId: userInfo?._id,
            redemptionItemName : redemptionProduct.redemptionItemName,
            accessItem: {
              
              redemptionItemName : redemptionProduct.redemptionItemName,
              itemValue : redemptionProduct.itemValue,
              dateAndTime: new Date(),
            
            },
        }
    );


    if (newItem?.data?.acknowledged) {
        toast.success("Item added Successfully");
        setState("Redemption Congratulation")
        localStorage.setItem("EarningTotalPoint",totalPoints-redemptionProduct?.itemValue)
       
    }
    else if (newItem?.data?._id) {
        toast.success("Item added Successfully");
        setState("Redemption Congratulation")
        localStorage.setItem("EarningTotalPoint",totalPoints-redemptionProduct?.itemValue)
       
    }
   else if (!newItem?.data?._id) {
        toast.error("Item not added ");
       
    }
    else {
      toast.error("Item not added");
     
  }
    
    
    console.log(newItem?.data)
  
};


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
          {state === "Points statistics" ? (
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
          )}
          {state === "Redemption product" ? (
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
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className=" lg:col-span-2 flex items-center">
          <div className="w-full">
            <p className="text-[14px] lg:text-[18px] font-[500] ">
              Product summary (1)
            </p>
            <div className="flex items-center justify-between border-y-2 border-[#B1B8D0] lg:mr-[140px] mt-[15px] lg:mt-[30px] py-[30px]">
              <div className="flex gap-2 items-center">
                  <img className="h-[100px]" src={redemptionProduct?.selectedIcon} alt="icon"/>
                  <div>
                    <p className="text-lg font-bold">{redemptionProduct?.redemptionItemName}</p>
                    <p className="text-[#979797] text-[6px] lg:text-[11px] font-[400] max-w-[190px]">{redemptionProduct?.description}</p>
                    
                  </div>
              </div>
              <div>
                <p>Points : {redemptionProduct?.itemValue}</p>
              </div>
              <div>
                <button>Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 border lg:border-none border-[#B1B8D0] rounded-[23px] mt-[30px]">
          <h1 className="text-[12px] lg:text-[18px] font-[700] px-[20px] lg:px-0 pt-[20px] lg:pt-0 lg:mb-[30px]">
            Redemption summary
          </h1>
          <div className="lg:border border-[#B1B8D0] p-[20px]">
            <div className="flex justify-between text-[14px] lg:text-[16px] font-[600] mb-[15px] lg:mb-[30px] ">
              <p>Subtotal: </p>
              <p>{redemptionProduct?.itemValue}</p>
            </div>
            <div>
              <p className="text-[14px] lg:text-[16px] font-[600] mb-[10px] lg:mb-[20px] ">
                Product name:
              </p>
              <input
                className="border border-[#B1B8D0] w-full p-[10px] "
                type="text"
                defaultValue={redemptionProduct.redemptionItemName}
              />
              <hr className="my-[15px] lg:my-[20px] bg-[#B1B8D0] pt-[1px] " />
            </div>
            <div className="flex justify-between text-[14px] lg:text-[16px] font-[600] mb-[15px] lg:mb-[30px] ">
              <p>Total </p>
              <p>{redemptionProduct?.itemValue}</p>
            </div>
          </div>
          <div className="flex justify-evenly mt-0 lg:mt-[27px] mb-[20px] lg:mb-0">
            <button
            onClick={() => setState("Redeem gifts")}
            className="w-[100px] lg:w-[160px] bg-[#FF557A] rounded-full lg:rounded-[10px] py-2 text-[12px] lg:text-[15px] font-[700]">
              Back
            </button>
            
            <button
            onClick = {handleRedemption}
            //onClick={() => setState("Redemption Congratulation")}
            className="w-[100px] lg:w-[160px] bg-[#FF557A] rounded-full lg:rounded-[10px] py-2 text-[12px] lg:text-[15px] font-[700]">
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionProduct;
