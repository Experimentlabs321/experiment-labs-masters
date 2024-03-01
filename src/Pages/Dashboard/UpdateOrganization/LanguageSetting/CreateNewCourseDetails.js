//CreateNewCourseDetails

import React, { useContext, useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';

const CreateNewCourseDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();

    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/createNewCourse/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {
                    setItemDetails(response?.data);

                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
        setAdminLoading(false);
    }, [userInfo]);
    
    const fetchContentDetails = () => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/createNewCourse/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {
                    setItemDetails(response?.data);
                })
                .finally(() => {
                    setAdminLoading(false);
                });
        }
    };

    console.log(itemDetails)

    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.target;

        const newCreateOrEditCourseName = form.createOrEditCourse?.value;
        const newGeneralCourseInformationName = form.generalCourseInformation?.value;
        const newCourseFullName = form.courseFullName?.value;
        const newCourseCategoryName = form.courseCategory?.value;
        const newSelectCategoryName = form.selectCategory?.value;
        const newAddName = form.add?.value;
        const newCourseShortName = form.courseShortName?.value;
        const newCourseThumbnailName = form.courseThumbnail?.value;
        const newBrowseName = form.browse?.value;
        const newCourseStartingDateAndTimeName = form.courseStartingDateAndTime?.value;
        const newCourseVisibilityName = form.courseVisibility?.value;
        const newHideName = form.hide?.value;
        const newShowName = form.show?.value;
        const newCourseEndingDateAndTimeName = form.courseEndingDateAndTime?.value;
        const newCourseIDNumberName = form.courseIDNumber?.value;
        const newCourseDescriptionName = form.courseDescription?.value;
        const newExpirationDayName = form.expirationDay?.value;
        const newCoursePurchaseUrlName = form.coursePurchaseUrl?.value;
        const newPriceName = form.price?.value;
        const newCourseFormatName = form.courseFormat?.value;
        const newNumberOfWeeksOrChaptersName = form.numberOfWeeksOrChapters?.value;
        const newGradesFormatName = form.gradesFormat?.value;
        const newShowActivityReportsName = form.showActivityReports?.value;
        const newYesName = form.yes?.value;
        const newNoName = form.no?.value;
        const newGroupsName = form.groups?.value;
        const newShowActivityDatesName = form.showActivityDates?.value;
        const newCompletionTrackingName = form.completionTracking?.value;
        const newEnableCompletionTrackingName = form.enableCompletionTracking?.value;
        const newEnableDripName = form.enableDrip?.value;
        const newShowActivityCompletionConditionsName = form.showActivityCompletionConditions?.value;
        const newSaveName = form.save?.value;

        const itemDetail = {
            createOrEditCourse: newCreateOrEditCourseName,
            generalCourseInformation: newGeneralCourseInformationName,
            courseFullName: newCourseFullName,
            courseCategory: newCourseCategoryName,
            selectCategory: newSelectCategoryName,
            add: newAddName,
            courseShortName: newCourseShortName,
            courseThumbnail: newCourseThumbnailName,
            browse: newBrowseName,
            courseStartingDateAndTime: newCourseStartingDateAndTimeName,
            courseVisibility: newCourseVisibilityName,
            hide: newHideName,
            show: newShowName,
            courseEndingDateAndTime: newCourseEndingDateAndTimeName,
            courseIDNumber: newCourseIDNumberName,
            courseDescription: newCourseDescriptionName,
            expirationDay: newExpirationDayName,
            coursePurchaseUrl: newCoursePurchaseUrlName,
            price: newPriceName,
            courseFormat: newCourseFormatName,
            numberOfWeeksOrChapters: newNumberOfWeeksOrChaptersName,
            gradesFormat: newGradesFormatName,
            showActivityReports: newShowActivityReportsName,
            yes: newYesName,
            no: newNoName,
            groups: newGroupsName,
            showActivityDates: newShowActivityDatesName,
            completionTracking: newCompletionTrackingName,
            enableCompletionTracking: newEnableCompletionTrackingName,
            enableDrip: newEnableDripName,
            showActivityCompletionConditions: newShowActivityCompletionConditionsName,
            save: newSaveName,

        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/language/addContentManageSubDetails/createNewCourse/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Content Manage Sub Details updated successfully") {
            setItemDetails({ ...itemDetails });
            fetchContentDetails();
            toast.success("Items Name added Successfully");
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
                                <p className='text-lg font-medium'>Create/Edit Course</p>
                                <input name='createOrEditCourse' defaultValue={itemDetails?.createOrEditCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>General course information</p>
                                <input name='generalCourseInformation' defaultValue={itemDetails?.generalCourseInformation} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Full Name</p>
                                <input name='courseFullName' type='text' defaultValue={itemDetails?.courseFullName} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Category</p>
                                <input name='courseCategory' defaultValue={itemDetails?.courseCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Category</p>
                                <input name='selectCategory' defaultValue={itemDetails?.selectCategory} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Add</p>
                                <input name='add' type='text' defaultValue={itemDetails?.add} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Short Name</p>
                                <input name='courseShortName' defaultValue={itemDetails?.courseShortName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Thumbnail</p>
                                <input name='courseThumbnail' defaultValue={itemDetails?.courseThumbnail} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Browse</p>
                                <input name='browse' type='text' defaultValue={itemDetails?.browse} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Starting Date and Time</p>
                                <input name='courseStartingDateAndTime' defaultValue={itemDetails?.courseStartingDateAndTime} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Visibility</p>
                                <input name='courseVisibility' type='text' defaultValue={itemDetails?.courseVisibility} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Hide</p>
                                <input name='hide' type='text' defaultValue={itemDetails?.hide} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Show</p>
                                <input name='show' type='text' defaultValue={itemDetails?.show} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Ending Date and Time</p>
                                <input name='courseEndingDateAndTime' type='text' defaultValue={itemDetails?.courseEndingDateAndTime} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course ID Number</p>
                                <input name='courseIDNumber' type='text' defaultValue={itemDetails?.courseIDNumber} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Description</p>
                                <input name='courseDescription' type='text' defaultValue={itemDetails?.courseDescription} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Expiration Day</p>
                                <input name='expirationDay' type='text' defaultValue={itemDetails?.expirationDay} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course purchase url</p>
                                <input name='coursePurchaseUrl' type='text' defaultValue={itemDetails?.coursePurchaseUrl} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Price</p>
                                <input name='price' type='text' defaultValue={itemDetails?.price} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Course Format</p>
                                <input name='courseFormat' type='text' defaultValue={itemDetails?.courseFormat} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Number of Weeks/Chapters</p>
                                <input name='numberOfWeeksOrChapters' defaultValue={itemDetails?.numberOfWeeksOrChapters} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Grades Format</p>
                                <input name='gradesFormat' defaultValue={itemDetails?.gradesFormat} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Show activity reports</p>
                                <input name='showActivityReports' defaultValue={itemDetails?.showActivityReports} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Yes</p>
                                <input name='yes' type='text' defaultValue={itemDetails?.yes} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>No</p>
                                <input name='no' type='text' defaultValue={itemDetails?.no} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Groups</p>
                                <input name='groups' type='text' defaultValue={itemDetails?.groups} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Show activity dates</p>
                                <input name='showActivityDates' defaultValue={itemDetails?.showActivityDates} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Completion Tracking</p>
                                <input name='completionTracking' defaultValue={itemDetails?.completionTracking} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Enable Completion Tracking</p>
                                <input name='enableCompletionTracking' defaultValue={itemDetails?.enableCompletionTracking} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Enable Drip</p>
                                <input name='enableDrip' type='text' defaultValue={itemDetails?.enableDrip} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Show activity completion conditions</p>
                                <input name='showActivityCompletionConditions' defaultValue={itemDetails?.showActivityCompletionConditions} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Save</p>
                                <input name='save' type='text' defaultValue={itemDetails?.save} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default CreateNewCourseDetails;