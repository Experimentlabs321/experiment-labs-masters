//EarningLogicDetails

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const EarningLogicDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/earningLogic/organizationsId/${userInfo?.organizationId}`
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
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/earningLogic/organizationsId/${userInfo?.organizationId}`
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

        const newEarningLogicsName = form.earningLogics?.value;
        const newSearchName = form.search?.value;
        const newSelectCourseName = form.selectCourse?.value;
        const newSetEarningLogicsName = form.setEarningLogics?.value;
        const newEarningCategoryName = form.earningCategory?.value;
        const newEditCategoryNameName = form.editCategoryName?.value;
        const newDeleteCategoryName = form.deleteCategory?.value;
        const newCategoryNameName = form.categoryName?.value;
        const newUpdateName = form.update?.value;
        const newTotalWeightName = form.totalWeight?.value;
        const newAreYouSureName = form.areYouSure?.value;
        const newOnceDeletedTheCategoryWillNotRecoverName = form.onceDeletedTheCategoryWillNotRecover?.value;
        const newDeleteName = form.delete?.value;
        const newCancelName = form.cancel?.value;
        const newAddDetailsName = form.addDetails?.value;
        const newEditItemName = form.editItem?.value;
        const newDeleteItemName = form.deleteItem?.value;
        const newUploadIconName = form.uploadIcon?.value;
        const newEarningPointCategoryName = form.earningPointCategory?.value;
        const newEarningPointItemName = form.earningPointItem?.value;
        const newItemEarningValueName = form.itemEarningValue?.value;
        const newAutomatedName = form.automated?.value;
        const newManualName = form.manual?.value;
        const newWeekOneItemValueName = form.weekOneItemValue?.value;
        const newWeekTwoUpdateItemValueName = form.weekTwoUpdateItemValue?.value;
        const newWeekTwoItemValueName = form.weekTwoItemValue?.value;
        const newWeekFourUpdateItemValueName = form.weekFourUpdateItemValue?.value;
        const newProceedName = form.proceed?.value;
        const noCourseAddedYet = form.noCourseAddedYet?.value;
        const thereIsNoCourse = form.thereIsNoCourse?.value;
        const pleaseCreateACourseFirst = form.pleaseCreateACourseFirst?.value;
        const name = form.name?.value;
        const addedWeight = form.addedWeight?.value;
        const pleaseAddCategory = form.pleaseAddCategory?.value;
       

        const itemDetail = {
            earningLogics: newEarningLogicsName,
            search: newSearchName,
            selectCourse: newSelectCourseName,
            setEarningLogics: newSetEarningLogicsName,
            earningCategory: newEarningCategoryName,
            editCategoryName: newEditCategoryNameName,
            deleteCategory: newDeleteCategoryName,
            categoryName: newCategoryNameName,
            update: newUpdateName,
            totalWeight: newTotalWeightName,
            areYouSure: newAreYouSureName,
            onceDeletedTheCategoryWillNotRecover: newOnceDeletedTheCategoryWillNotRecoverName,
            delete: newDeleteName,
            cancel: newCancelName,
            addDetails: newAddDetailsName,
            editItem: newEditItemName,
            deleteItem: newDeleteItemName,
            uploadIcon: newUploadIconName,
            earningPointCategory: newEarningPointCategoryName,
            earningPointItem: newEarningPointItemName,
            itemEarningValue: newItemEarningValueName,
            automated: newAutomatedName,
            manual: newManualName,
            weekOneItemValue: newWeekOneItemValueName,
            weekTwoUpdateItemValue: newWeekTwoUpdateItemValueName,
            weekTwoItemValue: newWeekTwoItemValueName,
            weekFourUpdateItemValue: newWeekFourUpdateItemValueName,
            proceed: newProceedName,
            noCourseAddedYet: noCourseAddedYet,
            thereIsNoCourse: thereIsNoCourse,
            pleaseCreateACourseFirst: pleaseCreateACourseFirst,
            name: name,
            addedWeight: addedWeight,
            pleaseAddCategory: pleaseAddCategory,
           

        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addPointsAndRedemptionsSubDetails/earningLogic/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Points And RedemptionsSubDetails updated successfully") {
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
                                <p className='text-lg font-medium'>Earning Logics</p>
                                <input name='earningLogics' defaultValue={itemDetails?.earningLogics} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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
                                <p className='text-lg font-medium'>Set Earning Logics</p>
                                <input name='setEarningLogics' defaultValue={itemDetails?.setEarningLogics} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Earning Category</p>
                                <input name='earningCategory' defaultValue={itemDetails?.earningCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Category Name</p>
                                <input name='editCategoryName' defaultValue={itemDetails?.editCategoryName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Category</p>
                                <input name='deleteCategory' defaultValue={itemDetails?.deleteCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Category Name</p>
                                <input name='categoryName' defaultValue={itemDetails?.categoryName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Update</p>
                                <input name='update' defaultValue={itemDetails?.update} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Total Weight</p>
                                <input name='totalWeight' defaultValue={itemDetails?.totalWeight} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Please create a course first</p>
                                <input name='pleaseCreateACourseFirst' defaultValue={itemDetails?.pleaseCreateACourseFirst} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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
                                <p className='text-lg font-medium'>Add Details</p>
                                <input name='addDetails' defaultValue={itemDetails?.addDetails} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Edit Item</p>
                                <input name='editItem' defaultValue={itemDetails?.editItem} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Item</p>
                                <input name='deleteItem' defaultValue={itemDetails?.deleteItem} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Upload Icon</p>
                                <input name='uploadIcon' defaultValue={itemDetails?.uploadIcon} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Earning Point Category</p>
                                <input name='earningPointCategory' defaultValue={itemDetails?.earningPointCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Earning Point Item</p>
                                <input name='earningPointItem' defaultValue={itemDetails?.earningPointItem} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Item Earning Value</p>
                                <input name='itemEarningValue' defaultValue={itemDetails?.itemEarningValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Automated</p>
                                <input name='automated' defaultValue={itemDetails?.automated} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Manual</p>
                                <input name='manual' defaultValue={itemDetails?.manual} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week 1 Item Value</p>
                                <input name='weekOneItemValue' defaultValue={itemDetails?.weekOneItemValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week 2 update Item Value</p>
                                <input name='weekTwoUpdateItemValue' defaultValue={itemDetails?.weekTwoUpdateItemValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>No course added yet</p>
                                <input name='noCourseAddedYet' defaultValue={itemDetails?.noCourseAddedYet} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>There is no course</p>
                                <input name='thereIsNoCourse' defaultValue={itemDetails?.thereIsNoCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week 2 Item Value</p>
                                <input name='weekTwoItemValue' defaultValue={itemDetails?.weekTwoItemValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Week 4 update Item Value</p>
                                <input name='weekFourUpdateItemValue' defaultValue={itemDetails?.weekFourUpdateItemValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Proceed</p>
                                <input name='proceed' defaultValue={itemDetails?.proceed} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Name</p>
                                <input name='name' defaultValue={itemDetails?.name} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Added Weight</p>
                                <input name='addedWeight' defaultValue={itemDetails?.addedWeight} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Please Add Category</p>
                                <input name='pleaseAddCategory' defaultValue={itemDetails?.pleaseAddCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Item Value</p>
                                <input name='Item Value' defaultValue={itemDetails?.pleaseAddCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default EarningLogicDetails;