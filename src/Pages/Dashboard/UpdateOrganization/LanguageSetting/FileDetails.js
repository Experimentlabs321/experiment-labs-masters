//FileDetails

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const FileDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/file/organizationsId/${userInfo?.organizationId}`
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
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/file/organizationsId/${userInfo?.organizationId}`
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

        const newManageFileInName = form.manageFileIn?.value;
        const newPreviewModeName = form.previewMode?.value;
        const newFileTopicNameName = form.fileTopicName?.value;
        const newUploadFileName = form.uploadFile?.value;
        const newDragAndDropName = form.dragAndDrop?.value;
        const newOrName = form.or?.value;
        const newBrowserName = form.browser?.value;

        const newSelectBatchName = form.selectBatch?.value;
        const newEnableDripName = form.enableDrip?.value;
        const newYesName = form.yes?.value;
        const newNoName = form.no?.value;
        const newCompletionParameterName = form.completionParameter?.value;
        const newMakeAsCompletedName = form.makeAsCompleted?.value;
        const newWithoutQuizName = form.withoutQuiz?.value;
        const newWithQuizName = form.withQuiz?.value;
        const newSaveName = form.save?.value;

        const itemDetail = {
            manageFileIn: newManageFileInName,
            previewMode: newPreviewModeName,
            fileTopicName: newFileTopicNameName,
            uploadFile: newUploadFileName,
            dragAndDrop: newDragAndDropName,
            or: newOrName,
            browser: newBrowserName,
            selectBatch: newSelectBatchName,
            enableDrip: newEnableDripName,
            yes: newYesName,
            no: newNoName,
            completionParameter: newCompletionParameterName,
            makeAsCompleted: newMakeAsCompletedName,
            withoutQuiz: newWithoutQuizName,
            withQuiz: newWithQuizName,
            save: newSaveName,

        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/file/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Content Manage Sub Details updated successfully") {
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
                                <p className='text-lg font-medium'>Manage File in</p>
                                <input name='manageFileIn' defaultValue={itemDetails?.manageFileIn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Preview Mode</p>
                                <input name='previewMode' type='text' defaultValue={itemDetails?.previewMode} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>File Name</p>
                                <input name='fileName' defaultValue={itemDetails?.fileName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Upload File</p>
                                <input name='uploadFile' defaultValue={itemDetails?.uploadFile} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Drag and drop</p>
                                <input name='dragAndDrop' defaultValue={itemDetails?.dragAndDrop} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Or</p>
                                <input name='or' type='text' defaultValue={itemDetails?.or} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Browser</p>
                                <input name='browser' type='text' defaultValue={itemDetails?.browser} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>

                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Select Batch</p>
                                <input name='selectBatch' defaultValue={itemDetails?.selectBatch} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Enable Drip</p>
                                <input name='enableDrip' defaultValue={itemDetails?.enableDrip} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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
                                <p className='text-lg font-medium'>Completion Parameter</p>
                                <input name='completionParameter' defaultValue={itemDetails?.completionParameter} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Make as completed</p>
                                <input name='makeAsCompleted' defaultValue={itemDetails?.makeAsCompleted} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Without Quiz</p>
                                <input name='withoutQuiz' type='text' defaultValue={itemDetails?.withoutQuiz} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>With Quiz</p>
                                <input name='withQuiz' type='text' defaultValue={itemDetails?.withQuiz} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default FileDetails;