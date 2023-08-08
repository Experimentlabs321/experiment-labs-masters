
import required from '../../../assets/ContentManagement/required.png'
import chevronRight1 from '../../../assets/ContentManagement/chevronRight1.svg'
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const ExportQuesToFile = () => {





    return (
        <div className="mx-10 my-20">
            <div className=''>
                <div className=' w-[30%] flex items-center mb-10'>
                    <div className="flex items-center gap-4">

                        <p className="text-lg font-semibold">
                            Select Batch
                        </p>

                    </div>

                    <div className=" flex gap-2  ms-6 border rounded-md w-[35%] h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                        <select
                            required
                            className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                            name="courseCategory"
                        // id="option"
                        >
                            <option className="" selected>
                                Batch 1
                            </option>
                            <option value="Parent"></option>
                            <option value="Counselor"></option>
                            <option value="Others"></option>
                        </select>

                    </div>
                </div>


                <div className=''>
                    <div className=''>
                        <div className='flex items-center gap-4'>
                            <p className='h-2 w-2 bg-black rounded-full'></p>
                            <p className='font-bold text-lg me-[36px]'>File Format</p>
                            <img src={required} />
                        </div>
                        <div className='flex flex-col gap-5 ms-5 mt-5 text-lg font-medium'>
                            <div >
                                <input type="radio" id="Word format" name="FileName" value="Word format" />
                                <label className='ms-5' for="Word format">XHTML format</label>
                            </div>
                            <div>
                                <input type="radio" id="XML format" name="FileName" value="XML format" />
                                <label className='ms-5' for="XML format">Moodle XML format</label>
                            </div>


                        </div>


                    </div>

                </div>


            </div>


        </div >
    )
};


export default ExportQuesToFile;