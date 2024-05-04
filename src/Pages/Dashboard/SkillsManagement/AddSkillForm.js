import React from "react";
import Parameters from "./Parameters";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const AddSkillForm = ({
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
  itemDetails
}) => {
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
        text: itemDetails?.theSkillNameIsAlreadyExist ? itemDetails?.theSkillNameIsAlreadyExist : "The skill name is already exist!",
      });
      return;
    }

    const newSkill = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/skillCategories/skills`,
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
      toast.success(itemDetails?.skillAddedSuccessfully ? itemDetails?.skillAddedSuccessfully : "Skill added Successfully");
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
              onClick={() => {
                setIsOpenSkillAddForm(false);
                setParameters([]);
              }}
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
                { itemDetails?.uploadIcon ? itemDetails?.uploadIcon : "Upload Icon" }
                  
                </p>
              </div>
              <div className="w-full pl-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-2 sm:grid-cols-2 w-full">
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                    { itemDetails?.skillCategory ? itemDetails?.skillCategory : "Skill Category" }
                      
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
                    { itemDetails?.skillName ? itemDetails?.skillName : "Skill Name" }
                      
                    </label>
                    <input
                      id="skillName"
                      name="skillName"
                      placeholder="Skill Name"
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <>
                    <Parameters
                    itemDetails={itemDetails}
                      parameters={parameters}
                      setParameters={setParameters}
                      skillCategories={skillCategories}
                      allParameters={allParameters}
                    />
                  </>
                </div>
              </div>
            </div>
            <div className="flex items-center text-center">
              <div>
                <p className="w-[145px] text-[16px] font-[600]">
                { itemDetails?.description ? itemDetails?.description : "Description" }
                  </p>
              </div>
              <div class="w-full pl-8 mt-4 flex justify-center items-center col-span-2 ">
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  className=" w-full p-4"
                  type="text"
                  placeholder={ itemDetails?.description ? itemDetails?.description : "Description" }
                  style={{
                    borderRadius: "8px",
                    border: "1px solid var(--neutral-300, #BFBFBF)",
                  }}
                />
              </div>
              <div className="pl-5  ">
                <input
                  type="submit"
                  value="Proceed"
                  className="bg-[#2EB0FB] rounded-lg h-[30px] w-[95px] font-semibold text-[#fff]"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5"></div>
      </div>
    </>
  );
};

export default AddSkillForm;
