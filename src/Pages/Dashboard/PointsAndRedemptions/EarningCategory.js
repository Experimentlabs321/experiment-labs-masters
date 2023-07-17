import React, { useState } from 'react';
import img1 from '../../../assets/PointsRedemptions/uploadimg.png'
import joystick from '../../../assets/PointsRedemptions/joystick.svg'


const EarningCategory = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [itemValue, setitemValue] = useState(0);
    const [minValue, setminValue] = useState(0);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleButtonClick1 = () => {
        setIsPopupOpen1(true);
    };

    const handleClosePopup1 = () => {
        setIsPopupOpen1(false);
    };

    const handleButtonClick2 = () => {
        setIsPopupOpen2(true);
    };

    const handleClosePopup2 = () => {
        setIsPopupOpen2(false);
    };



    return (
        <div className='mx-28 mt-14'>
            <h2 className='text-[#737373] font-medium text-2xl'>Item 1</h2>
            <div className='flex gap-7'>
                <div onClick={handleButtonClick} className='h-[216px] bg-[#DBDBDB] w-[182px] flex flex-col justify-center items-center mt-2 rounded-2xl' style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
                    <div className='h-1/2 flex justify-center items-center text-[250px] font-thin text-[#ffffff]'>
                        +
                    </div>
                    <div className='text-[#8F8F8F] font-medium text-base'>
                        Add Details
                    </div>


                </div>
               
            </div>

            {/*  1st pop up */}

            {isPopupOpen && (
                <div className="popup  mt-5">
                    <div className="popup-content ">
                        <div className='border rounded-lg '>
                            <div class="lg:grid grid-cols-4  gap-2 p-5">
                                <div className='row-span-2 flex flex-col justify-center items-center  '>
                                    <div style={{
                                        backgroundImage: `url(${img1})`,
                                        background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                    }} className='h-[160px] w-[170px] flex justify-center items-end rounded-lg mt-5'>

                                        <img className='h-[160px] w-[170px] ' src={img1}></img>
                                    </div>

                                    <div className='mt-10 '>
                                        <div className=''>
                                            <button className=' px-8 py-2 text-[#ffffff] rounded-3xl bg-[#2EB0FB] text-center'>Upload</button>


                                        </div>
                                    </div>

                                </div>
                                <div className="">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Category</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Earning Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Point Item</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] font-normal">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0 "
                                                name="option"
                                                id="option"
                                            >

                                                <option className=" " value="Student">Select Earning Point</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className=' mt-6'>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Value</p>
                                        <div className=" flex justify-between items-center  gap-2   h-[40px] w-[300px] px-5 text-[#535353] ">
                                            <div>
                                                <input id="draft" className="peer/draft me-2 " type="radio" name="status" checked />
                                                <label for="draft" className="peer-checked/draft: font-normal">Automated</label>
                                            </div>

                                            <div>
                                                <input id="published" class="peer/published me-2" type="radio" name="status" />
                                                <label for="published" class="peer-checked/published: font-normal">Manual</label>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div className=" mt-20">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Course</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Course</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' mt-6 '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Level</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Level</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-span-3 ">
                                    <div className='flex justify-end' onClick={handleClosePopup}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>
                                    <div className='mt-16'>
                                        <div className=''>
                                            <p className='font-semibold text-[#000000]  py-2'>Item Earning Parameter </p>
                                            <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                                <select
                                                    required
                                                    className="w-full border-0 focus:outline-0"
                                                    name="option"
                                                    id="option"
                                                >

                                                    <option className="" value="Student">Select Parameter</option>
                                                    <option value="Parent"></option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex  items-center mt-[50px]'>
                                            <p className='font-bold text-base me-[67px]'>Item Value</p>
                                            <div className="text-[18px]  h-[40px] flex  ">
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[55px] text-[#000000] rounded-s-full text-center' onClick={() => setitemValue(itemValue - 1)}>-</button>
                                                <span className='w-[38px] flex justify-center items-center'> {itemValue} </span>
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className='border w-[55px] text-[#000000] rounded-e-full text-center' onClick={() => setitemValue(itemValue + 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className='flex justify-end gap-4 mx-7 mb-8'>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save</button>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save All</button>
                            </div>
                            <div className='flex justify-center'>

                            </div>


                        </div>
                        {
                            !isPopupOpen1 && (
                                <div className='bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5'>
                                    <button onClick={handleButtonClick1} className=' flex justify-center items-center border-2 rounded-full h-[32px] w-[32px] text-[30px] text-[#ffffff]'>+</button>
                                </div>
                            )
                        }


                    </div>

                </div>
            )}

            {/*  2nd pop up */}

            {isPopupOpen1 && (
                <div className="popup  mt-5">
                    <div className="popup-content ">
                        <div className='border rounded-lg '>
                            <div class="lg:grid grid-cols-4  gap-2 p-5">
                                <div className='row-span-2 flex flex-col justify-center items-center  '>
                                    <div style={{
                                        backgroundImage: `url(${img1})`,
                                        background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                    }} className='h-[160px] w-[170px] flex justify-center items-end rounded-lg mt-5'>

                                        <img className='h-[160px] w-[170px] ' src={img1}></img>
                                    </div>

                                    <div className='mt-10 '>
                                        <div className=''>
                                            <button className=' px-8 py-2 text-[#ffffff] rounded-3xl bg-[#2EB0FB] text-center'>Upload</button>


                                        </div>
                                    </div>

                                </div>
                                <div className="">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Category</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Earning Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Point Item</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] font-normal">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0 "
                                                name="option"
                                                id="option"
                                            >

                                                <option className=" " value="Student">Select Earning Point</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className=' mt-6'>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Value</p>
                                        <div className=" flex justify-between items-center  gap-2   h-[40px] w-[300px] px-5 text-[#535353] ">
                                            <div>
                                                <input id="draft" className="peer/draft me-2 " type="radio" name="status" checked />
                                                <label for="draft" className="peer-checked/draft: font-normal">Automated</label>
                                            </div>

                                            <div>
                                                <input id="published" class="peer/published me-2" type="radio" name="status" />
                                                <label for="published" class="peer-checked/published: font-normal">Manual</label>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div className=" mt-20">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Course</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Course</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' mt-6 '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Level</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Level</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-span-3 ">
                                    <div className='flex justify-end' onClick={handleClosePopup1}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>
                                    <div className='mt-16'>
                                        <div className=''>
                                            <p className='font-semibold text-[#000000]  py-2'>Item Earning Parameter </p>
                                            <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                                <select
                                                    required
                                                    className="w-full border-0 focus:outline-0"
                                                    name="option"
                                                    id="option"
                                                >

                                                    <option className="" value="Student">Select Parameter</option>
                                                    <option value="Parent"></option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex  items-center mt-[50px]'>
                                            <p className='font-bold text-base me-[67px]'>Item Value</p>
                                            <div className="text-[18px]  h-[40px] flex  ">
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[55px] text-[#000000] rounded-s-full text-center' onClick={() => setitemValue(itemValue - 1)}>-</button>
                                                <span className='w-[38px] flex justify-center items-center'> {itemValue} </span>
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className='border w-[55px] text-[#000000] rounded-e-full text-center' onClick={() => setitemValue(itemValue + 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className='flex justify-end gap-4 mx-7 mb-8'>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save</button>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save All</button>
                            </div>
                            <div className='flex justify-center'>

                            </div>


                        </div>
                        {
                            !isPopupOpen2 && (
                                <div className='bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5'>
                                    <button onClick={handleButtonClick2} className=' flex justify-center items-center border-2 rounded-full h-[32px] w-[32px] text-[30px] text-[#ffffff]'>+</button>
                                </div>
                            )
                        }

                    </div>

                </div>
            )}

            {/*  3rd pop up */}
            {isPopupOpen2 && (
                <div className="popup  mt-5">
                    <div className="popup-content ">
                        <div className='border rounded-lg '>
                            <div class="lg:grid grid-cols-4  gap-2 p-5">
                                <div className='row-span-2 flex flex-col justify-center items-center  '>
                                    <div style={{
                                        backgroundImage: `url(${img1})`,
                                        background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                    }} className='h-[160px] w-[170px] flex justify-center items-end rounded-lg mt-5'>

                                        <img className='h-[160px] w-[170px] ' src={img1}></img>
                                    </div>

                                    <div className='mt-10 '>
                                        <div className=''>
                                            <button className=' px-8 py-2 text-[#ffffff] rounded-3xl bg-[#2EB0FB] text-center'>Upload</button>


                                        </div>
                                    </div>

                                </div>
                                <div className="">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Category</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Earning Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Earning Point Item</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] font-normal">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0 "
                                                name="option"
                                                id="option"
                                            >

                                                <option className=" " value="Student">Select Earning Point</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className=' mt-6'>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Value</p>
                                        <div className=" flex justify-between items-center  gap-2   h-[40px] w-[300px] px-5 text-[#535353] ">
                                            <div>
                                                <input id="draft" className="peer/draft me-2 " type="radio" name="status" checked />
                                                <label for="draft" className="peer-checked/draft: font-normal">Automated</label>
                                            </div>

                                            <div>
                                                <input id="published" class="peer/published me-2" type="radio" name="status" />
                                                <label for="published" class="peer-checked/published: font-normal">Manual</label>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div className=" mt-20">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Course</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Course</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' mt-6 '>
                                        <p className='font-semibold text-[#000000]  py-2'>Item Earning Level</p>
                                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Level</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-span-3 ">
                                    <div className='flex justify-end' onClick={handleClosePopup2}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>
                                    <div className='mt-16'>
                                        <div className=''>
                                            <p className='font-semibold text-[#000000]  py-2'>Item Earning Parameter </p>
                                            <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 text-[#535353] ">

                                                <select
                                                    required
                                                    className="w-full border-0 focus:outline-0"
                                                    name="option"
                                                    id="option"
                                                >

                                                    <option className="" value="Student">Select Parameter</option>
                                                    <option value="Parent"></option>
                                                    <option value="Counselor"></option>
                                                    <option value="Others"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex  items-center mt-[50px]'>
                                            <p className='font-bold text-base me-[67px]'>Item Value</p>
                                            <div className="text-[18px]  h-[40px] flex  ">
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[55px] text-[#000000] rounded-s-full text-center' onClick={() => setitemValue(itemValue - 1)}>-</button>
                                                <span className='w-[38px] flex justify-center items-center'> {itemValue} </span>
                                                <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className='border w-[55px] text-[#000000] rounded-e-full text-center' onClick={() => setitemValue(itemValue + 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className='flex justify-end gap-4 mx-7 mb-8'>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save</button>
                                <button className='bg-[#2EB0FB] rounded-lg px-4 py-2 font-semibold text-[#fff]'>Save All</button>
                            </div>
                            <div className='flex justify-center'>

                            </div>


                        </div>
                        {
                            !isPopupOpen2 && (
                                <div className='bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5'>
                                    <button onClick={handleButtonClick2} className=' flex justify-center items-center border-2 rounded-full h-[32px] w-[32px] text-[30px] text-[#ffffff]'>+</button>
                                </div>
                            )
                        }

                    </div>

                </div>
            )}



        </div>
    );
};

export default EarningCategory;