//PointsRedemptions.js
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import updateimg from "../../../assets/PointsRedemptions/Upload.svg";
import editimg from "../../../assets/PointsRedemptions/edit.svg";
import deleteimg from "../../../assets/PointsRedemptions/delete.svg";
import Filterimg from "../../../assets/PointsRedemptions/Filter.svg";
import undo from "../../../assets/PointsRedemptions/Sync-retry.svg";

import EarningCategory from "./EarningCategory";

const EarningLogics = () => {
  const [category, setCategory] = useState(null);
  const [buttonCount, setButtonCount] = useState(1);
  const [buttonnum, setbuttonnum] = useState(0);
  const [newCat, setNewCategory] = useState("");

  const handleClickCategory = (selectedCategory) => {
    setCategory(selectedCategory === category ? null : selectedCategory);
  };
  const handlecreatenewClick = () => {
    const buttonnum = localStorage.getItem("earningbuttonnum") || 0;

    const newButtonCount = parseInt(buttonnum) + 1;

    /* setbuttonnum(newButtonCount); */
    localStorage.setItem("earningbuttonnum", newButtonCount);
    const newCategory = newCat;

    // Check if the category already exists
    const storedCategories =
      JSON.parse(localStorage.getItem("earningcategories")) || [];
    const categoryExists = storedCategories.includes(newCategory);

    if (categoryExists) {
      // Category already exists, handle accordingly (e.g., show an error message)
      console.log("Category already exists");
      return;
    }
    setButtonCount(newButtonCount);

    // Update local storage
    storedCategories.push(newCategory);
    localStorage.setItem("earningcategories", JSON.stringify(storedCategories));

    setCategory(newCategory);

    setNewCategory("");
  };
  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleClick = () => {
    const buttonnum = localStorage.getItem("earningbuttonnum") || 0;

    const newButtonCount = parseInt(buttonnum) + 1;

    /* setbuttonnum(newButtonCount); */
    localStorage.setItem("earningbuttonnum", newButtonCount);
    const newCategory = `Category${newButtonCount}`;

    // Check if the category already exists
    const storedCategories =
      JSON.parse(localStorage.getItem("earningcategories")) || [];
    const categoryExists = storedCategories.includes(newCategory);

    if (categoryExists) {
      // Category already exists, handle accordingly (e.g., show an error message)
      console.log("Category already exists");
      return;
    }
    setButtonCount(newButtonCount);

    // Update local storage
    storedCategories.push(newCategory);
    localStorage.setItem("earningcategories", JSON.stringify(storedCategories));

    setCategory(newCategory);
  };

  useEffect(() => {
    const storedButtonCount = localStorage.getItem("earningbuttonnum");
    if (storedButtonCount) {
      setButtonCount(parseInt(storedButtonCount, 10));
    }
    const storedCategories = localStorage.getItem("earningcategories");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      if (parsedCategories.length > 0) {
        setCategory(parsedCategories[0]);
      }
    }
  }, []);
  const allcategorie = localStorage.getItem("earningcategories");
  const allcategories = JSON.parse(allcategorie);

  return (
    <div>
      <Layout>
        <div className="flex items-center justify-center gap-7 pt-20 lg:pt-10 ">
          <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">
            Earning Logics
          </div>
          <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
            <input
              className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0"
              placeholder="Search"
            />
            <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
              <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
            </div>
          </div>
          <Badge badgeContent={1} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </div>
        <div className="flex justify-end mx-[75px] my-9">
          <img src={undo}></img>
        </div>
        <div className="flex justify-between mx-10">
          <div className="flex justify-between items-center ">
            <input
              className="me-2 text-[#737373] h-[20px] w-[20px]"
              type="checkbox"
              id=""
              name=""
              value=""
            />
            <p className="font-semibold text-[#000000]">Select All</p>
          </div>

          <div className="flex items-center ">
            <p
              onClick={handlecreatenewClick}
              className="font-semibold bg-[#009CE4] rounded-lg text-[#fff] px-4 py-2"
            >
              Create New
            </p>
            <div className=" ms-6 flex gap-2  border  rounded-lg h-[40px]  px-2 text-[#535353] ">
              <input
                value={newCat}
                onChange={handleChange}
                className="  focus:outline-0 "
                type="text"
                placeholder="Enter New Category"
              ></input>
            </div>
          </div>
          <div className="flex gap-5 items-center ">
            <p className="font-semibold text-[#000000]">Upload</p>
            <img className="h-[70px] w-[70px]" src={updateimg}></img>
            <p className="font-semibold text-[#000000] me-3">Edit</p>
            <img
              className="h-[35px] w-[35px] bg-[#404040] rounded-full p-1"
              src={editimg}
            ></img>
            <p className="font-semibold text-[#000000] me-3">Delete</p>
            <img
              className="h-[35px] w-[35px] bg-[#E70000] rounded-full p-1 "
              src={deleteimg}
            ></img>
          </div>
        </div>

        <div className="lg:flex justify-center items-center mt-5 ">
          <div className="flex-1 justify-center items-center lg:flex gap-4 px-10">
            <button
              className={`px-6 py-3 text-base border rounded-md font-semibold ${
                category === "Category"
                  ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                  : "text-[#949494]"
              }`}
              onClick={() => handleClickCategory("Category")}
            >
              Category
            </button>

            {allcategories?.map((cat) => (
              <>
                <button
                  /* key={index} */
                  className={`px-6 py-3 text-base border rounded-md font-semibold ${
                    category === cat
                      ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                      : "text-[#949494]"
                  }`}
                  onClick={() => handleClickCategory(cat)}
                >
                  {cat}
                </button>
              </>
            ))}

            <button
              onClick={handleClick}
              className="w-6 h-6 flex justify-center items-center bg-[#D9D9D9] text-[#737373] text-4xl rounded-full"
            >
              +
            </button>
          </div>

          {/*  <div>
                        
                            {allcategories?.length ? (
                                <>
                                    <button
                                        onClick={handleClick}
                                        className='w-6 h-6 flex justify-center items-center bg-[#D9D9D9] text-[#737373] text-4xl rounded-full'
                                    >
                                        +
                                    </button>
                                </>
                            ) : null}
                    
                    </div> */}

          <div className="px-32">
            <img src={Filterimg}></img>
          </div>
        </div>

        <div>
          <EarningCategory />

          {/*  {
                        category && <>
                            <EarningCategory />
                            
                        </>
                    } */}
        </div>
      </Layout>
    </div>
  );
};

export default EarningLogics;
