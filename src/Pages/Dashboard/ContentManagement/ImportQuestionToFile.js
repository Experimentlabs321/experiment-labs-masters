
import required from '../../../assets/ContentManagement/required.png'
import chevronRight1 from '../../../assets/ContentManagement/chevronRight1.svg'
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const ImportQuestionToFile = () => {
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




    return (
        <div className="mx-10 my-20">
            <div className='flex'>

                <div className='w-full'>
                    <div className=''>
                        <div className='flex items-center gap-4'>
                            <p className='h-2 w-2 bg-black rounded-full'></p>
                            <p className='font-bold text-lg me-[36px]'>File Name</p>
                            <img src={required} />
                        </div>
                        <div className='flex flex-col gap-5 ms-5 mt-5 text-lg font-medium'>
                            <div >
                                <input type="radio" id="Word format" name="FileName" value="Word format" />
                                <label className='ms-5' for="Word format">Word format</label>
                            </div>
                            <div>
                                <input type="radio" id="XML format" name="FileName" value="XML format" />
                                <label className='ms-5' for="XML format">XML format</label>
                            </div>


                        </div>


                    </div>

                </div>

                <div className=' w-full'>
                    <div className=' flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <p className='h-2 w-2 bg-black rounded-full'></p>
                            <p className='font-bold text-lg me-[36px]'>Upload Files</p>
                            <img src={required} />

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
                                <CloudUploadIcon />
                                <p className='text-[17px] font-semibold mb-3 mt-3'>Drag and drop </p>
                                <p className='text-sm font-medium mb-3'>Or</p>
                            </>
                            ) : (
                                selectedFile && <p>Selected file: {selectedFile.name}</p>
                            )}
                            {
                                !selectedFile && (
                                    <>
                                        <div className='flex gap-2 justify-center w-full'>
                                            <label className='flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold' htmlFor="input-file-upload">Browser</label>
                                            <input
                                                className='w-[1%]'
                                                style={{ fontSize: "0", opacity: "0" }}
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                name='input-file-upload'
                                                id="input-file-upload"
                                                onChange={handleFileChange}
                                                multiple

                                            />

                                        </div>
                                    </>
                                    // <input type="file" id="input-file-upload" onChange={handleFileChange} />
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
};


export default ImportQuestionToFile;