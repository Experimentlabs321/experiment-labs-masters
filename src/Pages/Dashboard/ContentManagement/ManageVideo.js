
import Layout from '../Layout';
import required from '../../../assets/ContentManagement/required.png'
import youtube from '../../../assets/ContentManagement/youtube.svg'
import videoplay from '../../../assets/ContentManagement/videoplay.png'
import { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const ManageVideo = () => {

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




        const ManageVideo = {
            readingTopicName,
            additionalFiles: selectedFile,

        }

        console.log(ManageVideo)


    }





    return (
        <div>
            <Layout>
                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Video in Topic 1</p>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex  me-20 py-[35px] ps-[40px]'>
                        <div className='w-full'>
                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <p className='h-2 w-2 bg-black rounded-full'></p>
                                    <p className='font-bold text-lg me-[36px]'>Video Topic Name</p>
                                    <img src={required} />
                                </div>

                                <input required className='mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='readingTopicName' type="text" placeholder='Eg. Entrepreneurship Lab' />
                            </div>


                        </div>
                        <div className='w-full'>
                            <div className=' flex flex-col'>
                                <div className='flex items-center gap-4'>
                                    <p className='h-2 w-2 bg-black rounded-full'></p>
                                    <p className='font-bold text-lg me-[36px]'>Upload Video</p>

                                </div>

                                <div className='w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6'
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
                                        <img src={videoplay} />
                                        <p className='text-[17px] font-semibold mb-5'>Drag and drop </p>
                                        <p className='text-sm font-medium mb-5'>Or</p>
                                    </>
                                    ) : (
                                        selectedFile && <p>Selected file: {selectedFile.name}</p>
                                    )}
                                    {
                                        !selectedFile && (<>

                                            <div className='flex gap-2 justify-center w-full'>
                                                <label className='flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold' htmlFor="input-file-upload">Browser</label>
                                                <input
                                                    className='w-[1%]'
                                                    style={{ fontSize: "0", opacity: "0" }}
                                                    type="file"
                                                    accept="video/*"
                                                    name='input-file-upload'
                                                    id="input-file-upload"
                                                    onChange={handleFileChange}
                                                    multiple

                                                />
                                                 <div className=''>
                                                    <div className='flex items-center px-3 py-2 rounded-lg bg-[#D21B1B] text-xs font-bold text-[#fff]'>
                                                      <img src={youtube}/> 
                                                    <p className=''>Youtube</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>


                                            {/*         <div className='flex   w-full'>
                                                <div>
                                                    
                                                <input className='w-2/3' type="file" accept=".jpg, .jpeg, .png" name='input-file-upload'  id="input-file-upload" onChange={handleFileChange} 
                                                 
                                                />
                                                </div>
                                               
                                                <div className='w-2/3'>
                                                    <p>Youtube</p>
                                                </div>
                                            </div> */}

                                        </>

                                        )
                                    }

                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='flex items-center justify-center mt-20 mb-10'>
                        <input type="submit" value='Save' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                        <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                    </div>
                </form>



            </Layout>
        </div >
    )
};


export default ManageVideo;