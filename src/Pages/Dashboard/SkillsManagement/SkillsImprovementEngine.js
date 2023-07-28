//SkillsImprovementEngine

import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import arrow from '../../../assets/SkillsManagement/arrow.svg'
import arrowDown from '../../../assets/SkillsManagement/arrowDown.svg'
import arrowright from '../../../assets/SkillsManagement/arrowright.svg'
import pdfbg from '../../../assets/SkillsManagement/pdfbg.svg'
import download from '../../../assets/SkillsManagement/download.svg'
import utrashalt from '../../../assets/SkillsManagement/u_trash-alt.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img1 from '../../../assets/PointsRedemptions/uploadimg.png'
import { Box, FormControlLabel, Slider, Stack, Switch, Typography, styled } from '@mui/material';


const SkillsImprovementEngine = () => {

    const [proceed, setproceed] = useState(false);
    const [isOpenEvluationSubskill, setisOpenEvluationSubSkill] = useState(false);
    const [selectedOptionssubskill, setSelectedOptionssubskill] = useState([]);
    const [isOpenEvluationParameters, setisOpenEvluationParameters] = useState(false);

    const [selectedOptionsParameters, setSelectedOptionsParameters] = useState([]);


    //Sub Skill
    const toggleDropdownSubSkill = () => {
        setisOpenEvluationSubSkill(!isOpenEvluationSubskill);
    };
    const handleOptionChangeSubSkill = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionssubskill([...selectedOptionssubskill, optionValue]);
        } else {
            setSelectedOptionssubskill(selectedOptionssubskill.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllsubskill = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionssubskill(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionssubskill([]);
        }
    };
    //CourseSelection
    const [isOpenEvluationCourseSelection, setisOpenEvluationCourseSelection] = useState(false);
    const [selectedOptionsCourseSelection, setSelectedOptionsCourseSelection] = useState([]);
    const toggleDropdownCourseSelection = () => {
        setisOpenEvluationCourseSelection(!isOpenEvluationCourseSelection);
    };
    const handleOptionChangeCourseSelection = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsCourseSelection([...selectedOptionsCourseSelection, optionValue]);
        } else {
            setSelectedOptionsCourseSelection(selectedOptionsCourseSelection.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllCourseSelection = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsCourseSelection(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionsCourseSelection([]);
        }
    };

    //Parameters

    const toggleDropdownParameters = () => {
        setisOpenEvluationParameters(!isOpenEvluationParameters);
    };
    const handleOptionChangeParameters = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsParameters([...selectedOptionsParameters, optionValue]);
        } else {
            setSelectedOptionsParameters(selectedOptionsParameters.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllParameters = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsParameters(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setSelectedOptionsParameters([]);
        }
    };

    //
    const handleproceed = () => {
        setproceed(true);
    };



    //SoftSkills
    const [isOpenEvluationSoftSkills, setisOpenEvluationSoftSkills] = useState(false);

    const toggleDropdownSoftSkills = () => {
        setisOpenEvluationSoftSkills(!isOpenEvluationSoftSkills);
    };
    const [selectedOptionSoftSkills, setSelectedOptionSoftSkills] = useState(null);

    const handleOptionChangeSoftSkills = (event) => {

        setSelectedOptionSoftSkills(event.target.value);
        settogglevaluepar1(true)

    }





    //paremeter 1
    const [value, setValue] = React.useState([20, 37]);
    function valuetext(value) {
        return `${value}°C`;
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //paremeter 2
    const [paremeter2value, setparemeter2value] = React.useState([20, 37]);
    function valuetextparemeter2value(paremeter2value) {
        return `${paremeter2value}°C`;
    }


    const handleChangeparemeter2 = (event, newValue) => {
        setparemeter2value(newValue);
    };

    //paremeter 3
    const [paremeter3value, setparemeter3value] = React.useState([20, 37]);
    function valuetextparemeter3value(paremeter3value) {
        return `${paremeter3value}°C`;
    }


    const handleChangeparemeter3 = (event, newValue) => {
        setparemeter3value(newValue);
    };
    //paremeter 4
    const [paremeter4value, setparemeter4value] = React.useState([20, 37]);
    function valuetextparemeter4value(paremeter4value) {
        return `${paremeter4value}°C`;
    }


    const handleChangeparemeter4 = (event, newValue) => {
        setparemeter4value(newValue);
    };

    //

    const [paremeter, setNameparemeter] = useState('');
    const [togglevaluepar1, settogglevaluepar1] = useState(false);
    const [togglevaluepar2, settogglevaluepar2] = useState(false);
    const [togglevaluepar3, settogglevaluepar3] = useState(false);
    const [togglevaluepar4, settogglevaluepar4] = useState(false);

  /*   const handlePeremeterChange = (event) => {
        setNameparemeter(event.target.value);
    }; */
     // part 1
    const handleChangetogglepar1 = () => {
        settogglevaluepar1(!togglevaluepar1); // par1
        if (togglevaluepar2) {
            settogglevaluepar2(false)
        }
        if (togglevaluepar3) {
            settogglevaluepar3(false)
        }
        if (togglevaluepar4) {
            settogglevaluepar4(false)
        }
    };

    const [selectedParameter, setSelectedParameter] = useState('');

    const handlePeremeterChange = (e) => {
      const { value } = e.target;
      setNameparemeter(value)
  
      // Uncheck other checkboxes
      setSelectedParameter(value);
    };

    const handleChangetogglepar2 = () => {
        settogglevaluepar2(!togglevaluepar2); // par2
        if (togglevaluepar1) {
            settogglevaluepar1(false)
        }
        if (togglevaluepar3) {
            settogglevaluepar3(false)
        }
        if (togglevaluepar4) {
            settogglevaluepar4(false)
        }
    };

    const handleChangetogglepar3 = () => {
        settogglevaluepar3(!togglevaluepar3); // par3
        if (togglevaluepar1) {
            settogglevaluepar1(false)
        }
        if (togglevaluepar2) {
            settogglevaluepar2(false)
        }
        if (togglevaluepar4) {
            settogglevaluepar4(false)
        }
    };
    const handleChangetogglepar4 = () => {
        settogglevaluepar4(!togglevaluepar4); // par3
        if (togglevaluepar1) {
            settogglevaluepar1(false)
        }
        if (togglevaluepar2) {
            settogglevaluepar2(false)
        }
        if (togglevaluepar3) {
            settogglevaluepar3(false)
        }
    };



    ///toggle
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));
    //



    return (
        <div>
            <Layout>

                <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10 '>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Skills Management</div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>

                <div className='mx-12  mt-14 ' style={{ border: "1px solid #B7B7B7", borderRadius: "8px" }}>
                    <div className='ms-[28px]  '>
                        <p className='font-semibold text-[#000000]  py-2'>Course Selection</p>
                        <div className="custom-dropdown flex justify-between items-center gap-2  h-[40px] w-[23%] px-2 text-[#535353] font-normal"
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7"
                            }}
                        >

                            <div >
                                <input
                                    className='me-3'
                                    type="checkbox"

                                />
                                <span>Select Categories</span>

                            </div>
                            <div className="select-option" onClick={toggleDropdownCourseSelection}>
                                <img src={arrow}></img>
                                <i className={`dropdown-arrow ${isOpenEvluationCourseSelection ? 'open' : ''}`}></i>
                            </div>

                        </div>
                        {isOpenEvluationCourseSelection && (
                            <div className="dropdown-menu w-[23%] mt-2 "
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #B7B7B7"
                                }}
                            >
                                <div className='flex justify-end p-2'>
                                    <input
                                        className='me-3'
                                        type="checkbox"
                                        id="selectAll"
                                        checked={selectedOptionsCourseSelection.length === 4}
                                        onChange={handleSelectAllCourseSelection}
                                    />
                                    <label className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                </div>
                                <ul className="p-3 ">

                                    <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                        <input
                                            className='me-3 '
                                            type="checkbox"
                                            id="student"
                                            name="option"
                                            value="Student"
                                            checked={selectedOptionsCourseSelection.includes('Student')}
                                            onChange={handleOptionChangeCourseSelection}
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
                                            checked={selectedOptionsCourseSelection.includes('Parent')}
                                            onChange={handleOptionChangeCourseSelection}
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
                                            checked={selectedOptionsCourseSelection.includes('Counselor')}
                                            onChange={handleOptionChangeCourseSelection}
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
                                            checked={selectedOptionsCourseSelection.includes('Others')}
                                            onChange={handleOptionChangeCourseSelection}
                                        />
                                        <label className='text-xs font-normal' htmlFor="others">Others</label>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                    <div className='flex mx-6 items-center  '>
                        <div className='w-full'>
                            <p className='font-semibold text-[#000000]  py-2'>Skill Category</p>
                            <div className=" flex gap-2 h-[40px] w-[100%] px-2 text-[#535353] "
                             style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7"
                            }}
                            >

                                <select
                                    required
                                    className="w-full border-0 focus:outline-0"
                                    name="option"
                                    id="option"
                                >

                                    <option className="" value="Student">Soft Skills</option>
                                    <option value="Parent"></option>
                                    <option value="Counselor"></option>
                                    <option value="Others"></option>
                                </select>
                            </div>
                        </div>
                        <div className=' w-full ms-[26px]  '>
                            <p className='font-semibold text-[#000000]  py-2'>Skill Name</p>
                            <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
                             style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7"
                            }}
                            >

                                <div >
                                    <input
                                        className='me-3'
                                        type="checkbox"


                                    />
                                    <span>Select Categories</span>

                                </div>
                                <div className="select-option" onClick={toggleDropdownSubSkill}>
                                    <img src={arrow}></img>
                                    <i className={`dropdown-arrow ${isOpenEvluationSubskill ? 'open' : ''}`}></i>
                                </div>

                            </div>
                            {isOpenEvluationSubskill && (
                                <div className="dropdown-menu w-[100%] mt-2"
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #B7B7B7"
                                }}
                                >
                                    <div className='flex justify-end p-2'>
                                        <input
                                            className='me-3'
                                            type="checkbox"
                                            id="selectAll"
                                            checked={selectedOptionssubskill.length === 4}
                                            onChange={handleSelectAllsubskill}
                                        />
                                        <label className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                    </div>
                                    <ul className="p-3 ">

                                        <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                            <input
                                                className='me-3'
                                                type="checkbox"
                                                id="student"
                                                name="option"
                                                value="Student"
                                                checked={selectedOptionssubskill.includes('Student')}
                                                onChange={handleOptionChangeSubSkill}
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
                                                checked={selectedOptionssubskill.includes('Parent')}
                                                onChange={handleOptionChangeSubSkill}
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
                                                checked={selectedOptionssubskill.includes('Counselor')}
                                                onChange={handleOptionChangeSubSkill}
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
                                                checked={selectedOptionssubskill.includes('Others')}
                                                onChange={handleOptionChangeSubSkill}
                                            />
                                            <label className='text-xs font-normal' htmlFor="others">Others</label>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>

                        <div className=' w-full ms-[26px] '>
                            <p className='font-semibold text-[#000000]  py-2'> Skill Parameters</p>
                            <div className="custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
                             style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7"
                            }}
                            >

                                <div >
                                    <input
                                        className='me-3'
                                        type="checkbox"


                                    />
                                    <span>Select Categories</span>

                                </div>
                                <div className="select-option" onClick={toggleDropdownParameters}>
                                    <img src={arrow}></img>
                                    <i className={`dropdown-arrow ${isOpenEvluationParameters ? 'open' : ''}`}></i>
                                </div>

                            </div>
                            {isOpenEvluationParameters && (
                                <div className="dropdown-menu w-full mt-2"
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #B7B7B7"
                                }}
                                >
                                    <div className='flex justify-end p-2'>
                                        <input
                                            className='me-3'
                                            type="checkbox"
                                            id="selectAll"
                                            checked={selectedOptionsParameters.length === 4}
                                            onChange={handleSelectAllParameters}
                                        />
                                        <label className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                    </div>
                                    <ul className="p-3 ">

                                        <li className=' flex items-center p-1' style={{boxShadow: "0px 2px 0px 0px #E6E6E6"}}>
                                            <input
                                                className='me-3'
                                                type="checkbox"
                                                id="student"
                                                name="option"
                                                value="Student"
                                                checked={selectedOptionsParameters.includes('Student')}
                                                onChange={handleOptionChangeParameters}
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
                                                checked={selectedOptionsParameters.includes('Parent')}
                                                onChange={handleOptionChangeParameters}
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
                                                checked={selectedOptionsParameters.includes('Counselor')}
                                                onChange={handleOptionChangeParameters}
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
                                                checked={selectedOptionsParameters.includes('Others')}
                                                onChange={handleOptionChangeParameters}
                                            />
                                            <label className='text-xs font-normal' htmlFor="others">Others</label>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>

                        <div className='flex justify-center mb-5'>
                            <button onClick={handleproceed} className='bg-[#2EB0FB] rounded-lg h-[40px] font-semibold text-[#fff] ms-32 mt-14 px-2'>Proceed</button>
                        </div>


                    </div>


                    {/*  <div className={`flex justify-center mb-5 ${proceed ? 'hidden':''}`}>
                        <button onClick={handleproceed} className='bg-[#2EB0FB] rounded-lg px-4 py-1 font-semibold text-[#fff]'>Proceed</button>
                    </div> */}





                </div>
                {
                    proceed && (<div className='mx-24 mt-2 rounded border mb-5'>

                        <form >

                            <div className='flex ms-10 gap-10'>


                                <div className=' ms-14 me-8 mt-10'>
                                    {/* 1 */}
                                    <div className={`custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[198px] px-2 text-[#535353] font-normal ${isOpenEvluationSoftSkills
                                        ? ' shadow-lg '
                                        : 'text-[#000000]'
                                        }`}>

                                        <span className={` text-base  font-semibold ${isOpenEvluationSoftSkills
                                            ? 'text-[#0A98EA]  '
                                            : 'text-[#000000]'
                                            }`}>Soft Skills</span>



                                        <div className="select-option" onClick={toggleDropdownSoftSkills}>
                                            {
                                                !isOpenEvluationSoftSkills && (
                                                    <img src={arrowright}></img>
                                                )
                                            }
                                            {
                                                isOpenEvluationSoftSkills && (
                                                    <img src={arrowDown}></img>
                                                )
                                            }

                                            <i className={`dropdown-arrow ${isOpenEvluationSoftSkills ? 'open' : ''}`}></i>
                                        </div>
                                    </div>
                                    {isOpenEvluationSoftSkills && (
                                        <div className="dropdown-menu w-[198px]">
                                            <ul className="p-3">
                                                <li className='flex' >
                                                    <input
                                                        type="radio"
                                                        value="Communication"
                                                        name=""
                                                        checked={selectedOptionSoftSkills === 'Communication'}
                                                        onChange={handleOptionChangeSoftSkills}
                                                    />
                                                    <div className='flex items-center'>
                                                        <label
                                                            className='ms-5'
                                                            htmlFor="communication"
                                                            style={{ color: selectedOptionSoftSkills === 'Communication' ? 'rgba(10, 152, 234, 1)' : 'black' }}
                                                        >
                                                            Communication
                                                        </label>
                                                        {selectedOptionSoftSkills === 'Communication' && (
                                                            <div className='text-[#2EB0FB]  '>
                                                                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />

                                                            </div>
                                                        )
                                                        }
                                                    </div>

                                                </li>
                                                <li className='flex'>
                                                    <input
                                                        type="radio"
                                                        value="Leadership"
                                                        name=""
                                                        checked={selectedOptionSoftSkills === 'Leadership'}
                                                        onChange={handleOptionChangeSoftSkills}
                                                    />
                                                    <div className='flex items-center'>
                                                        <label
                                                            className='ms-5'
                                                            htmlFor="leadership"
                                                            style={{
                                                                color: selectedOptionSoftSkills === 'Leadership' ? 'rgba(10, 152, 234, 1)' : 'black',

                                                            }}
                                                        >
                                                            Leadership
                                                        </label>
                                                        {selectedOptionSoftSkills === 'Leadership' && (
                                                            <div className='text-[#2EB0FB]  '>
                                                                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />

                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                </li>
                                                <li className='flex'>
                                                    <input
                                                        type="radio"
                                                        value="Decision Making"
                                                        name=""
                                                        checked={selectedOptionSoftSkills === 'Decision Making'}
                                                        onChange={handleOptionChangeSoftSkills}
                                                    />
                                                    <div className='flex items-center'>
                                                        <label
                                                            className='ms-5'
                                                            htmlFor="decision-making"
                                                            style={{ color: selectedOptionSoftSkills === 'Decision Making' ? 'rgba(10, 152, 234, 1)' : 'black' }}
                                                        >
                                                            Decision Making
                                                        </label>
                                                        {selectedOptionSoftSkills === 'Decision Making' && (
                                                            <div className='text-[#2EB0FB]  '>
                                                                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />

                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                    {/* 2 */}
                                    <div className="mt-2 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[198px] px-2 text-[#535353] font-normal">

                                        {/*  <span className={` text-base  font-semibold ${isOpenEvluationSoftSkills
                                        ? 'text-[#0A98EA] '
                                        : 'text-[#000000]'
                                        }`}>skills Category 2</span> */}
                                        <span>Skills Category 2</span>

                                        <div className="select-option" >
                                            <img src={arrowright}></img>
                                            {/*   {
                                            !isOpenEvluationSoftSkills && (
                                                <img src={arrowright}></img>
                                            )
                                        } */}
                                            {/*   {
                                            isOpenEvluationSoftSkills && (
                                                <img src={arrowDown}></img>
                                            )
                                        } */}

                                            <i className={`dropdown-arrow ${isOpenEvluationSoftSkills ? 'open' : ''}`}></i>
                                        </div>
                                    </div>

                                    {/* 3 */}

                                    <div className="mt-2 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[198px] px-2 text-[#535353] font-normal">

                                        {/*  <span className={` text-base  font-semibold ${isOpenEvluationSoftSkills
                                           ? 'text-[#0A98EA] '
                                          : 'text-[#000000]'
                                            }`}>skills Category 2</span> */}
                                        <span>Skills Category 2</span>

                                        <div className="select-option" >
                                            <img src={arrowright}></img>
                                            {/*   {
                                                     !isOpenEvluationSoftSkills && (
                                                          <img src={arrowright}></img>
                                                   )
                                              } */}
                                            {/*   {
                                                  isOpenEvluationSoftSkills && (
                                                 <img src={arrowDown}></img>
                                                     )
                                                    } */}

                                            <i className={`dropdown-arrow ${isOpenEvluationSoftSkills ? 'open' : ''}`}></i>
                                        </div>
                                    </div>

                                    {/* 4 */}

                                    <div className="mt-2 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[198px] px-2 text-[#535353] font-normal">

                                        {/*  <span className={` text-base  font-semibold ${isOpenEvluationSoftSkills
                                            ? 'text-[#0A98EA] '
                                            : 'text-[#000000]'
                                             }`}>skills Category 2</span> */}
                                        <span>Skills Category 2</span>

                                        <div className="select-option" >
                                            <img src={arrowright}></img>
                                            {/*   {
                                                  !isOpenEvluationSoftSkills && (
                                             <img src={arrowright}></img>
                                                          )
                                           } */}
                                            {/*   {
                                            isOpenEvluationSoftSkills && (
                                     <img src={arrowDown}></img>
                                               )
                                              } */}

                                            <i className={`dropdown-arrow ${isOpenEvluationSoftSkills ? 'open' : ''}`}></i>
                                        </div>
                                    </div>



                                </div>

                                <div className='flex-1 flex gap-20'>
                                    {
                                        selectedOptionSoftSkills && (
                                            <div>
                                                <div className={`px-5 py-3 w-[395px] border-2 mt-10 rounded ${paremeter === 'Parameter 1'
                                                    ? 'bg-[#E8F4FF] border-[1px] border-solid border-[#0A98EA]'
                                                    : ' bg-[white] border-[2px] border-solid'
                                                    } `}>
                                                    <div className='flex   justify-between'>
                                                        {/*  handlePeremeterChange */}
                                                        <div className='flex justify-center items-center'>
                                                            <div>
                                                                <input
                                                                    className='w-6 h-6 border-2 rounded'
                                                                    type="checkbox"
                                                                    id="Parameter"
                                                                    name={paremeter}
                                                                    value="Parameter 1"
                                                                    onChange={handlePeremeterChange}
                                                                    checked={selectedParameter === 'Parameter 1'}
                                                                />
                                                            </div>

                                                            <label className='text-xs ms-2 h-6' for="peremeter"> Parameter 1</label>
                                                        </div>
                                                        <div className=" flex gap-2  border  rounded  px-2 py-1 text-[#535353] ">

                                                            <select
                                                                required
                                                                className="w-full text-xs border-0 focus:outline-0"
                                                                name="option"
                                                                id="option"
                                                            >

                                                                <option className="text-xs " value="Student">Less Than</option>
                                                                <option value="Parent"></option>
                                                                <option value="Counselor"></option>
                                                                <option value="Others"></option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <div className=' flex justify-center items-center mt-9 mb-4'>
                                                        <Box sx={{ width: 215 }} >
                                                            <Slider
                                                                getAriaLabel={() => 'Parameter range'}
                                                                value={value}
                                                                onChange={handleChange}
                                                                valueLabelDisplay="on"
                                                                getAriaValueText={valuetext}
                                                                sx={{
                                                                    '& .MuiSlider-thumb.MuiSlider-active': {
                                                                        boxShadow: 'none',
                                                                        borderColor: 'black',
                                                                    },

                                                                    '& .MuiSlider-rail': {
                                                                        backgroundColor: 'black',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>

                                                    <div className='flex items-center gap-5'>
                                                        <p className='text-[10px]'>You want assign a task</p>

                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography></Typography>
                                                            <AntSwitch
                                                                default
                                                                inputProps={{ 'aria-label': 'ant design' }}
                                                                checked={togglevaluepar1}
                                                                onChange={handleChangetogglepar1}
                                                            />
                                                            <Typography></Typography>
                                                        </Stack>

                                                    </div>
                                                </div>
                                                <div className={`px-5 py-3 w-[395px] border-2 mt-2 rounded ${paremeter === 'Parameter 2'
                                                    ? 'bg-[#E8F4FF] border-[1px] border-solid border-[#0A98EA]'
                                                    : ' bg-[white] border-[2px] border-solid'
                                                    } `}>
                                                    <div className='flex   justify-between'>
                                                        {/*  handlePeremeterChange */}
                                                        <div className='flex justify-center items-center'>
                                                            <div>
                                                                <input
                                                                    className='w-6 h-6 border-2 rounded'
                                                                    type="checkbox"
                                                                    id="Parameter"
                                                                    name={paremeter}
                                                                    value="Parameter 2"
                                                                    onChange={handlePeremeterChange}
                                                                    checked={selectedParameter === 'Parameter 2'}
                                                                />
                                                            </div>

                                                            <label className='text-xs ms-2 h-6' for="peremeter"> Parameter 2</label>
                                                        </div>
                                                        <div className=" flex gap-2  border  rounded  px-2 py-1 text-[#535353] ">

                                                            <select
                                                                required
                                                                className="w-full text-xs border-0 focus:outline-0"
                                                                name="option"
                                                                id="option"
                                                            >

                                                                <option className="text-xs " value="Student">Less Than</option>
                                                                <option value="Parent"></option>
                                                                <option value="Counselor"></option>
                                                                <option value="Others"></option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <div className=' flex justify-center items-center mt-9 mb-4'>
                                                        <Box sx={{ width: 215 }} >
                                                            <Slider
                                                                getAriaLabel={() => 'Parameter range'}
                                                                value={paremeter2value}
                                                                onChange={handleChangeparemeter2}
                                                                valueLabelDisplay="on"
                                                                getAriaValueText={valuetextparemeter2value}
                                                                sx={{
                                                                    '& .MuiSlider-thumb.MuiSlider-active': {
                                                                        boxShadow: 'none',
                                                                        borderColor: 'black',
                                                                    },

                                                                    '& .MuiSlider-rail': {
                                                                        backgroundColor: 'black',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>

                                                    <div className='flex items-center gap-5'>
                                                        <p className='text-[10px]'>You want assign a task</p>

                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography></Typography>
                                                            <AntSwitch
                                                                default
                                                                inputProps={{ 'aria-label': 'ant design' }}
                                                                checked={togglevaluepar2}
                                                                onChange={handleChangetogglepar2}

                                                            />
                                                            <Typography></Typography>
                                                        </Stack>

                                                    </div>
                                                </div>
                                                <div className={`px-5 py-3 w-[395px] border-2 mt-2 rounded ${paremeter === 'Parameter 3'
                                                    ? 'bg-[#E8F4FF] border-[1px] border-solid border-[#0A98EA]'
                                                    : ' bg-[white] border-[2px] border-solid'
                                                    } `}>
                                                    <div className='flex   justify-between'>
                                                        {/*  handlePeremeterChange */}
                                                        <div className='flex justify-center items-center'>
                                                            <div>
                                                                <input
                                                                    className='w-6 h-6 border-2 rounded'
                                                                    type="checkbox"
                                                                    id="Parameter"
                                                                    name={paremeter}
                                                                    value="Parameter 3"
                                                                    onChange={handlePeremeterChange}
                                                                    checked={selectedParameter === 'Parameter 3'}
                                                                />
                                                            </div>

                                                            <label className='text-xs ms-2 h-6' for="peremeter"> Parameter 3</label>
                                                        </div>
                                                        <div className=" flex gap-2  border  rounded  px-2 py-1 text-[#535353] ">

                                                            <select
                                                                required
                                                                className="w-full text-xs border-0 focus:outline-0"
                                                                name="option"
                                                                id="option"
                                                            >

                                                                <option className="text-xs " value="Student">Less Than</option>
                                                                <option value="Parent"></option>
                                                                <option value="Counselor"></option>
                                                                <option value="Others"></option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <div className=' flex justify-center items-center mt-9 mb-4'>
                                                        <Box sx={{ width: 215 }} >
                                                            <Slider
                                                                getAriaLabel={() => 'Parameter range'}
                                                                value={paremeter3value}
                                                                onChange={handleChangeparemeter3}
                                                                valueLabelDisplay="on"
                                                                getAriaValueText={valuetextparemeter3value}
                                                                sx={{
                                                                    '& .MuiSlider-thumb.MuiSlider-active': {
                                                                        boxShadow: 'none',
                                                                        borderColor: 'black',
                                                                    },

                                                                    '& .MuiSlider-rail': {
                                                                        backgroundColor: 'black',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>

                                                    <div className='flex items-center gap-5'>
                                                        <p className='text-[10px]'>You want assign a task</p>

                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography></Typography>
                                                            <AntSwitch
                                                                default
                                                                inputProps={{ 'aria-label': 'ant design' }}
                                                                checked={togglevaluepar3}
                                                                onChange={handleChangetogglepar3}

                                                            />
                                                            <Typography></Typography>
                                                        </Stack>

                                                    </div>
                                                </div>
                                                <div className={`px-5 py-3 w-[395px] border-2 mt-2 rounded ${paremeter === 'Parameter 4'
                                                    ? 'bg-[#E8F4FF] border-[1px] border-solid border-[#0A98EA]'
                                                    : ' bg-[white] border-[2px] border-solid'
                                                    } `}>
                                                    <div className='flex   justify-between'>
                                                        {/*  handlePeremeterChange */}
                                                        <div className='flex justify-center items-center'>
                                                            <div>
                                                                <input
                                                                    className='w-6 h-6 border-2 rounded'
                                                                    type="checkbox"
                                                                    id="Parameter"
                                                                    name={paremeter}
                                                                    value="Parameter 4"
                                                                    onChange={handlePeremeterChange}
                                                                    checked={selectedParameter === 'Parameter 4'}
                                                                />
                                                            </div>

                                                            <label className='text-xs ms-2 h-6' for="peremeter"> Parameter 4</label>
                                                        </div>
                                                        <div className=" flex gap-2  border  rounded  px-2 py-1 text-[#535353] ">

                                                            <select
                                                                required
                                                                className="w-full text-xs border-0 focus:outline-0"
                                                                name="option"
                                                                id="option"
                                                            >

                                                                <option className="text-xs " value="Student">Less Than</option>
                                                                <option value="Parent"></option>
                                                                <option value="Counselor"></option>
                                                                <option value="Others"></option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <div className=' flex justify-center items-center mt-9 mb-4'>
                                                        <Box sx={{ width: 215 }} >
                                                            <Slider
                                                                getAriaLabel={() => 'Parameter range'}
                                                                value={paremeter4value}
                                                                onChange={handleChangeparemeter4}
                                                                valueLabelDisplay="on"
                                                                getAriaValueText={valuetextparemeter4value}
                                                                sx={{
                                                                    '& .MuiSlider-thumb.MuiSlider-active': {
                                                                        boxShadow: 'none',
                                                                        borderColor: 'black',
                                                                    },

                                                                    '& .MuiSlider-rail': {
                                                                        backgroundColor: 'black',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>

                                                    <div className='flex items-center gap-5'>
                                                        <p className='text-[10px]'>You want assign a task</p>

                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography></Typography>
                                                            <AntSwitch
                                                                default
                                                                inputProps={{ 'aria-label': 'ant design' }}
                                                                checked={togglevaluepar4}
                                                                onChange={handleChangetogglepar4}

                                                            />
                                                            <Typography></Typography>
                                                        </Stack>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {(togglevaluepar1 || togglevaluepar2 || togglevaluepar3 || togglevaluepar4) && (<div className='w-[410px] bg-[#E8F4FF] border-[1px] border-solid border-[#0A98EA] flex flex-col  items-center mt-10 rounded  '>

                                        <div style={{

                                            backgroundImage: `url(${img1})`,
                                            background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`

                                        }} className='h-[140px] w-[140px] flex flex-col justify-center items-center mt-2 rounded'>

                                            <img className='h-[140px] w-[140px] mb-2' src={img1}></img>
                                            <p className='mt-[-34px] text-base font-semibold text-[#fff]'>Upload Icon</p>
                                        </div>

                                        <p className='my-4 text-base font-semibold'>{paremeter} : Description</p>
                                        <input className='w-[366px] h-[48px] text-sm border-2 rounded-lg text-center' type='text ' placeholder='this is the dummy description about the item' />


                                        <div className='text-xs flex items-center mt-5 mb-7'>
                                            <input className='w-6' type="radio" id="html" name="fav_language" value="HTML" />
                                            <label className='ms-2' for="html">Assign task to the criteria</label>
                                        </div>
                                        <div>
                                            <p className='text-center text-base font-semibold'>Task Brief</p>
                                            <input className='w-[366px] h-[67px] text-sm border-2 rounded-lg text-center mb-5 mt-2' type='text ' placeholder='this is the dummy Brief about the item' />
                                        </div>
                                        <div className='flex  items-center'>
                                            <div className=' bg-[#fff] w-[366px] h-[60px] flex justify-between items-center p-5 border-2 rounded-lg'>
                                                <div className='flex'>
                                                    <div className='bg-[#fff] h-[28px] w-[23px] flex items-center'
                                                        style={{ backgroundImage: `url(${pdfbg})` }}>
                                                        <p className='w-[25px] h-[10px] bg-[#F14848] text-[#fff] text-[8px] text-center'>pdf</p>
                                                    </div>
                                                    <div className='flex flex-col ms-2'>
                                                        <span className='font-medium text-xs'>File Title.pdf</span>
                                                        <span className='font-normal text-[10px] '>313 KB . 31 Aug, 2022  </span>
                                                    </div>
                                                </div>
                                                <div className='flex'>
                                                    <img className='me-2' src={download} />
                                                    <img src={utrashalt} />
                                                </div>

                                            </div>



                                        </div>
                                    </div>)
                                    }

                                </div>
                            </div>
                            <div className='mt-9 mb-7 ms-20'>
                                <input className='bg-[#2EB0FB] rounded-lg px-4 py-1 font-semibold text-[#fff]' type="submit" value="Apply All" />
                                <input className='bg-[#2EB0FB] rounded-lg px-4 py-1 font-semibold text-[#fff] ms-5' type="submit" value="Proceed" />
                            </div>
                        </form>
                    </div>)
                }



            </Layout>
        </div>
    );
};

export default SkillsImprovementEngine;