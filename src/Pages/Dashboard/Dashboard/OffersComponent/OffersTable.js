import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";
import DialogLayoutForFromControl from "../../Shared/DialogLayoutForFromControl";
import { AuthContext } from "../../../../contexts/AuthProvider";
import BatchInfoTable from "./BatchInfoTable";
import BundleInfoTable from "./BundleInfoTable";

const OffersTable = ({ offerData, setOfferData, getAllOffers, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOffers, setFilteredOffers] = useState(offerData);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [suggestDuringCheckout, setSuggestDuringCheckout] = useState(false);
  const [code, setCode] = useState("");
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [discountPercent, setDiscountPercent] = useState("");
  const [maxDiscountValue, setMaxDiscountValue] = useState("");
  const [minCourseValue, setMinCourseValue] = useState("");
  const [validTill, setValidTill] = useState("");
  const [maxUseCount, setMaxUseCount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [organizationId, setOrganizationId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [id, setId] = useState("");
  const [batches, setBatches] = useState([]);
  const [bundles, setBundles] = useState([]);

  // State for validation errors
  const [errors, setErrors] = useState({});

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const newFilteredOffers = offerData.filter((offer) =>
      offer.code.includes(searchTerm)
    );
    setFilteredOffers(newFilteredOffers);
  }, [offerData, searchTerm]);

  const handleInputs = (offer) => {
    setDiscountPercent(offer?.discountPercent);
    setMaxDiscountValue(offer?.maxDiscountValue);
    setMinCourseValue(offer?.minCourseValue);
    const newDate = new Date(offer?.validTill);
    // console.log(newDate);
    setValidTill(offer?.validTill);
    setMaxUseCount(offer?.maxUseCount);
    setSelectedBatches(offer?.selectedBatches);
    setSuggestDuringCheckout(offer?.suggestDuringCheckout);
    setCode(offer?.code);
    setDisabled(offer?.disabled);
    setCreatedAt(offer?.createdAt);
    setOrganizationId(offer?.organizationId);
    setCreatedBy(offer?.createdBy);
    setId(offer?._id);
    setUpdateOpen(true);
    setBatches(offer?.batchesInfo);
    setBundles(offer?.bundlesInfo);
  };

  const handleDeleteOffer = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/offers/${id}`
    );
    if (res.data.success) {
      getAllOffers();
      Swal.fire({
        title: "New Offer Deleted successfully!",
        icon: "success",
      });
    }
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }

    return randomCode;
  };

  const handleGenerateCode = (event) => {
    event.preventDefault();
    const newCode = generateRandomCode();
    setCode(newCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input values
    const validationErrors = {};

    if (!isValidNumber(discountPercent) || discountPercent > 100) {
      validationErrors.discountPercent =
        "Discount percent must be a valid number and should not exceed 100.";
    }

    if (!isValidNumber(maxDiscountValue)) {
      validationErrors.maxDiscountValue =
        "Maximum discount value must be a valid number.";
    }

    if (!isValidNumber(minCourseValue)) {
      validationErrors.minCourseValue =
        "Minimum Course value must be a valid number.";
    }

    if (!isValidDate(validTill)) {
      validationErrors.validTill =
        "Valid Till must be a valid date in the format yyyy-mm-dd.";
    }

    if (!isValidNumber(maxUseCount)) {
      validationErrors.maxUseCount = "Max use count must be a valid number.";
    }

    // Set validation errors
    setErrors(validationErrors);
    if (code.length <= 0) {
      const newCode = generateRandomCode();
      setCode(newCode);
    }

    // If there are no validation errors, you can proceed with the form submission
    if (Object.keys(validationErrors).length === 0 && code.length >= 1) {
      // Perform any logic with the form values here
      // For example, you can send them to a server, update state, etc.
      const updateOffer = {
        suggestDuringCheckout,
        code,
        selectedBatches,
        discountPercent,
        maxDiscountValue,
        minCourseValue,
        validTill: validTill.toLocaleString(),
        maxUseCount,
        organizationId,
        createdBy,
        createdAt,
        disabled,
      };

      // console.log(updateOffer);

      const res = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/offers/${id}`,
        updateOffer
      );

      if (res.data.success) {
        getAllOffers();
        Swal.fire({
          title: "New Offer Updated successfully!",
          icon: "success",
        });
      }

      // Reset the form values
      setDiscountPercent("");
      setMaxDiscountValue("");
      setMinCourseValue("");
      setValidTill("");
      setMaxUseCount("");
      setSelectedBatches([]);
      setSuggestDuringCheckout(false);
      setCode("");
      setUpdateOpen(false);
    }
  };

  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== "";
  };

  // Function to check if a value is a valid date in yyyy-mm-dd format
  const isValidDate = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  return (
    <div>
      <div className="container mx-auto mt-8">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 mb-4 w-full rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ height: "70vh" }} className="overflow-x-auto ">
          <table className="min-w-full border bg-white rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">CREATED ON</th>
                <th className="py-2 px-4 text-left">CODE</th>
                <th className="py-2 px-4 text-left">DETAILS</th>
                <th className="py-2 px-4 text-left">VALID TILL</th>
                <th className="py-2 px-4 text-left">ACTIVE</th>
                <th className="py-2 px-4 text-left">USED</th>
                <th className="py-2 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your data rows here */}
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }, (_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="py-2 px-4 text-left">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="flex flex-col gap-1 text-xs">
                          <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                          <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </td>
                      <td className="py-2 px-4 text-left">
                        <div className="flex gap-2">
                          <div className="h-4 bg-gray-300 rounded w-6"></div>
                          <div className="h-4 bg-gray-300 rounded w-6"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                filteredOffers?.map((offer, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-left font-sans">
                      {offer.createdAt}
                    </td>
                    <td className="py-2 px-4 text-left">{offer?.code}</td>
                    <td className="py-2 px-4 text-left">
                      <div className="flex flex-col gap-1 text-xs">
                        <span>Discount: {offer?.discountPercent}%</span>
                        <span>Max Discount: {offer?.maxDiscountValue}</span>
                        <span>Min Cart: {offer?.minCourseValue}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-left">{offer?.validTill}</td>
                    <td className="py-2 px-4 text-left">
                      {new Date(offer?.validTill) >= new Date() &&
                      !offer?.disabled
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {offer?.usedCount || 0}
                    </td>
                    <td className="py-2 px-4 text-left">
                      <div>
                        <span onClick={() => handleInputs(offer)}>
                          <EditIcon
                            sx={{
                              ":hover": { color: "yellow" },
                            }}
                          />
                        </span>
                        <span onClick={() => handleDeleteOffer(offer._id)}>
                          <DeleteIcon
                            sx={{
                              ":hover": { color: "red" },
                            }}
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      <DialogLayoutForFromControl
        open={updateOpen}
        setOpen={setUpdateOpen}
        title={
          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Offers
          </p>
        }
        width={600}
        borderRadius="15px"
      >
        <form
          onSubmit={handleSubmit}
          className="p-4 w-full h-[75vh] overflow-auto"
        >
          <div className="mb-4 flex justify-start items-center">
            <input
              type="checkbox"
              id="suggestDuringCheckout"
              className="mr-3 h-4 w-4 rounded-lg"
              checked={suggestDuringCheckout}
              onChange={() => setSuggestDuringCheckout(!suggestDuringCheckout)}
            />
            <label
              htmlFor="suggestDuringCheckout"
              className="text-lg font-medium text-gray-600"
            >
              Suggest During checkout
            </label>
            {/* <span className='ml-3' ><InfoIcon fontSize='small' /></span> */}
          </div>

          <div className="mb-4 flex justify-start items-center">
            <input
              type="checkbox"
              id="suggestDuringCheckout"
              className="mr-3 h-4 w-4 rounded-lg"
              checked={disabled}
              onChange={() => setDisabled(!disabled)}
            />
            <label
              htmlFor="suggestDuringCheckout"
              className="text-lg font-medium text-gray-600"
            >
              Disable Offer
            </label>
            {/* <span className='ml-3' ><InfoIcon fontSize='small' /></span> */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-lg font-medium text-gray-600"
            >
              Promo Code
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                id="code"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength="10"
              />
              <button
                onClick={handleGenerateCode}
                className="font-semibold bg-[#3E4DAC] px-4 py-2 rounded-lg text-white hover:bg-opacity-80"
              >
                Generate
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              If not given, a random promo code will be generated.
            </p>
          </div>

          {batches?.length > 0 && (
            <div className="mb-6 mt-8">
              <BatchInfoTable batches={batches} />
            </div>
          )}

          {bundles?.length > 0 && (
            <div className="mb-6 mt-8">
              <BundleInfoTable bundles={bundles} />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="discountPercent"
              className="block text-lg font-medium text-gray-600"
            >
              Discount Percent [*]
            </label>
            <input
              type="text"
              id="discountPercent"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className={`mt-1 p-2 border ${
                errors.discountPercent ? "border-red-500" : "border-gray-300"
              } rounded-md w-full`}
            />
            {errors.discountPercent && (
              <p className="text-red-500 text-sm">{errors.discountPercent}</p>
            )}
          </div>

          {/* Maximum Discount Value */}
          <div className="mb-4">
            <label
              htmlFor="maxDiscountValue"
              className="block text-lg font-medium text-gray-600"
            >
              Maximum Discount Value [*]
            </label>
            <input
              type="text"
              id="maxDiscountValue"
              value={maxDiscountValue}
              onChange={(e) => setMaxDiscountValue(e.target.value)}
              className={`mt-1 p-2 border ${
                errors.maxDiscountValue ? "border-red-500" : "border-gray-300"
              } rounded-md w-full`}
            />
            {errors.maxDiscountValue && (
              <p className="text-red-500 text-sm">{errors.maxDiscountValue}</p>
            )}
          </div>

          {/* Minimum Course Value */}
          <div className="mb-4">
            <label
              htmlFor="minCourseValue"
              className="block text-lg font-medium text-gray-600"
            >
              Minimum Course Value [*]
            </label>
            <input
              type="text"
              id="minCourseValue"
              value={minCourseValue}
              onChange={(e) => setMinCourseValue(e.target.value)}
              className={`mt-1 p-2 border ${
                errors.minCourseValue ? "border-red-500" : "border-gray-300"
              } rounded-md w-full`}
            />
            {errors.minCourseValue && (
              <p className="text-red-500 text-sm">{errors.minCourseValue}</p>
            )}
          </div>

          {/* Valid Till */}
          <div className="mb-4">
            <label
              htmlFor="validTill"
              className="block text-lg font-medium text-gray-600"
            >
              Valid Till [*]
            </label>
            <input
              type="date"
              id="validTill"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              className={`mt-1 p-2 border ${
                errors.validTill ? "border-red-500" : "border-gray-300"
              } rounded-md w-full`}
              placeholder="yyyy-mm-dd"
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.validTill && (
              <p className="text-red-500 text-sm">{errors.validTill}</p>
            )}
          </div>

          {/* Max Use Count */}
          <div className="mb-4">
            <label
              htmlFor="maxUseCount"
              className="block text-lg font-medium text-gray-600"
            >
              Max Use Count
            </label>
            <input
              type="text"
              id="maxUseCount"
              value={maxUseCount}
              onChange={(e) => setMaxUseCount(e.target.value)}
              className={`mt-1 p-2 border ${
                errors.maxUseCount ? "border-red-500" : "border-gray-300"
              } rounded-md w-full`}
            />
            {errors.maxUseCount && (
              <p className="text-red-500 text-sm">{errors.maxUseCount}</p>
            )}
          </div>

          <input
            type="submit"
            value="Update Offers"
            className="font-semibold bg-[#3E4DAC] px-4 py-2 rounded-lg text-white hover:bg-opacity-80"
          />
        </form>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default OffersTable;
