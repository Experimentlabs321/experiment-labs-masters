import React from "react";
import Parameters from "./Parameters";

const EditSkillForm = ({
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
  selectedSkill,
  setIsOpenSkillEditForm,
}) => {
  setParameters(selectedSkill?.parameters);
  const handleEditSkill = () => {};
  return (
    <>
      <div className="px-4 my-[40px]">
        <div className=" border-[#B7B7B7] relative border p-8 rounded-lg ">
          <div className="absolute top-2 right-2 ">
            <button
              onClick={() => setIsOpenSkillEditForm(false)}
              className="flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleEditSkill} className="w-full">
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
                      Skill Category
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
                      defaultValue={selectedSkillCategory?.categoryName}
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
                      Skill Name
                    </label>
                    <input
                      id="skillName"
                      name="skillName"
                      defaultValue={selectedSkill?.skillName}
                      placeholder="Skill Name"
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <>
                    <Parameters
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
                <p className="w-[145px] text-[16px] font-[600]">Description</p>
              </div>
              <div class="w-full pl-8 mt-4 flex justify-center items-center col-span-2 ">
                <textarea
                  defaultValue={selectedSkill?.description}
                  name="description"
                  id="description"
                  rows={3}
                  className=" w-full p-4"
                  type="text"
                  placeholder="Description"
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

export default EditSkillForm;
