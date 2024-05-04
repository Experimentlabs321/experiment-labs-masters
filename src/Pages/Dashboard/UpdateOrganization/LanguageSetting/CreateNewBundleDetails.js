//CreateNewBundleDetails

import React, { useContext, useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';


const CreateNewBundleDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/createNewBundle/organizationsId/${userInfo?.organizationId}`
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
    console.log(itemDetails)
    const fetchContentDetails = () => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/createNewBundle/organizationsId/${userInfo?.organizationId}`
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

        const newCreateOrEditBundleName = form.createOrEditBundle?.value;
        const newSelectCoursesName = form.selectCourses?.value;
        const newStartTypingToSelectCoursesName = form.startTypingToSelectCourses?.value;
        const newBundleOrPackageFullNameName = form.bundleOrPackageFullName?.value;
        const newBundleOrPackageThumbnailName = form.bundleOrPackageThumbnail?.value;
        const newBrowseName = form.browse?.value;
        const newChooseFileName = form.chooseFile?.value;
        const newNoFileChosenName = form.noFileChosen?.value;
        const newBundleOrPackageShortName = form.bundleOrPackageShortName?.value;
        const newBundleOrPackageVisibilityName = form.bundleOrPackageVisibility?.value;
        const newHideName = form.hide?.value;
        const newShowName = form.show?.value;
        const newBundleOrPackageStartingDateAndTimeName = form.bundleOrPackageStartingDateAndTime?.value;
        const newBundleOrPackageIDNumberName = form.bundleOrPackageIDNumber?.value;
        const newBundleOrPackageEndingDateAndTimeName = form.bundleOrPackageEndingDateAndTime?.value;
        const newPriceName = form.price?.value;
        const newBundleOrPackageDescriptionName = form.bundleOrPackageDescription?.value;
        const newBundleOrPackagePurchaseUrlName = form.bundleOrPackagePurchaseUrl?.value;
        const newSaveName = form.save?.value;

        const itemDetail = {
            createOrEditBundle: newCreateOrEditBundleName,
            selectCourses: newSelectCoursesName,
            startTypingToSelectCourses: newStartTypingToSelectCoursesName,
            bundleOrPackageFullName: newBundleOrPackageFullNameName,
            bundleOrPackageThumbnail: newBundleOrPackageThumbnailName,
            browse: newBrowseName,
            chooseFile: newChooseFileName,
            noFileChosen: newNoFileChosenName,
            bundleOrPackageShortName: newBundleOrPackageShortName,
            bundleOrPackageVisibility: newBundleOrPackageVisibilityName,
            hide: newHideName,
            show: newShowName,
            bundleOrPackageStartingDateAndTime: newBundleOrPackageStartingDateAndTimeName,
            bundleOrPackageIDNumber: newBundleOrPackageIDNumberName,
            bundleOrPackageEndingDateAndTime: newBundleOrPackageEndingDateAndTimeName,
            price: newPriceName,
            bundleOrPackageDescription: newBundleOrPackageDescriptionName,
            bundleOrPackagePurchaseUrl: newBundleOrPackagePurchaseUrlName,
            save: newSaveName,

        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/createNewBundle/organizationId/${userInfo?.organizationId}`,
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
                                <p className='text-lg font-medium'>Create/Edit Bundle</p>
                                <input name='createOrEditBundle' defaultValue={itemDetails?.createOrEditBundle} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Courses</p>
                                <input name='selectCourses' defaultValue={itemDetails?.selectCourses} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Start typing to select courses</p>
                                <input name='startTypingToSelectCourses' defaultValue={itemDetails?.startTypingToSelectCourses} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Full Name</p>
                                <input name='bundleOrPackageFullName' defaultValue={itemDetails?.bundleOrPackageFullName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Thumbnail</p>
                                <input name='bundleOrPackageThumbnail' defaultValue={itemDetails?.bundleOrPackageThumbnail} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Browse</p>
                                <input name='browse' type='text' defaultValue={itemDetails?.browse} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Choose File</p>
                                <input name='chooseFile' type='text' defaultValue={itemDetails?.chooseFile} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>No File chosen</p>
                                <input name='noFileChosen' type='text' defaultValue={itemDetails?.noFileChosen} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Short Name</p>
                                <input name='bundleOrPackageShortName' defaultValue={itemDetails?.bundleOrPackageShortName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Visibility</p>
                                <input name='bundleOrPackageVisibility' defaultValue={itemDetails?.bundleOrPackageVisibility} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Hide</p>
                                <input name='hide' defaultValue={itemDetails?.hide} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Show</p>
                                <input name='show' defaultValue={itemDetails?.show} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Starting Date and Time</p>
                                <input name='bundleOrPackageStartingDateAndTime' defaultValue={itemDetails?.bundleOrPackageStartingDateAndTime} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package ID Number</p>
                                <input name='bundleOrPackageIDNumber' defaultValue={itemDetails?.bundleOrPackageIDNumber} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Ending Date and Time</p>
                                <input name='bundleOrPackageEndingDateAndTime' defaultValue={itemDetails?.bundleOrPackageEndingDateAndTime} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Price</p>
                                <input name='price' type='text' defaultValue={itemDetails?.price} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package Description</p>
                                <input name='bundleOrPackageDescription' defaultValue={itemDetails?.bundleOrPackageDescription} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Bundle or Package purchase url</p>
                                <input name='bundleOrPackagePurchaseUrl' defaultValue={itemDetails?.bundleOrPackagePurchaseUrl} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default CreateNewBundleDetails;