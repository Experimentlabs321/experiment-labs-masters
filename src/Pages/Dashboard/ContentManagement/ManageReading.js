
import Layout from '../Layout';
import required from '../../../assets/ContentManagement/required.png'
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const ManageReading = () => {

    // upload file
    const [dragActive, setDragActive] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };



    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
            console.log(form.readingTopicName)
        const readingTopicName = form.readingTopicName?.value;
       



        const manageReading = {
            readingTopicName,
            additionalFiles : selectedFile,

        }

        console.log(manageReading)


    }


    return (
        <div>
            <Layout>
                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Reading in Topic 1</p>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex  me-20 py-[35px] ps-[40px]'>
                        <div className='w-full'>
                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <p className='h-2 w-2 bg-black rounded-full'></p>
                                    <p className='font-bold text-lg me-[36px]'>Reading Topic Name</p>
                                    <img src={required} />
                                </div>

                                <input required className='mt-6 ms-6 border rounded-md w-5/6 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='readingTopicName' type="text" placeholder='Eg. Entrepreneurship Lab' />
                            </div>

                            <div className='mt-12 flex flex-col'>
                                <div className='flex items-center gap-4'>
                                    <p className='h-2 w-2 bg-black rounded-full'></p>
                                    <p className='font-bold text-lg me-[36px]'>Additional Files </p>

                                </div>

                                <div className='w-5/6 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6'
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={{
                                        border: "0.917px dashed #000",
                                        background: "#F6F7FF"
                                    }}

                                >
                                    {dragActive ? (<>
                                        <CloudUploadIcon />
                                        <p className='text-[17px] font-semibold'>Drag and drop </p>
                                        <p className='text-sm font-medium'>Or</p>
                                    </>
                                    ) : (
                                        selectedFile && <p>Selected file: {selectedFile.name}</p>
                                    )}
                                    {
                                        !selectedFile && (
                                            <input type="file" id="input-file-upload" onChange={handleFileChange} />
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-bold text-lg me-[36px]'>Reading Material </p>
                                <img src={required} />
                            </div>

                            <input required className='mt-6 ms-6 border rounded-md w-5/6 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                             name='readingMaterial' type="text" placeholder='Eg. Entrepreneurship Lab' />
                        </div>

                    </div>


                    <div className='flex items-center justify-center mt-20 mb-10'>
                        <input type="submit" value='Save' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                        <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                    </div>
                </form>


                <div className='flex'>
                      <div className='w-full'>1</div>
                      <div className='w-full'>2</div>
                </div>
            </Layout>
        </div>
    )
};


export default ManageReading;