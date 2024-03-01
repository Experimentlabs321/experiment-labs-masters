//AdminFeedbackSettingsDetails



import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const AdminFeedbackSettingsDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getFeedbackSubDetailsByOrganizationAndName/feedbackSettings/organizationsId/${userInfo?.organizationId}`
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
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getFeedbackSubDetailsByOrganizationAndName/feedbackSettings/organizationsId/${userInfo?.organizationId}`
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

        const newSelectCourseName = form.selectCourse?.value;
        const newSetFeedbacksName = form.setFeedbacks?.value;
        const newFeedbackCategoryName = form.feedbackCategory?.value;
        const newEditCategoryNameName = form.editCategoryName?.value;
        const newCategoryNameName = form.categoryName?.value;
        const newUpdateName = form.update?.value;
        const newRatingName = form.rating?.value;
        const newAreYouSureName = form.areYouSure?.value;
        const newOnceDeletedTheCategoryWillNotRecoverName = form.onceDeletedTheCategoryWillNotRecover?.value;
        const newDeleteName = form.delete?.value;
        const newCancelName = form.cancel?.value;
        const newEditItemName = form.editItem?.value;
        const newDeleteCategoryName = form.deleteCategory?.value;
        const newDeleteItemName = form.deleteItem?.value;
        const newOnceDeletedTheItemWillNotRecoverName = form.onceDeletedTheItemWillNotRecover?.value;
        const newAddDetailsName = form.addDetails?.value;
    //    const newFeedbackCategoryName = form.feedbackCategory?.value;
        const newFeedbackItemNameName = form.feedbackItemName?.value;
        const newUploadIconName = form.uploadIcon?.value;
        const newBrowserName = form.browser?.value;
        const newItemRatingName = form.itemRating?.value;
        const newGiveAccessName = form.giveAccess?.value;
        const newExecutionMentorName = form.executionMentor?.value;
        const newExpertMentorName = form.expertMentor?.value;
        const newProceedName = form.proceed?.value;
      

        const itemDetail = {
         
            selectCourse: newSelectCourseName,
            setFeedbacks: newSetFeedbacksName,
            editCategoryName: newEditCategoryNameName,
            feedbackCategory: newFeedbackCategoryName,
            categoryName: newCategoryNameName,
            deleteCategory: newDeleteCategoryName,
            update: newUpdateName,
            rating: newRatingName,
            areYouSure: newAreYouSureName,
            onceDeletedTheCategoryWillNotRecover: newOnceDeletedTheCategoryWillNotRecoverName,
            delete: newDeleteName,
            cancel: newCancelName,
            editItem: newEditItemName,
            deleteItem: newDeleteItemName,
            onceDeletedTheItemWillNotRecover: newOnceDeletedTheItemWillNotRecoverName,
            addDetails: newAddDetailsName,
          //  feedbackCategory: newFeedbackCategoryName,
          feedbackItemName: newFeedbackItemNameName,
            uploadIcon: newUploadIconName,
            browser: newBrowserName,
            itemRating: newItemRatingName,
            giveAccess: newGiveAccessName,
            executionMentor: newExecutionMentorName,
            expertMentor: newExpertMentorName,
            proceed: newProceedName,
           



        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addFeedbackSubDetails/feedbackSettings/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Feedback SubDetails updated successfully") {
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
                                <p className='text-lg font-medium'>Select Course</p>
                                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Set Feedbacks</p>
                                <input name='setFeedbacks' defaultValue={itemDetails?.setFeedbacks} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Feedback Category</p>
                                <input name='feedbackCategory' defaultValue={itemDetails?.feedbackCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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
                                <p className='text-lg font-medium'>Rating</p>
                                <input name='rating' defaultValue={itemDetails?.rating} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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
                                <p className='text-lg font-medium'>Edit Item</p>
                                <input name='editItem' defaultValue={itemDetails?.editItem} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Delete Item</p>
                                <input name='deleteItem' defaultValue={itemDetails?.deleteItem} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Once deleted, the Item will not recover</p>
                                <input name='onceDeletedTheItemWillNotRecover' defaultValue={itemDetails?.onceDeletedTheItemWillNotRecover} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add Details</p>
                                <input name='addDetails' defaultValue={itemDetails?.addDetails} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                         
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Feedback Item Name</p>
                                <input name='feedbackItemName' defaultValue={itemDetails?.feedbackItemName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Upload Icon</p>
                                <input name='uploadIcon' defaultValue={itemDetails?.uploadIcon} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Browser</p>
                                <input name='browser' defaultValue={itemDetails?.browser} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Item Rating</p>
                                <input name='itemRating' defaultValue={itemDetails?.itemRating} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Give Access</p>
                                <input name='giveAccess' defaultValue={itemDetails?.giveAccess} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Execution mentor</p>
                                <input name='executionMentor' defaultValue={itemDetails?.executionMentor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Expert mentor</p>
                                <input name='expertMentor' defaultValue={itemDetails?.expertMentor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AdminFeedbackSettingsDetails;