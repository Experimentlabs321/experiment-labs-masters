//AdminOffersDetails

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminOffersDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/offers/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)
  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/offers/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const offers = form.offers?.value;
    const create = form.create?.value;
    const search = form.search?.value;
    const createdOn = form.createdOn?.value;
    const code = form.code?.value;
    const details = form.details?.value;
    const validTill = form.validTill?.value;
    const active = form.active?.value;
    const used = form.used?.value;
    const action = form.action?.value;
    const suggestDuringCheckout = form.suggestDuringCheckout?.value;
    const promoCode = form.promoCode?.value;
    const generate = form.generate?.value;
    const ifNotGivenARandomPromoCodeWillBeGenerated =
      form.ifNotGivenARandomPromoCodeWillBeGenerated?.value;
    const selectBundles = form.selectBundles?.value;
    const startTypingToSelectBundles = form.startTypingToSelectBundles?.value;
    const selectCourses = form.selectCourses?.value;
    const startTypingToSelectCourses = form.startTypingToSelectCourses?.value;
    const discountPercent = form.discountPercent?.value;
    const maximumDiscountValue = form.maximumDiscountValue?.value;
    const minimumCourseValue = form.minimumCourseValue?.value;
    const maxUseCount = form.maxUseCount?.value;
    const addOffers = form.addOffers?.value;

    const itemDetails = {
      offers: offers,
      create: create,
      search: search,
      createdOn: createdOn,
      code: code,
      details: details,
      validTill: validTill,
      active: active,
      used: used,
      action: action,
      suggestDuringCheckout: suggestDuringCheckout,
      promoCode: promoCode,
      generate: generate,
      ifNotGivenARandomPromoCodeWillBeGenerated:
        ifNotGivenARandomPromoCodeWillBeGenerated,
      selectBundles: selectBundles,
      startTypingToSelectBundles: startTypingToSelectBundles,
      selectCourses: selectCourses,
      startTypingToSelectCourses: startTypingToSelectCourses,
      discountPercent: discountPercent,
      maximumDiscountValue: maximumDiscountValue,
      minimumCourseValue: minimumCourseValue,

      maxUseCount: maxUseCount,
      addOffers: addOffers,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/offers/organizationId/${userInfo?.organizationId}`,
      itemDetails
    );
    // console.log(item)
    if (item?.data === "Items Name updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Name added Successfully");
      form.reset();
    }
  };

  return (
    <div>
      {adminLoading ? (
        <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2 border p-4 rounded-xl">
          <div className=" grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Offers</p>
              <input
                name="offers"
                defaultValue={itemDetails?.offers}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Create</p>
              <input
                name="create"
                defaultValue={itemDetails?.create}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Search</p>
              <input
                name="search"
                defaultValue={itemDetails?.search}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">CREATED ON</p>
              <input
                name="createdOn"
                defaultValue={itemDetails?.createdOn}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">CODE</p>
              <input
                name="code"
                defaultValue={itemDetails?.code}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">DETAILS</p>
              <input
                name="details"
                defaultValue={itemDetails?.details}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">VALID TILL</p>
              <input
                name="validTill"
                defaultValue={itemDetails?.validTill}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">ACTIVE</p>
              <input
                name="active"
                defaultValue={itemDetails?.active}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">USED</p>
              <input
                name="used"
                defaultValue={itemDetails?.used}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">ACTIONS</p>
              <input
                name="action"
                defaultValue={itemDetails?.action}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Suggest During checkout</p>
              <input
                name="suggestDuringCheckout"
                defaultValue={itemDetails?.suggestDuringCheckout}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Promo Code</p>
              <input
                name="promoCode"
                defaultValue={itemDetails?.promoCode}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Generate</p>
              <input
                name="generate"
                defaultValue={itemDetails?.generate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                If not given, a random promo code will be generated
              </p>
              <input
                name="ifNotGivenARandomPromoCodeWillBeGenerated"
                defaultValue={
                  itemDetails?.ifNotGivenARandomPromoCodeWillBeGenerated
                }
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Bundles</p>
              <input
                name="selectBundles"
                defaultValue={itemDetails?.selectBundles}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Start typing to select bundles
              </p>
              <input
                name="startTypingToSelectBundles"
                defaultValue={itemDetails?.startTypingToSelectBundles}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Courses</p>
              <input
                name="selectCourses"
                defaultValue={itemDetails?.selectCourses}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Start typing to select courses
              </p>
              <input
                name="startTypingToSelectCourses"
                defaultValue={itemDetails?.startTypingToSelectCourses}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Discount Percent</p>
              <input
                name="discountPercent"
                defaultValue={itemDetails?.discountPercent}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Maximum Discount Value</p>
              <input
                name="maximumDiscountValue"
                defaultValue={itemDetails?.maximumDiscountValue}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Minimum Course Value</p>
              <input
                name="minimumCourseValue"
                defaultValue={itemDetails?.minimumCourseValue}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Max Use Count</p>
              <input
                name="maxUseCount"
                defaultValue={itemDetails?.maxUseCount}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Add Offers</p>
              <input
                name="addOffers"
                defaultValue={itemDetails?.addOffers}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-20 mb-10 ">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminOffersDetails;
