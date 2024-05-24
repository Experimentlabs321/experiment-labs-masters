import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DialogLayout from "../../Shared/DialogLayout";
import InfoIcon from "@mui/icons-material/Info";
import DialogLayoutForFromControl from "../../Shared/DialogLayoutForFromControl";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";

const OffersTop = ({ offerData, setOfferData, getAllOffers }) => {
  const [open, setOpen] = useState(false);
  const [suggestDuringCheckout, setSuggestDuringCheckout] = useState(false);
  const [code, setCode] = useState("");
  const [courseInput, setCourseInput] = useState("");
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [discountPercent, setDiscountPercent] = useState("");
  const [maxDiscountValue, setMaxDiscountValue] = useState("");
  const [minCourseValue, setMinCourseValue] = useState("");
  const [validTill, setValidTill] = useState("");
  const [maxUseCount, setMaxUseCount] = useState("");
  const [bundles, setBundles] = useState([]);
  const [bundleInput, setBundleInput] = useState("");
  const [bundleDropdown, setBundleDropdown] = useState(false);
  const [selectedBundles, setSelectedBundles] = useState([]);
  const [bundleIds, setBundleIds] = useState([]);
  

  // State for validation errors
  const [errors, setErrors] = useState({});

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setAvailableCourses(response?.data);
      })
      .catch((error) => console.error(error));
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/bundles/organizationId/${userInfo.organizationId}`
      )
      .then((response) => {
        setBundles(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  console.log(availableCourses);

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
    Loading();

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

    if (selectedCourses.length <= 0 && selectedBundles.length <= 0) {
      validationErrors.courseAdded = "No Course Added.";
    }

    if (selectedBatches.length <= 0 && selectedBundles.length <= 0) {
      validationErrors.batchAdded = "No Batch Added.";
    }

    // Set validation errors
    setErrors(validationErrors);
    if (code.length <= 0) {
      const newCode = generateRandomCode();
      setCode(newCode);
    }

    console.log(validationErrors);

    // If there are no validation errors, you can proceed with the form submission
    if (Object.keys(validationErrors).length === 0 && code.length >= 1) {
      // Perform any logic with the form values here
      // For example, you can send them to a server, update state, etc.
      const newOffer = {
        suggestDuringCheckout,
        code,
        selectedBatches,
        bundleIds,
        discountPercent,
        maxDiscountValue,
        minCourseValue,
        validTill: validTill.toLocaleString(),
        maxUseCount,
        organizationId: userInfo?.organizationId,
        createdBy: userInfo?.email,
        createdAt: new Date().toLocaleString(),
        disabled: false,
      };

      console.log(newOffer);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/offers`,
        newOffer
      );

      if (res.data.success) {
        getAllOffers();
        Swal.fire({
          title: "New Offer created successfully!",
          icon: "success",
        });
      }

      Loading().close();
      // Reset the form values
      setDiscountPercent("");
      setMaxDiscountValue("");
      setMinCourseValue("");
      setValidTill("");
      setMaxUseCount("");
      setSelectedCourses([]);
      setSelectedBatches([]);
      setBundleIds([]);
      setCourseInput("");
      setSuggestDuringCheckout(false);
      setCode("");
    }
  };

  const handleCourseInputChange = (event) => {
    if (event.target.value.length > 0) setCourseDropdown(true);
    setCourseInput(event.target.value);
  };

  const handleBundleInputChange = (event) => {
    if (event.target.value.length > 0) setBundleDropdown(true);
    setBundleInput(event.target.value);
  };

  const handleCourseSelect = async (selectedCourse) => {
    setCourseInput("");
    setCourseDropdown(false);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse._id}`
    );
    selectedCourse.batches = data;
    console.log("Selected Course", selectedCourse);

    if (!selectedCourses?.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };

  const handleBundleSelect = async (selectedBundle) => {
    setBundleInput("");
    setBundleDropdown(false);

    if (
      !selectedBundles?.includes(selectedBundle) &&
      !bundleIds?.includes(selectedBundle._id)
    ) {
      setSelectedBundles([...selectedBundles, selectedBundle]);
      setBundleIds([...bundleIds, selectedBundle._id]);
    }
  };

  const removeSelectedCourse = (removedCourse) => {
    const newSelectedCourses = selectedCourses.filter(
      (course) => course !== removedCourse
    );
    setSelectedCourses(newSelectedCourses);
  };

  const removeSelectedBundle = (removedBundle) => {
    const newSelectedBundles = selectedBundles.filter(
      (bundle) => bundle !== removedBundle
    );
    const newBundleIds = bundleIds.filter(
      (bundle) => bundle !== removedBundle._id
    );
    setSelectedBundles(newSelectedBundles);
    setBundleIds(newBundleIds);
  };

  const handleBatches = (batch) => {
    if (!selectedBatches?.includes(batch._id)) {
      setSelectedBatches([...selectedBatches, batch._id]);
    } else {
      console.log(selectedBatches, batch._id);
      const newSelectedBatches = selectedBatches.filter(
        (removeBatch) => removeBatch !== batch._id
      );
      setSelectedBatches(newSelectedBatches);
    }
  };

  // Function to check if a value is a valid number
  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== "";
  };

  // Function to check if a value is a valid date in yyyy-mm-dd format
  const isValidDate = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  return (
    <>
      <div className="flex items-center justify-between lg:mt-0 mt-20">
        <h1 className="text-3xl font-bold mb-4">Offers</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center text-xl font-semibold bg-[#3E4DAC] px-4 py-2 gap-3 rounded-lg text-white hover:bg-opacity-80"
        >
          Create <AddIcon />
        </button>
      </div>
      <DialogLayoutForFromControl
        open={open}
        setOpen={setOpen}
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

          <div className="mb-4">
            <div className="relative">
              <label className="text-[16px] font-[600]" htmlFor="course">
                Select Bundles
              </label>
              <input
                // onKeyPress={handleKeyPress}
                onChange={handleBundleInputChange}
                // onFocus={() => setCourseDropdown(true)}
                onBlur={() => setBundleDropdown(false)}
                value={bundleInput}
                autoComplete="off"
                disabled={selectedCourses.length >= 1}
                name="Bundles"
                placeholder="Start typing to select bundless"
                className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.bundleAdded && (
                <p className="text-red-500 text-sm">{errors.bundleAdded}</p>
              )}
              {bundleDropdown && (
                <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                  {bundles
                    ?.filter((bundle) =>
                      bundle.bundleFullName
                        ?.toLowerCase()
                        ?.includes(bundleInput?.toLowerCase())
                    )
                    .map((bundle, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100`}
                        onMouseDown={() => handleBundleSelect(bundle)}
                      >
                        {bundle.bundleFullName}
                      </div>
                    ))}
                </div>
              )}

              {selectedBundles[0] && (
                <div className="tag-container my-2 flex flex-wrap rounded-lg border-2 p-2">
                  {selectedBundles?.map((bundle, index) => {
                    return (
                      <div
                        key={index}
                        className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                      >
                        {bundle?.bundleFullName}{" "}
                        <span
                          className="cursor-pointer pl-1 text-xl font-bold"
                          onClick={() => removeSelectedBundle(bundle)}
                        >
                          ×
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <label className="text-[16px] font-[600]" htmlFor="course">
                Select Courses
              </label>
              <input
                // onKeyPress={handleKeyPress}
                onChange={handleCourseInputChange}
                // onFocus={() => setCourseDropdown(true)}
                onBlur={() => setCourseDropdown(false)}
                value={courseInput}
                autoComplete="off"
                name="Courses"
                disabled={bundleIds.length >= 1}
                placeholder="Start typing to select courses"
                className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.courseAdded && (
                <p className="text-red-500 text-sm">{errors.courseAdded}</p>
              )}
              {courseDropdown && (
                <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                  {availableCourses
                    ?.filter((course) =>
                      course.courseFullName
                        ?.toLowerCase()
                        ?.includes(courseInput?.toLowerCase())
                    )
                    .map((course, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100`}
                        onMouseDown={() => handleCourseSelect(course)}
                      >
                        {course.courseFullName}
                      </div>
                    ))}
                </div>
              )}

              {selectedCourses[0] && (
                <div className="tag-container my-2 flex flex-wrap rounded-lg border-2 p-2">
                  {selectedCourses?.map((course, index) => {
                    return (
                      <div
                        key={index}
                        className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                      >
                        {course?.courseFullName}{" "}
                        <span
                          className="cursor-pointer pl-1 text-xl font-bold"
                          onClick={() => removeSelectedCourse(course)}
                        >
                          ×
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedCourses[0] && (
                <div className="tag-container my-2 flex flex-col rounded-lg border-2 p-2">
                  {selectedCourses?.map((course, index) => {
                    return (
                      <div key={index} className="">
                        <h1 className="font-semibold">
                          {course?.courseFullName}{" "}
                        </h1>
                        <div className="flex gap-2 mt-2 flex-wrap mb-2">
                          {course?.batches?.map((batch, batchIndex) => {
                            return (
                              <div
                                onClick={() => handleBatches(batch)}
                                className={`px-2 py-1 border-2 rounded-full cursor-pointer ${
                                  selectedBatches?.includes(batch._id) &&
                                  "bg-[#39249957]"
                                }`}
                                key={batchIndex}
                              >
                                {batch.batchName}
                              </div>
                            );
                          })}
                        </div>
                        {errors.batchAdded && (
                          <p className="text-red-500 text-sm">
                            {errors.batchAdded}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

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
            value="Add Offers"
            className="font-semibold bg-[#3E4DAC] px-4 py-2 rounded-lg text-white hover:bg-opacity-80"
          />
        </form>
      </DialogLayoutForFromControl>
    </>
  );
};

export default OffersTop;
