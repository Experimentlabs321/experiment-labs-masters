//SkillsCreationsDetails.js


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const SkillsCreationsDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getSkillsManagementSubDetailsByOrganizationAndName/skillsCreations/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {

                    console.log(response)
                    setItemDetails(response?.data);

                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
        setAdminLoading(false);
    }, [userInfo]);
    console.log(itemDetails)
    const fetchContentDetails = () => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getSkillsManagementSubDetailsByOrganizationAndName/skillsCreations/organizationsId/${userInfo?.organizationId}`
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

        const newSkillsManagementName = form.skillsManagement?.value;
        const newSearchName = form.search?.value;
        const newSelectCourseName = form.selectCourse?.value;
        const newEditCategoryNameName = form.editCategoryName?.value;
        const newCategoryNameName = form.categoryName?.value;
        const newUpdateName = form.update?.value;
        const newAreYouSureName = form.areYouSure?.value;
        const newOnceDeletedTheCategoryWillNotRecoverName = form.onceDeletedTheCategoryWillNotRecover?.value;
        const newDeleteName = form.delete?.value;
        const newCancelName = form.cancel?.value;
        const newEditSkillName = form.editSkill?.value;
        const newDeleteCategoryName = form.deleteCategory?.value;
        const newDeleteSkillName = form.deleteSkill?.value;
        const newOnceDeletedTheSkillWillNotRecoverName = form.onceDeletedTheSkillWillNotRecover?.value;
        const newAddDetailsName = form.addDetails?.value;
        const newSkillCategoryName = form.skillCategory?.value;
        const newSkillNameName = form.skillName?.value;
        const newUploadIconName = form.uploadIcon?.value;
        const newDescriptionName = form.description?.value;
        const newEvaluationOnName = form.evaluationOn?.value;
        const newProceedName = form.proceed?.value;
        const newSelectSkillCategoryName = form.selectSkillCategory?.value;

     

        const itemDetail = {
            skillsManagement: newSkillsManagementName,
            search: newSearchName,
            selectCourse: newSelectCourseName,
            editCategoryName: newEditCategoryNameName,
            categoryName: newCategoryNameName,
            deleteCategory: newDeleteCategoryName,
            update: newUpdateName,
            areYouSure: newAreYouSureName,
            onceDeletedTheCategoryWillNotRecover: newOnceDeletedTheCategoryWillNotRecoverName,
            delete: newDeleteName,
            cancel: newCancelName,
            editSkill: newEditSkillName,
            deleteSkill: newDeleteSkillName,
            onceDeletedTheSkillWillNotRecover: newOnceDeletedTheSkillWillNotRecoverName,
            addDetails: newAddDetailsName,
            skillCategory: newSkillCategoryName,
            skillName: newSkillNameName,
            uploadIcon: newUploadIconName,
            description: newDescriptionName,
            evaluationOn: newEvaluationOnName,
            proceed: newProceedName,
            selectSkillCategory: newSelectSkillCategoryName,



        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addSkillsManagementSubDetails/skillsCreations/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Skills Management SubDetails updated successfully") {
            setItemDetails({ ...itemDetails });
            fetchContentDetails();
            toast.success("Items Names added Successfully");
            form.reset();
        }


    };

    return (
        <div>
            {
                adminLoading ?
                    <div className='flex justify-center'>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                    :
                    <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl'>
                        <div className=' grid grid-cols-2 gap-4'>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Skills Management</p>
                                <input name='skillsManagement' defaultValue={itemDetails?.skillsManagement} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Search</p>
                                <input name='search' defaultValue={itemDetails?.search} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Course</p>
                                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Skill Category</p>
                                <input name='selectSkillCategory' defaultValue={itemDetails?.selectSkillCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Category Name</p>
                                <input name='editCategoryName' defaultValue={itemDetails?.editCategoryName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Category Name</p>
                                <input name='categoryName' defaultValue={itemDetails?.categoryName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Category</p>
                                <input name='deleteCategory' defaultValue={itemDetails?.deleteCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Update</p>
                                <input name='update' defaultValue={itemDetails?.update} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Are you sure</p>
                                <input name='areYouSure' defaultValue={itemDetails?.areYouSure} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Once deleted, the category will not recover</p>
                                <input name='onceDeletedTheCategoryWillNotRecover' defaultValue={itemDetails?.onceDeletedTheCategoryWillNotRecover} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete</p>
                                <input name='delete' defaultValue={itemDetails?.delete} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Cancel</p>
                                <input name='cancel' defaultValue={itemDetails?.cancel} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Skill</p>
                                <input name='editSkill' defaultValue={itemDetails?.editSkill} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Skill</p>
                                <input name='deleteSkill' defaultValue={itemDetails?.deleteSkill} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Once deleted, the skill will not recover</p>
                                <input name='onceDeletedTheSkillWillNotRecover' defaultValue={itemDetails?.onceDeletedTheSkillWillNotRecover} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add Details</p>
                                <input name='addDetails' defaultValue={itemDetails?.addDetails} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Skill Category</p>
                                <input name='skillCategory' defaultValue={itemDetails?.skillCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Skill Name</p>
                                <input name='skillName' defaultValue={itemDetails?.skillName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Upload Icon</p>
                                <input name='uploadIcon' defaultValue={itemDetails?.uploadIcon} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Description</p>
                                <input name='description' defaultValue={itemDetails?.description} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Evaluation on</p>
                                <input name='evaluationOn' defaultValue={itemDetails?.evaluationOn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Proceed</p>
                                <input name='proceed' defaultValue={itemDetails?.proceed} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>


                        </div>
                        <div className="flex items-center justify-center mt-20 mb-10">
                            <input
                                type="submit"
                                value="Save"

                                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                            />

                        </div>

                    </form>
            }
        </div>

    );
};

export default SkillsCreationsDetails;