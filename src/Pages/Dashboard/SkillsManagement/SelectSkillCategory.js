import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import DialogLayout from "../Shared/DialogLayout";

const SelectSkillCategory = ({
  skillCategories,
  selectedSkillCategory,
  setSelectedSkillCategory,
  setCategoryThreeDot,
  categoryThreeDot,
  setSkillCategories,
  selectedCourse,
}) => {
  const { userInfo } = useContext(AuthContext);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  const handleAddCategory = async () => {
    if (!selectedCourse?._id || !userInfo?.organizationId) {
      Swal.fire({
        icon: "warning",
        title: "There is no course",
        text: "Please create a course first!",
      });
      return;
    }
    const newChapter = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/skill_categories`,
      {
        categoryName: `category ${skillCategories?.length + 1}`,
        courseId: selectedCourse?._id,
        organizationId: userInfo?.organizationId,
      }
    );

    if (newChapter?.data?.acknowledged) {
      toast.success("Chapter added Successfully");
      setSkillCategories([
        ...skillCategories,
        { categoryName: `category ${skillCategories?.length + 1}` },
      ]);
      setSelectedSkillCategory({
        categoryName: `category ${skillCategories?.length + 1}`,
      });
    }
  };

  const handleEditCategoryName = async (event) => {
    event.preventDefault();
    const category = {
      categoryName: event?.target?.categoryName?.value,
    };
    if (
      skillCategories?.find(
        (item) => item?.categoryName === category?.categoryName
      )
    ) {
      setEditCategoryOpen(false);
      Swal.fire({
        icon: "error",
        title: "Category already exist!",
        text: "Please enter an unique category name!",
      });
      return;
    }
    const update = {
      organizationId: userInfo?.organizationId,
      oldCategoryName: selectedSkillCategory?.categoryName,
      newCategoryName: event?.target?.categoryName?.value,
      courseId: selectedCourse?._id,
    };
    const updatedCategory = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}/skill_categories/updateCategoryName`,
      update
    );
    console.log(updatedCategory);

    if (updatedCategory?.status === 200) {
      toast.success("Week Updated Successfully");
      const updatedCategoriesArray = [...skillCategories];
      const selectedIndex = updatedCategoriesArray.findIndex(
        (category) =>
          category.categoryName === selectedSkillCategory.categoryName
      );
      updatedCategoriesArray[selectedIndex].categoryName =
        category.categoryName;
      setSkillCategories(updatedCategoriesArray);
      setEditCategoryOpen(false);
      event.target.reset();
    }
  };

  const handleCategoryDelete = async (name) => {
    const deleteData = {
      organizationId: userInfo?.organizationId,
      categoryName: name,
      courseId: selectedCourse?._id,
    };
    await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, the category will not recover!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_API}/deleteCategory`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
          })
          .then((result) => {
            if (result?.acknowledged) {
              toast.success("Category Deleted Successfully!");
              const remainingCategories = skillCategories.filter(
                (category) => category?.categoryName !== name
              );
              setSkillCategories(remainingCategories);
              setSelectedSkillCategory(remainingCategories[0]);
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            // Handle error, display a message to the user, etc.
          });
      }
    });
  };

  return (
    <div>
      {/* Edit category name start */}
      <DialogLayout
        open={editCategoryOpen}
        setOpen={setEditCategoryOpen}
        width={440}
        borderRadius="15px"
        title={
          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Edit Category Name
          </p>
        }
      >
        <form
          onSubmit={handleEditCategoryName}
          className="px-[32px] py-[24px] "
        >
          <h1 className=" text-[18px] font-[700] mb-[20px] ">Category Name</h1>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            defaultValue={selectedSkillCategory?.categoryName}
            placeholder="Category"
            className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
          />
          <div className="w-full flex items-center justify-center mt-[40px]">
            <input
              type="submit"
              value="Update"
              className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
            />
          </div>
        </form>
      </DialogLayout>
      {/* Edit category name end */}
      <h1 className=" text-[#737373] text-[24px] font-[500] mt-5 mb-2 ">
        Select Skill Category
      </h1>
      <div className="flex flex-wrap gap-y-2 items-center">
        {skillCategories?.map((item, index) => (
          <button
            key={index}
            className={`px-2 py-3 relative text-base border rounded-md font-semibold flex items-center min-w-[150px] justify-between gap-6 mr-1 ${
              selectedSkillCategory?.categoryName === item?.categoryName
                ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                : "text-[#949494]"
            }`}
            onClick={() => setSelectedSkillCategory(item)}
          >
            {item?.categoryName}
            <button
              onBlur={() => setCategoryThreeDot(false)}
              onClick={() => setCategoryThreeDot(!categoryThreeDot)}
              className="px-3 py-2 rounded-full hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="18"
                viewBox="0 0 5 18"
                fill="none"
              >
                <path
                  d="M4.31777 2.88577C4.31777 4.09795 3.35121 5.08061 2.15889 5.08061C0.966567 5.08061 0 4.09795 0 2.88577C0 1.67358 0.966567 0.690918 2.15889 0.690918C3.35121 0.690918 4.31777 1.67358 4.31777 2.88577Z"
                  fill="#8F8F8F"
                />
                <path
                  d="M4.31777 9.15676C4.31777 10.3689 3.35121 11.3516 2.15889 11.3516C0.966567 11.3516 0 10.3689 0 9.15676C0 7.94458 0.966567 6.96191 2.15889 6.96191C3.35121 6.96191 4.31777 7.94458 4.31777 9.15676Z"
                  fill="#8F8F8F"
                />
                <path
                  d="M4.31777 15.1142C4.31777 16.3264 3.35121 17.309 2.15889 17.309C0.966567 17.309 0 16.3264 0 15.1142C0 13.902 0.966567 12.9194 2.15889 12.9194C3.35121 12.9194 4.31777 13.902 4.31777 15.1142Z"
                  fill="#8F8F8F"
                />
              </svg>
            </button>
            {selectedSkillCategory?.categoryName === item?.categoryName &&
              categoryThreeDot && (
                <ul className="absolute right-0 top-[53px] w-max border  bg-white p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026] z-10 ">
                  <li
                    onMouseDown={() => {
                      setEditCategoryOpen(true);
                      setCategoryThreeDot(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-[#5c5c5c21] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                  >
                    Edit Category Name
                  </li>
                  <li
                    className="cursor-pointer p-2 hover:bg-[#5c5c5c21] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                    onMouseDown={() => {
                      handleCategoryDelete(selectedSkillCategory?.categoryName);
                    }}
                  >
                    Delete Category
                  </li>
                </ul>
              )}
          </button>
        ))}
        {!skillCategories[0] && (
          <div
            className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
          >
            Please Add Category...
          </div>
        )}
        <button
          onClick={handleAddCategory}
          className="w-6 h-6 flex justify-center items-center bg-[#D9D9D9] text-[#737373] text-4xl rounded-full ml-5"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectSkillCategory;
