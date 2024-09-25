import React, { useEffect, useState } from "react";
import arrowDown from "../../../../../assets/SkillsManagement/arrow.svg";
import arrowRight from "../../../../../assets/SkillsManagement/arrowright.svg";

const ItemEarningParameter = ({
  categories,
  selectedData,
  setSelectedData,
  forEdit,
}) => {
  const [isOpenEvaluationEarningCategory, setIsOpenEvaluationEarningCategory] =
    useState(false);
  const [isOpenItemName, setIsOpenItemName] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  // const [selectedData, setSelectedData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [proceed, setProceed] = useState(false);
  const [earningItemNumberingSection, setEarningItemNumberingSection] =
    useState(false);
  const [earningItemNumberingView, setEarningItemNumberingView] =
    useState(false);

  const handleOptionChangeCategory = (category, event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
      setSelectedData([
        ...selectedData,
        { categoryName: category?.categoryName, earningItems: [] },
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (option) => option?.categoryName !== optionValue
        )
      );
      setSelectedData(
        selectedData?.filter((option) => option?.categoryName !== optionValue)
      );
    }
  };
  const handleOptionChangeItemName = (category, item, event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    const findCategory = selectedData?.find(
      (item) => item?.categoryName === category?.categoryName
    );
    if (isChecked) {
      setSelectedItems([
        ...selectedItems,
        {
          earningItemName: optionValue,
          itemValue:
            item?.itemEarningValue === "Automated" ? item?.itemValue : 0,
        },
      ]);
      // setSelectedData(
      //   selectedData.filter(
      //     (option) => option?.categoryName !== category?.categoryName
      //   )
      // );
      setSelectedData([
        ...selectedData?.filter(
          (option) => option?.categoryName !== category?.categoryName
        ),
        {
          categoryName: category?.categoryName,
          earningItems: [
            ...findCategory?.earningItems,
            {
              earningItemName: optionValue,
              itemValue:
                item?.itemEarningValue === "Automated" ? item?.itemValue : 0,
            },
          ],
        },
      ]);
    } else {
      setSelectedItems(
        selectedItems.filter(
          (option) => option?.earningItemName !== optionValue
        )
      );
      // setSelectedData(
      //   selectedData.filter(
      //     (option) => option?.categoryName !== category?.categoryName
      //   )
      // );
      setSelectedData([
        ...selectedData.filter(
          (option) => option?.categoryName !== category?.categoryName
        ),
        {
          categoryName: category?.categoryName,
          earningItems: [
            ...findCategory?.earningItems.filter(
              (option) => option?.earningItemName !== optionValue
            ),
          ],
        },
      ]);
    }
  };
  const handleItemValue = (item, e) => {
    item["itemValue"] = e.target.value;
    const newItems = [];
    selectedCategory?.earningItems?.forEach((element) => {
      if (element?.earningItemName !== item?.earningItemName) {
        newItems?.push(element);
      } else {
        newItems?.push(item);
      }
    });
    setSelectedCategory({
      categoryName: selectedCategory?.categoryName,
      earningItems: newItems,
    });
  };
  useEffect(() => {
    if (selectedData[0] && forEdit) {
      setSelectedCategories(selectedData);
      let filterItems = [];
      selectedData?.forEach((item) => {
        filterItems.push(...item?.earningItems);
      });
      setSelectedItems(filterItems);
    }
  }, [forEdit, selectedData]);
  // console.log(selectedCategories, selectedItems);
  return (
    <div>
      <div className="">
        <div className="flex justify-between me-10 mt-10">
          <p className="text-xl font-medium border-b-2 flex items-center">
            Item Earning Parameter
          </p>
          <div className="">
            <div className=" flex flex-col">
              <div className="flex gap-[72px]">
                <div
                  variant="outlined"
                  // onClick={handleClickOpenearningparameter}
                  className="button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center"
                >
                  <p className="text-2xl">+</p>
                  <div>
                    <p className="w-full ">Create new earning parameter</p>
                  </div>
                </div>

                {/* <BootstrapDialogearningparameter
                        onClose={handleCloseearningparameter}
                        aria-labelledby="customized-dialog-title"
                        open={openearningparameter}
                      >
                        <BootstrapDialogTitleearningparameter
                          id="customized-dialog-title"
                          onClose={handleCloseearningparameter}
                        >
                          <p className="text-[22px] font-bold text-[#3E4DAC]">
                            Add new Item earning parameter
                          </p>
                        </BootstrapDialogTitleearningparameter>
                        <DialogContent dividers>
                          <Typography gutterBottom>
                            <form className="mt-6 mx-10">
                              <div className="flex items-center gap-4">
                                <p className="font-bold text-lg me-[36px]">
                                  Item Earning Parameter
                                </p>
                              </div>

                              <input
                                className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                name="itemEarningParameter1"
                                type="text"
                                placeholder="Eg. Entrepreneurship Lab"
                              />

                              <div className="mt-12 mb-7 flex justify-center">
                                <input
                                  autoFocus
                                  onClick={handleCloseearningparameter}
                                  className="bg-[#3E4DAC] rounded-lg px-12 py-3 text-xl font-bold text-[#fff]"
                                  type="submit"
                                  value="Add"
                                />
                              </div>
                            </form>
                          </Typography>
                        </DialogContent>
                      </BootstrapDialogearningparameter> */}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 me-10 mt-20">
          <div className="">
            <div className="flex items-center gap-4">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg ">Earning Category</p>
            </div>
            <div
              onClick={() =>
                setIsOpenEvaluationEarningCategory(
                  !isOpenEvaluationEarningCategory
                )
              }
              className="bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] cursor-pointer px-2 text-[#535353] font-normal "
              style={{
                borderRadius: "8px",
                border: "1px solid #B7B7B7",
              }}
            >
              <span className=" text-base text-[#3E4DAC] font-semibold">
                Select Earning Category
              </span>
              <div className="select-option">
                {!isOpenEvaluationEarningCategory && (
                  <img src={arrowRight} alt="arrow" />
                )}
                {isOpenEvaluationEarningCategory && (
                  <img src={arrowDown} alt="arrow" />
                )}
                <i
                  className={`dropdown-arrow ${
                    isOpenEvaluationEarningCategory ? "open" : ""
                  }`}
                ></i>
              </div>
            </div>
            {isOpenEvaluationEarningCategory && (
              <div
                className="dropdown-menu w-full ms-5 mt-2"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #B7B7B7",
                }}
              >
                <ul className="p-3">
                  {categories?.map((category) => (
                    <li
                      className="flex mb-2 items-center"
                      style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                    >
                      <input
                        type="checkbox"
                        id="html"
                        name="selectedEarningCategory"
                        onChange={(e) => {
                          handleOptionChangeCategory(category, e);
                        }}
                        value={category?.categoryName}
                        defaultChecked={selectedData?.find(
                          (item) =>
                            item?.categoryName === category?.categoryName
                        )}
                        className=" mb-1"
                      />
                      <div className="flex mb-1 items-center">
                        <label className="ms-4" htmlFor="communication">
                          {category?.categoryName}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="">
            <div className="flex items-center gap-4">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">Item Name</p>
            </div>
            <div
              onClick={() => setIsOpenItemName(!isOpenItemName)}
              className="bg-[#F6F7FF] ms-5 mt-6 custom-dropdown flex justify-between cursor-pointer items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
              style={{
                borderRadius: "8px",
                border: "1px solid #B7B7B7",
              }}
            >
              <div>
                <span className="text-[#3E4DAC] text-base font-semibold">
                  Select Item Name{" "}
                </span>
              </div>
              <div className="select-option">
                {!isOpenItemName && <img src={arrowRight} alt="arrow" />}
                {isOpenItemName && <img src={arrowDown} alt="arrow" />}
                <i
                  className={`dropdown-arrow ${isOpenItemName ? "open" : ""}`}
                ></i>
              </div>
            </div>
            {isOpenItemName && (
              <div
                className="dropdown-menu w-full ms-5 mt-2"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #B7B7B7",
                }}
              >
                {/* <div className="flex justify-end p-2">
                  <input
                    className="me-3"
                    type="checkbox"
                    id="selectAll"
                    // checked={
                    //   selectedItems?.length === selectedCategory?.skills?.length
                    // }
                    // onChange={handleSelectAllSkillName}
                  />
                  <label
                    className="text-[#009EF9] text-xs font-medium"
                    htmlFor="selectAll"
                  >
                    Select All
                  </label>
                </div> */}
                <ul className="p-3 ">
                  {categories?.map((category) => (
                    <>
                      {selectedCategories?.find(
                        (item) => item?.categoryName === category?.categoryName
                      ) && (
                        <>
                          {category?.earningItems?.map((item) => (
                            <li
                              className="flex mb-2 items-center"
                              style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                            >
                              <input
                                type="checkbox"
                                id="student"
                                name="option"
                                value={item?.earningItemName}
                                checked={selectedItems.find(
                                  (i) =>
                                    i?.earningItemName === item?.earningItemName
                                )}
                                onChange={(e) =>
                                  handleOptionChangeItemName(category, item, e)
                                }
                                className=" mb-1"
                              />
                              <div className="flex mb-1 items-center">
                                <label className="ms-4" htmlFor="student">
                                  {item?.earningItemName}
                                </label>
                              </div>
                            </li>
                          ))}
                        </>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className=" mt-[50px]  border-b-2">
          <div className="flex justify-center">
            {!earningItemNumberingSection && (
              <p
                onClick={() => {
                  setProceed(true);
                  setSelectedCategory({});
                }}
                className="bg-[#FFDB70] cursor-pointer text-base font-bold p-4 rounded-lg mb-10 flex justify-center w-[97px]"
              >
                Proceed
              </p>
            )}
          </div>
          {proceed && (
            <div className=" mt-2 rounded border mb-5 flex me-10 ">
              <form onSubmit={() => console.log("data")} className="w-full">
                <div className="grid grid-cols-12 gap-4 2xl:gap-6 p-8">
                  <div className=" col-span-4 ">
                    {categories?.map((category) => (
                      <>
                        {selectedData?.find(
                          (item) =>
                            item?.categoryName === category?.categoryName
                        ) && (
                          <div
                            onClick={() => {
                              setSelectedCategory(
                                selectedData?.find(
                                  (item) =>
                                    item?.categoryName ===
                                    category?.categoryName
                                )
                              );
                            }}
                            className={` flex cursor-pointer justify-between items-center px-4 py-2 mb-4 text-sm font-medium ${
                              category?.categoryName ===
                              selectedCategory?.categoryName
                                ? "text-[#0A98EA] "
                                : "text-[black]"
                            }`}
                            style={{
                              borderRadius: "8px",
                              border: `${
                                category?.categoryName !==
                                selectedCategory?.categoryName
                                  ? "1px solid #B7B7B7"
                                  : "none"
                              }`,
                              background: " #FFF",
                              boxShadow: `${
                                category?.categoryName ===
                                selectedCategory?.categoryName
                                  ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                  : "none"
                              }`,
                            }}
                          >
                            <p>{category?.categoryName}</p>
                            <img alt="arrow" src={arrowRight} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="flex-1 col-span-8 flex ">
                    {selectedCategory && (
                      <div className="w-full flex flex-col items-center">
                        {selectedCategory?.earningItems?.map((item) => (
                          <div
                            className={`flex text-base font-medium mb-4 w-11/12  h-[65px] justify-between rounded-md px-4 items-center bg-[#F8F8F8]`}
                          >
                            <p className="w-full">{item?.earningItemName}</p>
                            <div className="flex justify-between ms-2 items-center w-full">
                              <input
                                required
                                className="w-1/3 h-[32px] text-center border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                name={item?.earningItemName}
                                type="number"
                                value={item?.itemValue}
                                onChange={(e) => handleItemValue(item, e)}
                              />
                              <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                %
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 mb-7 flex justify-center">
                  <p
                    onClick={() => {
                      setProceed(false);
                      setEarningItemNumberingSection(true);
                      setEarningItemNumberingView(true);
                      // console.log(selectedData);
                    }}
                    className="bg-[#2EB0FB] cursor-pointer rounded-lg px-4 py-1 font-semibold text-[#fff]"
                  >
                    Apply
                  </p>
                </div>
              </form>
            </div>
          )}
          {earningItemNumberingView && (
            <div className=" mt-2 rounded border mb-5 flex me-10 ">
              <form
                onSubmit={() => {
                  // console.log("data")
                }}
                className="w-full"
              >
                <div className="grid grid-cols-12 gap-4 2xl:gap-6 p-8">
                  <div className=" col-span-4 ">
                    {categories?.map((category) => (
                      <>
                        {selectedData?.find(
                          (item) =>
                            item?.categoryName === category?.categoryName
                        ) && (
                          <div
                            onClick={() => {
                              setSelectedCategory(
                                selectedData?.find(
                                  (item) =>
                                    item?.categoryName ===
                                    category?.categoryName
                                )
                              );
                            }}
                            className={` flex cursor-pointer justify-between items-center px-4 py-2 mb-4 text-sm font-medium ${
                              category?.categoryName ===
                              selectedCategory?.categoryName
                                ? "text-[#0A98EA] "
                                : "text-[black]"
                            }`}
                            style={{
                              borderRadius: "8px",
                              border: `${
                                category?.categoryName !==
                                selectedCategory?.categoryName
                                  ? "1px solid #B7B7B7"
                                  : "none"
                              }`,
                              background: " #FFF",
                              boxShadow: `${
                                category?.categoryName ===
                                selectedCategory?.categoryName
                                  ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                  : "none"
                              }`,
                            }}
                          >
                            <p>{category?.categoryName}</p>
                            <img alt="arrow" src={arrowRight} />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="flex-1 col-span-8 flex ">
                    {selectedCategory && (
                      <div className="w-full flex flex-col items-center">
                        {selectedCategory?.earningItems?.map((item) => (
                          <div
                            className={`flex text-base font-medium mb-4 w-11/12  h-[65px] justify-between rounded-md px-4 items-center bg-[#F8F8F8]`}
                          >
                            <p className="w-full">{item?.earningItemName}</p>
                            <div className="flex justify-between ms-2 items-center w-full">
                              <input
                                className="w-1/3 h-[32px] text-center border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                name={item?.earningItemName}
                                type="number"
                                value={item?.itemValue}
                                disabled
                              />
                              <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                %
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 mb-7 flex justify-center">
                  <p
                    onClick={() => {
                      setProceed(true);
                      setEarningItemNumberingSection(false);
                      setEarningItemNumberingView(false);
                    }}
                    className="bg-[#2EB0FB] cursor-pointer rounded-lg px-4 py-1 font-semibold text-[#fff]"
                  >
                    Edit
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemEarningParameter;
