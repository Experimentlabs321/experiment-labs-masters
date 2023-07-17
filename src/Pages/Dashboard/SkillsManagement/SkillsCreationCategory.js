import React, { useState } from 'react';
import img1 from '../../../assets/PointsRedemptions/uploadimg.png'
import arrow from '../../../assets/SkillsManagement/arrow.svg'


const SkillsCreationCategory = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [itemValue, setitemValue] = useState(0);


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





    // evaluation popup 1

    const [isOpenEvluation, setisOpenEvluation] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const toggleDropdown = () => {
        setisOpenEvluation(!isOpenEvluation);
    };
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, optionValue]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptions([]);
        }
    };

    // evaluation popup2

    const [isOpenEvluationpopup2, setisOpenEvluationpopup2] = useState(false);
    const [selectedOptionspopup2, setSelectedOptionspopup2] = useState([]);
    const toggleDropdownpopup2 = () => {
        setisOpenEvluationpopup2(!isOpenEvluationpopup2);
    };
    const handleOptionChangepopup2 = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionspopup2([...selectedOptions, optionValue]);
        } else {
            setSelectedOptionspopup2(selectedOptions.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllpopup2 = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionspopup2(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionspopup2([]);
        }
    };
    // evaluation popup3

    const [isOpenEvluationpopup3, setisOpenEvluationpopup3] = useState(false);
    const [selectedOptionspopup3, setSelectedOptionspopup3] = useState([]);
    const toggleDropdownpopup3 = () => {
        setisOpenEvluationpopup3(!isOpenEvluationpopup3);
    };
    const handleOptionChangepopup3 = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionspopup3([...selectedOptions, optionValue]);
        } else {
            setSelectedOptionspopup3(selectedOptions.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllpopup3 = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionspopup3(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionspopup3([]);
        }
    };


    // course popup 1
    const [isOpencourse, setisOpencourse] = useState(false);
    const [selectedOptionscourse, setSelectedOptionscourse] = useState([]);
    const toggleDropdowncourse = () => {
        setisOpencourse(!isOpencourse);
    };

    const handleOptionChangecourse = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscourse([...selectedOptionscourse, optionValue]);
        } else {
            setSelectedOptionscourse(selectedOptionscourse.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllcourse = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscourse(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionscourse([]);
        }
    };
    // course popup2
    const [isOpencoursepopup2, setisOpencoursepopup2] = useState(false);
    const [selectedOptionscoursepopup2, setSelectedOptionscoursepopup2] = useState([]);
    const toggleDropdowncoursepopup2 = () => {
        setisOpencoursepopup2(!isOpencoursepopup2);
    };

    const handleOptionChangecoursepopup2 = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscoursepopup2([...selectedOptionscoursepopup2, optionValue]);
        } else {
            setSelectedOptionscoursepopup2(selectedOptionscoursepopup2.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllcoursepopup2 = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscoursepopup2(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionscoursepopup2([]);
        }
    };
    // course popup3
    const [isOpencoursepopup3, setisOpencoursepopup3] = useState(false);
    const [selectedOptionscoursepopup3, setSelectedOptionscoursepopup3] = useState([]);
    const toggleDropdowncoursepopup3 = () => {
        setisOpencoursepopup3(!isOpencoursepopup3);
    };

    const handleOptionChangecoursepopup3 = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscoursepopup3([...selectedOptionscoursepopup3, optionValue]);
        } else {
            setSelectedOptionscoursepopup3(selectedOptionscoursepopup3.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllcoursepopup3 = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionscoursepopup3(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionscoursepopup3([]);
        }
    };




    return (
        <div className='mx-[107px] mt-14'>
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
                        <div className=' flex '
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7"
                            }}
                        >
                            <div className='ps-[37px] pt-[48px] pe-[28px]'>
                                <div style={{

                                    backgroundImage: `url(${img1})`,
                                    background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                }} className='h-[160px] w-[170px] flex flex-col justify-center items-center mt-2 rounded'>

                                    <img className='h-[158px] w-[168px]' src={img1}></img>
                                    <p className='mt-[-38px] text-base font-semibold text-[#fff] mb-4'>Upload Icon</p>
                                </div>

                                <div className=' '>
                                    <input className='mt-11 mb-11 w-[170px] border text-center' type='text' placeholder='Discription' />
                                </div>

                            </div>

                            <div className="flex-1 lg:grid grid-cols-3 mt-5 ">

                                <div className=" ">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Category</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Evaluation on</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"
                                                />
                                                <span>Parameters</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdown}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpenEvluation ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpenEvluation && (
                                            <div className="dropdown-menu w-[300px] mt-2"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                            >
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptions.length === 4}
                                                        onChange={handleSelectAll}
                                                    />
                                                    <label className='text-[#009EF9] text-xs font-medium'  htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptions.includes('Student')}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptions.includes('Parent')}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptions.includes('Counselor')}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptions.includes('Others')}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>


                                </div>

                                <div className=" ">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Name</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Course Selection</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"


                                                />
                                                <span>Select course</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdowncourse}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpencourse ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpencourse && (
                                            <div className="dropdown-menu w-[300px] mt-2 rounded border">
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptionscourse.length === 4}
                                                        onChange={handleSelectAllcourse}
                                                    />
                                                    <label  className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptionscourse.includes('Student')}
                                                            onChange={handleOptionChangecourse}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptionscourse.includes('Parent')}
                                                            onChange={handleOptionChangecourse}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptionscourse.includes('Counselor')}
                                                            onChange={handleOptionChangecourse}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptionscourse.includes('Others')}
                                                            onChange={handleOptionChangecourse}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div class="">
                                    <div className='flex justify-end pe-5' onClick={handleClosePopup}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>

                                </div>

                                <div class="flex justify-center items-center col-span-2 h-[90px]"

                                >
                                    <input className=' w-full h-full text-center' type='text' placeholder='this is the dummy description about the item'
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--neutral-300, #BFBFBF)"
                                        }}
                                    />

                                </div>
                                <div className='flex items-end justify-center mb-8'>
                                    <button className='bg-[#2EB0FB] rounded-lg h-[30px] w-[95px] font-semibold text-[#fff]'>Proceed</button>

                                </div>


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
                        <div className=' flex '
                            style={{
                                borderRadius: "8px",
                                border: "1px solid var(--neutral-300, #BFBFBF)"
                            }}
                        >
                            <div className='ps-[37px] pt-[48px] pe-[28px]'>
                                <div style={{

                                    backgroundImage: `url(${img1})`,
                                    background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                }} className='h-[160px] w-[170px] flex flex-col justify-center items-center mt-2 rounded'>

                                    <img className='h-[158px] w-[168px]' src={img1}></img>
                                    <p className='mt-[-38px] text-base font-semibold text-[#fff] mb-4'>Upload Icon</p>
                                </div>

                                <div className=' '>
                                    <input className='mt-11 mb-11 w-[170px] border text-center' type='text' placeholder='Discription' />
                                </div>

                            </div>

                            <div className="flex-1 lg:grid grid-cols-3 mt-5 ">

                                <div className=" ">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Category</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Evaluation on</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"


                                                />
                                                <span>Parameters</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdownpopup2}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpenEvluationpopup2 ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpenEvluationpopup2 && (
                                            <div className="dropdown-menu w-[300px] mt-2 "
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid var(--neutral-300, #BFBFBF)"
                                                }}
                                            >
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptionspopup2.length === 4}
                                                        onChange={handleSelectAllpopup2}
                                                    />
                                                    <label  className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptionspopup2.includes('Student')}
                                                            onChange={handleSelectAllpopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptionspopup2.includes('Parent')}
                                                            onChange={handleSelectAllpopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptionspopup2.includes('Counselor')}
                                                            onChange={handleSelectAllpopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptionspopup2.includes('Others')}
                                                            onChange={handleSelectAllpopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>


                                </div>

                                <div className=" ">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Name</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Course Selection</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"


                                                />
                                                <span>Select course</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdowncoursepopup2}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpencoursepopup2 ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpencoursepopup2 && (
                                            <div className="dropdown-menu w-[300px] mt-2 "
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid var(--neutral-300, #BFBFBF)"
                                                }}
                                            >
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptionscoursepopup2.length === 4}
                                                        onChange={handleSelectAllcoursepopup2}
                                                    />
                                                    <label  className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptionscoursepopup2.includes('Student')}
                                                            onChange={handleSelectAllcoursepopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptionscoursepopup2.includes('Parent')}
                                                            onChange={handleSelectAllcoursepopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptionscoursepopup2.includes('Counselor')}
                                                            onChange={handleSelectAllcoursepopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptionscoursepopup2.includes('Others')}
                                                            onChange={handleSelectAllcoursepopup2}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div class="">
                                    <div className='flex justify-end pe-5' onClick={handleClosePopup1}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>

                                </div>

                                <div class="flex justify-center items-center col-span-2 h-[90px]"

                                >
                                    <input className=' w-full h-full text-center' type='text' placeholder='this is the dummy description about the item'
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--neutral-300, #BFBFBF)"
                                        }}
                                    />

                                </div>
                                <div className='flex items-end justify-center mb-8'>
                                    <button className='bg-[#2EB0FB] rounded-lg h-[30px] w-[95px] font-semibold text-[#fff]'>Proceed</button>

                                </div>


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
                <div className="popup  mt-5 mb-5">
                    <div className="popup-content ">
                        <div className='border rounded-lg flex '>
                            <div className='ps-[37px] pt-[48px] pe-[28px]'>
                                <div style={{

                                    backgroundImage: `url(${img1})`,
                                    background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                }} className='h-[160px] w-[170px] flex flex-col justify-center items-center mt-2 rounded'>

                                    <img className='h-[158px] w-[168px]' src={img1}></img>
                                    <p className='mt-[-38px] text-base font-semibold text-[#fff] mb-4'>Upload Icon</p>
                                </div>

                                <div className=' '>
                                    <input className='mt-11 mb-11 w-[170px] border text-center' type='text' placeholder='Discription' />
                                </div>

                            </div>

                            <div className="flex-1 lg:grid grid-cols-3 mt-5 ">

                                <div className=" ">

                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Category</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Evaluation on</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"


                                                />
                                                <span>Parameters</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdownpopup3}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpenEvluationpopup3 ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpenEvluationpopup3 && (
                                            <div className="dropdown-menu w-[300px] mt-2"
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid var(--neutral-300, #BFBFBF)"
                                                }}
                                            >
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptionspopup3.length === 4}
                                                        onChange={handleSelectAllpopup3}
                                                    />
                                                    <label  className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptionspopup3.includes('Student')}
                                                            onChange={handleSelectAllpopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptionspopup3.includes('Parent')}
                                                            onChange={handleSelectAllpopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptionspopup3.includes('Counselor')}
                                                            onChange={handleSelectAllpopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptionspopup3.includes('Others')}
                                                            onChange={handleSelectAllpopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>


                                </div>

                                <div className=" ">
                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Skill Name</p>
                                        <div className=" flex gap-2 h-[40px] w-[300px] px-2 text-[#535353] "
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <select
                                                required
                                                className="w-full border-0 focus:outline-0"
                                                name="option"
                                                id="option"
                                            >

                                                <option className="" value="Student">Select Category</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className=' '>
                                        <p className='font-semibold text-[#000000]  py-2'>Course Selection</p>
                                        <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[300px] px-2 text-[#535353] font-normal"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid var(--neutral-300, #BFBFBF)"
                                            }}
                                        >

                                            <div >
                                                <input
                                                    className='me-3'
                                                    type="checkbox"


                                                />
                                                <span>Select course</span>

                                            </div>
                                            <div className="select-option" onClick={toggleDropdowncoursepopup3}>
                                                <img src={arrow}></img>
                                                <i className={`dropdown-arrow ${isOpencoursepopup3 ? 'open' : ''}`}></i>
                                            </div>

                                        </div>
                                        {isOpencoursepopup3 && (
                                            <div className="dropdown-menu w-[300px] mt-2"
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid var(--neutral-300, #BFBFBF)"
                                                }}>
                                                <div className='flex justify-end p-2'>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="selectAll"
                                                        checked={selectedOptionscoursepopup3.length === 4}
                                                        onChange={handleSelectAllcoursepopup3}
                                                    />
                                                    <label  className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                                </div>
                                                <ul className="p-3 ">

                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="student"
                                                            name="option"
                                                            value="Student"
                                                            checked={selectedOptionscoursepopup3.includes('Student')}
                                                            onChange={handleSelectAllcoursepopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="parent"
                                                            name="option"
                                                            value="Parent"
                                                            checked={selectedOptionscoursepopup3.includes('Parent')}
                                                            onChange={handleSelectAllcoursepopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="counselor"
                                                            name="option"
                                                            value="Counselor"
                                                            checked={selectedOptionscoursepopup3.includes('Counselor')}
                                                            onChange={handleSelectAllcoursepopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                    </li>
                                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                                        <input
                                                            className='me-3'
                                                            type="checkbox"
                                                            id="others"
                                                            name="option"
                                                            value="Others"
                                                            checked={selectedOptionscoursepopup3.includes('Others')}
                                                            onChange={handleSelectAllcoursepopup3}
                                                        />
                                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div class="">
                                    <div className='flex justify-end pe-5' onClick={handleClosePopup2}>
                                        <button className='flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</button>
                                    </div>

                                </div>

                                <div class="flex justify-center items-center col-span-2 h-[90px]"

                                >
                                    <input className=' w-full h-full text-center' type='text' placeholder='this is the dummy description about the item'
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--neutral-300, #BFBFBF)"
                                        }}
                                    />

                                </div>
                                <div className='flex items-end justify-center mb-8'>
                                    <button className='bg-[#2EB0FB] rounded-lg h-[30px] w-[95px] font-semibold text-[#fff]'>Proceed</button>

                                </div>


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

export default SkillsCreationCategory;