import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import classNames from "classnames";
import { Link } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";

import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import NotificationIconMobile from "../../../assets/Dashboard/NotificationIconMobile.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import SearchIconMobile from "../../../assets/Dashboard/SearchIconMobile.svg";
import { AuthContext } from "../../../contexts/AuthProvider";

const RedeemGifts = ({
  setState,
  state,
  cheaps,
  cardsData,
  setRedemptionProduct,
  redemptionCollection,
}) => {
  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo)

  const [items, setItems] = useState([]);
  const [itemsLength, setItemsLength] = useState();
  const redemptionCollections = redemptionCollection;
  useEffect(() => {
    if (redemptionCollection) {
      const categoryName = [];
      redemptionCollection?.courses?.forEach((data) => {
        data.categories?.forEach((item) => {
          categoryName.push(item.categoryName);
        });
      });
      setItems(categoryName);
      setItemsLength(categoryName.length);
    }
  }, [redemptionCollection]);

  // console.log(items);
  // console.log(redemptionCollection);

  /*   const [displayItems, setDisplayItems] = useState(
      redemptionCollection.courses?.forEach((data) => {
        data.categories?.filter((item) => {
          return item?.categoryName === items[0];
        })
      })
    
    ); */
  //console.log(displayItems)
  const handleCheap = (index) => {
    const rest = items.slice(index, itemsLength);
    const others = items.slice(0, index);
    const all = [...rest, ...others];
    // console.log(all);
    setItems(all);
    /*  setDisplayItems(
       cardsData?.filter((cardData) => {
         return cardData?.cheap === items[0];
       })
     ); */
  };
  /*  useEffect(() => {
     setDisplayItems(
       cardsData?.filter((cardData) => {
         return cardData?.cheap === items[0];
       })
     );
   }, [items]); */
  const EarningTotalPoint = localStorage.getItem("EarningTotalPoint");
  // console.log(EarningTotalPoint)

  const [redemptionAccessCollection, setRedemptionAccessCollection] =
    useState();

  // console.log(userInfo.organizationId)

  useEffect(() => {
    axios
      .get(
        //`${process.env.REACT_APP_BACKEND_API}/getRedemptionAccess/${userInfo?.organizationId}/${userInfo?._id}`
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/redemptionAccesses/organizationId/${userInfo?.organizationId}/userId/${userInfo?._id}`
      )
      .then((response) => {
        const AllAccessItems = response?.data.accessItems;
        const RedemptionItem = [];
        AllAccessItems.forEach((item) => {
          RedemptionItem.push(item.redemptionItemName);
          //  RedemptionItem[item.redemptionItemName]= item.itemValue;
        });

        setRedemptionAccessCollection(RedemptionItem);
      })
      .catch((error) => console.error(error));
  }, [userInfo?.organizationId]);
  // console.log(redemptionAccessCollection)

  return (
    <div className="py-[65px] px-4">
      <div className="hidden lg:flex flex-row justify-between items-center">
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

      <div className="mt-[20px] lg:mt-[50px] flex justify-between items-center">
        <div>
          {/*    {state === "Points statistics" ? (
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
          {state === "Redeem gifts" ? (
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
            What would you like to redeem?
          </h1>
          <h1 className="text-[#AAA] text-[8px] lg:text-[15px]">
            Use the points you have earned to redeem what you want
          </h1>
        </div>
      </div>
      <div className=" max-w-full w-full">
        <ul className="flex flex-row space-x-4 mt-0 lg:mt-[30px] w-[100px]">
          {items?.map((item, index) => (
            <li
              onClick={() => handleCheap(index)}
              key={index}
              className={classNames(
                " w-fit cursor-pointer",
                {
                  "ml-2 lg:ml-4": index > 0,
                },
                `${
                  index === 0
                    ? "text-[#3E4DAC] text-[12px] lg:text-[16px] font-[700] py-2 lg:py-4 pr-2 lg:pr-4"
                    : "text-[#676767] text-[12px] lg:text-[16px] font-[400] p-2 lg:p-4"
                }`
              )}
            >
              <button className=" w-max flex flex-col items-center">
                {item}
                {index === 0 && (
                  <hr className="w-[25px] lg:w-[50px] h-[2px] lg:h-[4px] bg-[#3E4DAC] rounded-[12px] mt-[2px] lg:mt-[5px]" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {redemptionCollections?.courses?.map((data) =>
            data.categories?.map(
              (item) =>
                item?.categoryName === items[0] &&
                item.redemptionItems?.map((item) => (
                  <div className="text-center flex flex-col items-center">
                    <img
                      className="h-[150px]"
                      src={item?.selectedIcon}
                      alt="Icon"
                    />
                    <h1 className=" text-[12px] lg:text-[16px] font-[700] mt-[6px] max-w-[205px]">
                      {item?.redemptionItemName}
                    </h1>
                    <p className="text-[#979797] text-[6px] lg:text-[11px] font-[400] max-w-[190px]">
                      {item?.description}
                    </p>
                    <p className="text-[#464dd4] text-[8px] lg:text-[11px] font-[500] max-w-[190px]">
                      Item Value : {item?.itemValue}
                    </p>
                    {redemptionAccessCollection &&
                      redemptionAccessCollection?.find(
                        (data) => data === item?.redemptionItemName
                      ) && (
                        <Link
                          to={item?.redemptionLink}
                          className={`bg-[#b8c1f3] text-[#000000] py-[4px] lg:py-[7px] px-[10px] lg:px-[30px] rounded-[32px] text-[8px] lg:text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
                        >
                          View
                        </Link>
                      )}

                    {!redemptionAccessCollection?.find(
                      (data) => data === item?.redemptionItemName
                    ) &&
                      EarningTotalPoint >= +item?.itemValue &&
                      EarningTotalPoint >= +item.minimumValue && (
                        <button
                          onClick={() => {
                            setRedemptionProduct(item);
                            setState("Redemption product");
                          }}
                          className={`bg-[#3653df] text-[#fff] py-[4px] lg:py-[7px] px-[8px] lg:px-[15px] rounded-[32px] text-[8px] lg:text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
                        >
                          Redeem now
                        </button>
                      )}
                    {!redemptionAccessCollection?.find(
                      (data) => data === item?.redemptionItemName
                    ) &&
                      (EarningTotalPoint < +item?.itemValue ||
                        EarningTotalPoint < +item.minimumValue) && (
                        <button
                          className={`bg-[#f3adad] flex items-center gap-1 py-[4px] lg:py-[7px] px-[8px] lg:px-[15px] rounded-[32px] text-[8px] lg:text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
                        >
                          <LockIcon />
                          Insufficient points
                        </button>
                      )}
                  </div>
                ))
            )
          )}

          {/*  {displayItems?.map((item) => (
            <div className="text-center flex flex-col items-center">
              <img src={CreateYourPortfolio} alt="CreateYourPortfolio" />
              <h1 className=" text-[12px] lg:text-[16px] font-[700] mt-[6px] max-w-[205px]">
                {item?.name}
              </h1>
              <p className="text-[#979797] text-[6px] lg:text-[11px] font-[400] max-w-[190px]">
                {item?.description}
              </p>
              <button
                onClick={() => {
                  setRedemptionProduct(item);
                  setState("Redemption product");
                }}
                className={`bg-[#F8F9FE] py-[4px] lg:py-[7px] px-[8px] lg:px-[15px] rounded-[32px] text-[8px] lg:text-[12px] font-[700] z-[1] border border-[#E1E1E1] mt-[6px]`}
              >
                Redeem now
              </button>
            </div>
          ))} */}
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
