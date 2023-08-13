import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import Parameters from "../../../SkillsManagement/Parameters";

const AddEarningPointItemForm = ({
  setIsOpenSkillAddForm,
  UploadingImg,
  selectedSkillCategory,
  skillCategories,
  parameters,
  setParameters,
  allParameters,
  setSelectedSkillCategory,
  setSkillCategories,
  selectedCourse,
  userInfo,
}) => {
  const [itemValue, setItemValue] = useState(0);
  const handleAddSkill = async (event) => {
    event.preventDefault();
    if (
      selectedSkillCategory?.skills?.find(
        (item) => item?.skillName === event?.target?.skillName?.value
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The skill name is already exist!",
      });
      return;
    }

    const newSkill = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/skills`,
      {
        organizationId: userInfo?.organizationId,
        categoryName: selectedSkillCategory?.categoryName,
        courseId: selectedCourse?._id,
        skill: {
          skillName: event?.target?.skillName?.value,
          parameters: [...parameters],
          description: event?.target?.description?.value,
        },
      }
    );

    if (newSkill?.data?.acknowledged) {
      toast.success("Skill added Successfully");
      const selectedCategorySkills = selectedSkillCategory?.skills
        ? [
            ...selectedSkillCategory?.skills,
            {
              skillName: event?.target?.skillName?.value,
              parameters: [...parameters],
              description: event?.target?.description?.value,
            },
          ]
        : [
            {
              skillName: event?.target?.skillName?.value,
              parameters: [...parameters],
              description: event?.target?.description?.value,
            },
          ];
      setSelectedSkillCategory({
        categoryName: selectedSkillCategory?.categoryName,
        skills: selectedCategorySkills,
      });
      const otherCategories = skillCategories?.filter(
        (item) => selectedSkillCategory?.categoryName !== item?.categoryName
      );
      setSkillCategories([
        {
          categoryName: selectedSkillCategory?.categoryName,
          skills: selectedCategorySkills,
        },
        ...otherCategories,
      ]);
      setParameters([]);
      setIsOpenSkillAddForm(false);
      event.target.reset();
    }
  };
  return (
    <>
      <div className="px-4 my-[40px]">
        <div className=" border-[#B7B7B7] relative border p-8 rounded-lg ">
          <div className="absolute top-2 right-2 ">
            <button
              onClick={() => setIsOpenSkillAddForm(false)}
              className="flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleAddSkill} className="w-full">
            <div className="flex">
              <div
                style={{
                  backgroundImage: `url(${UploadingImg})`,
                  background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`,
                }}
                className="h-[170px] w-[170px] flex flex-col justify-center items-center mt-2 rounded-lg"
              >
                <img
                  className="h-[170px] w-[170px] rounded-lg"
                  src={UploadingImg}
                  alt="UploadingImg"
                />
                <p className="mt-[-38px] text-base font-semibold text-[#fff] mb-4">
                  Upload Icon
                </p>
              </div>
              <div className="w-full pl-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-2 sm:grid-cols-2 w-full">
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      Earning Point Category
                    </label>
                    <select
                      onChange={(e) =>
                        setSelectedSkillCategory(
                          skillCategories?.find(
                            (category) =>
                              category?.categoryName === e.target.value
                          )
                        )
                      }
                      name="skillCategory"
                      id="skillCategory"
                      className="block w-full px-2 py-2 mt-2 bg-white rounded-md border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value={selectedSkillCategory?.categoryName}>
                        {selectedSkillCategory?.categoryName}
                      </option>
                      {skillCategories?.map((skillCategory) => (
                        <>
                          {skillCategory?.categoryName !==
                            selectedSkillCategory?.categoryName && (
                            <option value={skillCategory?.categoryName}>
                              {skillCategory?.categoryName}
                            </option>
                          )}
                        </>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      Earning Point Item
                    </label>
                    <input
                      id="earningPointItem"
                      name="earningPointItem"
                      placeholder="Earning Point Item"
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div className=" flex flex-col justify-center ">
                    <p className="font-semibold text-[#000000]  py-2">
                      Item Earning Value
                    </p>
                    <div className=" flex gap-7 items-center  h-[40px]   text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name="status"
                          checked
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          Automated
                        </label>
                      </div>

                      <div>
                        <input
                          id="published"
                          class="peer/published me-2"
                          type="radio"
                          name="status"
                        />
                        <label
                          for="published"
                          class="peer-checked/published: font-normal"
                        >
                          Manual
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex  items-center ">
                    <p className="font-bold text-base me-5">Item Value</p>
                    <div className="text-[18px] w-[40%]  h-[40px] flex  ">
                      <button
                        type="button"
                        style={{
                          boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                        }}
                        className=" border w-[50%] text-[#000000] rounded-s-full text-center"
                        onClick={() => setItemValue(itemValue - 1)}
                      >
                        -
                      </button>
                      <input
                        value={itemValue}
                        onChange={(e) => setItemValue(parseInt(e.target.value))}
                        className="w-[60%] focus:outline-none flex justify-center items-center text-center font-sans"
                        type="number"
                      />
                      <button
                        type="button"
                        style={{
                          boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                        }}
                        className="border w-[50%] text-[#000000] rounded-e-full text-center"
                        onClick={() => setItemValue(itemValue + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" mt-5  ">
                  <input
                    type="submit"
                    value="Proceed"
                    className="bg-[#2EB0FB] hover:btn-goest rounded-lg p-2 font-semibold text-[#fff]"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5"></div>
      </div>
    </>
  );
};

export default AddEarningPointItemForm;
