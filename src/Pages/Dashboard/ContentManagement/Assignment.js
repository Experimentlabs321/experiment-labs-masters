//Assignment

import React, { useState } from 'react';
import Layout from '../Layout';
import arrowDown from '../../../assets/SkillsManagement/arrow.svg'
import arrowright from '../../../assets/SkillsManagement/arrowright.svg'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import required from '../../../assets/ContentManagement/required.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import closeCircle from '../../../assets/ContentManagement/closeCircle.svg'
import edit from '../../../assets/ContentManagement/edit.svg'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Level from '../Dashboard/Level';
import Popup from 'reactjs-popup';



const Assignment = () => {
    const [isOpenGeneral, setisOpenGeneral] = useState(true);

    const [isOpenevaluationParameter, setisOpenevaluationParameter] = useState(false);



    const toggleDropdownGeneral = () => {
        setisOpenGeneral(!isOpenGeneral);
    };



    const toggleDropdownevaluationParameter = () => {
        setisOpenevaluationParameter(!isOpenevaluationParameter);
    };


    // create new category
    const [isOpencreatenewskillcategory, setisOpencreatenewskillcategory] = useState(false);

    const openModalacreatenewskillcategory = () => {
        setisOpencreatenewskillcategory(true);
    };

    const closeModalcreatenewskillcategory = () => {
        setisOpencreatenewskillcategory(false);
    };


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


    // skill category
    const [isOpenEvluationSkillCategory, setisOpenEvluationSkillCategory] = useState(false);
    const [selectedOptionskillName, setselectedOptionskillName] = useState([]);

    const toggleDropdownSkillCategory = () => {
        setisOpenEvluationSkillCategory(!isOpenEvluationSkillCategory);
    };

    // skill Parameter
    const [isOpenEvluationSkillParameter, setisOpenEvluationSkillParameter] = useState(false);
    const [selectedOptionskillParameter, setselectedOptionskillParameter] = useState([]);

    const toggleDropdownSkillParameter = () => {
        setisOpenEvluationSkillParameter(!isOpenEvluationSkillParameter);
    };

    //skill name
    const [isOpenSkillName, setisOpenSkillName] = useState(false);
    const toggleDropdownSkillName = () => {
        setisOpenSkillName(!isOpenSkillName);
    };
    const handleOptionChangeSkillName = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setselectedOptionskillName([...selectedOptionskillName, optionValue]);
        } else {
            setselectedOptionskillName(selectedOptionskillName.filter((option) => option !== optionValue));
        }
    };

    const handleSelectAllskillName = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setselectedOptionskillName(['Student', 'Parent', 'Counselor', 'Others']);
        } else {
            setselectedOptionskillName([]);
        }
    };

    //proceed
    const [proceed, setproceed] = useState(false);
    const handleproceed = () => {
        setproceed(true);
    };
    //Parametersection
    const [parametersection, setparametersection] = useState(false);
    const handleparametersection = () => {
        setparametersection(true);
        setproceed(false);
    };

    //SoftSkills
    /*  const [isOpenEvluationSoftSkills, setisOpenEvluationSoftSkills] = useState(false);
     const [togglevaluepar1, settogglevaluepar1] = useState(false);
 
     const toggleDropdownSoftSkills = () => {
         setisOpenEvluationSoftSkills(!isOpenEvluationSoftSkills);
     };
     const [selectedOptionSoftSkills, setSelectedOptionSoftSkills] = useState(null);
 
     const handleOptionChangeSoftSkills = (event) => {
 
         setSelectedOptionSoftSkills(event.target.value);
         settogglevaluepar1(true)
 
     } */

    //
    const [selectedSection, setSelectedSection] = useState(null);


    const handleArrowClick = (category) => {
        setSelectedSection(category);

    };
    console.log(selectedSection)

    // create new earning parameter
    /*   const [isOpencreatenewearningparameter, setisOpencreatenewearningparameter] = useState(false);
  
      const openModalacreatenewearningparameter = () => {
          setisOpencreatenewearningparameter(true);
      };
  
      const closeModalcreatenewearningparameter = () => {
          setisOpencreatenewearningparameter(false);
      }; */

    //
    const [SoftSkills, setSoftskill] = useState(true)

    const handleSoftSkill = () => {
        setSoftskill(true)
    }

    ///////////////////////// new category
    const BootstrapDialogcategory = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    function BootstrapDialogTitlecategory(props) {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    BootstrapDialogTitlecategory.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [opencategory, setOpencategory] = React.useState(false);

    const handleClickOpencategory = () => {
        setOpencategory(true);
    };
    const handleClosecategory = () => {
        setOpencategory(false);
    };

    /////////////////////////  Add new Item earningparameter
    const BootstrapDialogearningparameter = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    function BootstrapDialogTitleearningparameter(props) {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    BootstrapDialogTitleearningparameter.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [openearningparameter, setOpenearningparameter] = React.useState(false);

    const handleClickOpenearningparameter = () => {
        setOpenearningparameter(true);
    };
    const handleCloseearningparameter = () => {
        setOpenearningparameter(false);
    };





    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;

        const assignmentName = form.assignmentName?.value;
        const AssignmentStartingDateTime = form.AssignmentStartingDateTime?.value;
        const AssignmentEndingDateTime = form.AssignmentEndingDateTime?.value;
        const assignmentTotalPointsMarks = +(form.assignmentTotalPointsMarks?.value);
        const skillCategory = form.selectskillcategory?.value;




        const manageclass = {
            assignmentName,
            AssignmentStartingDateTime,
            assignmentTotalPointsMarks,
            AssignmentEndingDateTime,
            selectedFile,
            skillCategory,



        }

        console.log(manageclass)


    }

    return (
        <div>
            <Layout>

                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Assignment in Topic 1</p>

                </div>
                <form onSubmit={handleSubmit} className='ms-[40px]  mt-12'>
                    <div className="select-option flex items-center gap-[40px]" onClick={toggleDropdownGeneral} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>1</h1>
                        <p className='text-[25px] font-bold'>General </p>
                        {
                            !isOpenGeneral && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenGeneral && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenGeneral ? 'open' : ''}`}></i>
                    </div>
                    {isOpenGeneral && (
                        <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2 ">
                            <div className='flex justify-between me-10 mb-20'>
                                <div>
                                    <div className=''>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'> Assignment Name</p>
                                            <img src={required} />
                                        </div>

                                        <input required className='mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                            name='assignmentName' type="text" placeholder='Eg. Excel with Shekhar Gupta' />
                                    </div>


                                    <div className='mt-12 flex flex-col'>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'> Assignment Starting Date and Time </p>
                                            <img src={required} />
                                        </div>

                                        <input required className='mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='AssignmentStartingDateTime' type="datetime-local" placeholder='Eg. Entrepreneurship Lab' />
                                        {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                                    </div>


                                    <div className='mt-12'>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'> Assignment Instructions</p>
                                            <img src={required} />
                                        </div>

                                        <input required className='mt-6 ms-6 border rounded-md w-[440px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                            name='assignmentInstructions' type="text" placeholder='Eg. Excel with Shekhar Gupta' />
                                    </div>

                                </div>


                                <div>
                                    <div className=''>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'>Assignment Total Points/Marks</p>
                                            <img src={required} />
                                        </div>

                                        <input required className='mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                            name='assignmentTotalPointsMarks' type="text" placeholder='Eg. 40 point' />
                                    </div>


                                    <div className='mt-12 flex flex-col'>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'> Assignment Ending Date and Time </p>
                                            <img src={required} />
                                        </div>

                                        <input required className='mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='AssignmentEndingDateTime' type="datetime-local" placeholder='Eg. Entrepreneurship Lab' />
                                        {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                                    </div>

                                    <div className='w-full mt-12'>
                                        <div className=' flex flex-col'>
                                            <div className='flex items-center gap-4'>
                                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                                <p className='font-bold text-lg me-[36px]'>Upload Files</p>

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

                            </div>

                        </div>
                    )}

                    <div className="select-option flex items-center gap-[40px] mt-12" onClick={toggleDropdownevaluationParameter} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>2</h1>
                        <p className='text-[25px] font-bold'>Evaluation Parameter</p>
                        {
                            !isOpenevaluationParameter && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenevaluationParameter && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenevaluationParameter ? 'open' : ''}`}></i>
                    </div>
                    {isOpenevaluationParameter && (
                        <div className="dropdown-menu mt-[71px] mb-[45px] ">
                            <div className='flex justify-between me-10'>

                                <p className='flex items-center border-b-2 h-[50px] text-xl font-medium'>Skill Based Parameter</p>
                                <div className=' flex flex-col'>
                                    <div className='flex gap-[72px]'>
                                        {
                                            parametersection && (
                                                <div className='w-[94px] bg-[#FFEAE9]  rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center'>
                                                    <p className='text-2xl'>+</p>
                                                    <div>

                                                        <p className='w-full '>Add</p>

                                                    </div>


                                                </div>
                                            )
                                        }
                                        <div>
                                            <div>
                                                <div variant="outlined" onClick={handleClickOpencategory} className='button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center'>
                                                    <p className='text-2xl'>+</p>
                                                    <div>
                                                        <p className='w-full '>Create new skill category</p>

                                                    </div>


                                                </div>

                                                <BootstrapDialogcategory
                                                    onClose={handleClosecategory}
                                                    aria-labelledby="customized-dialog-title"
                                                    open={opencategory}
                                                >
                                                    <BootstrapDialogTitlecategory id="customized-dialog-title" onClose={handleClosecategory}>
                                                        <p className='text-[22px] font-bold text-[#3E4DAC]'>Add new skill category</p>
                                                    </BootstrapDialogTitlecategory>
                                                    <DialogContent dividers>
                                                        <Typography gutterBottom>
                                                            <form className='mt-6 mx-10'>
                                                                <div className='flex items-center gap-4'>

                                                                    <p className='font-bold text-lg me-[36px]'>Skill Category</p>
                                                                    <img src={required} />

                                                                </div>

                                                                <input required className='mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='itemEarningParameter1' type="text" placeholder='Eg. Entrepreneurship Lab' />

                                                                <div className='flex items-center gap-4'>

                                                                    <p className='font-bold text-lg me-[36px] mt-5'>Skill Name</p>
                                                                    <img className='mt-5' src={required} />
                                                                </div>

                                                                <input required className='mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='itemEarningParameter1' type="text" placeholder='Eg. Entrepreneurship Lab' />

                                                                <div className='flex items-center gap-4'>

                                                                    <p className='font-bold text-lg me-[36px] mt-5'>Skill Parameter</p>
                                                                    <img className='mt-5' src={required} />
                                                                </div>

                                                                <input required className='mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='itemEarningParameter1' type="text" placeholder='Eg. Entrepreneurship Lab' />


                                                                <div className='mt-12 mb-7 flex justify-center'>
                                                                    <input autoFocus className='bg-[#3E4DAC] rounded-lg px-12 py-3 text-xl font-bold text-[#fff]' type="submit" value="Add" />

                                                                </div>
                                                            </form>
                                                        </Typography>

                                                    </DialogContent>

                                                </BootstrapDialogcategory>
                                            </div>


                                        </div >
                                    </div>


                                </div>
                            </div>

                            <div className='flex me-10 justify-between mt-20'>

                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg '>Skill Category</p>

                                    </div>

                                    <div className='bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] font-normal '
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #B7B7B7"
                                        }}>

                                        <span className=' text-base text-[#3E4DAC] font-semibold'>Select Skill Category</span>

                                        <div className="select-option" onClick={toggleDropdownSkillCategory}>
                                            {
                                                !isOpenEvluationSkillCategory && (
                                                    <img src={arrowright}></img>
                                                )
                                            }
                                            {
                                                isOpenEvluationSkillCategory && (
                                                    <img src={arrowDown}></img>
                                                )
                                            }

                                            <i className={`dropdown-arrow ${isOpenEvluationSkillCategory ? 'open' : ''}`}></i>
                                        </div>
                                    </div>
                                    {isOpenEvluationSkillCategory && (
                                        <div className="dropdown-menu w-[312px] ms-5 mt-2"
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid #B7B7B7"
                                            }}>
                                            <ul className="p-3">
                                                <li className='flex ' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input type="radio" id="html" name="selectskillcategory" value="HTML" />
                                                    <div className='flex items-center'>
                                                        <label
                                                            className='ms-5'
                                                            htmlFor="communication"
                                                        >
                                                            Communication
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className='flex' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input type="radio" id="html" name="selectskillcategory" value="HTML" />
                                                    <div className='flex items-center'>
                                                        <label
                                                            className='ms-5'
                                                            htmlFor="com"
                                                        >
                                                            Com
                                                        </label>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    )}
                                </div>


                                <div className='  '>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Skill Name</p>

                                    </div>
                                    <div className="bg-[#F6F7FF] ms-5 mt-6 custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #B7B7B7"
                                        }}
                                    >

                                        <div >

                                            <span className='text-[#3E4DAC] text-base font-semibold'>Select Skill Name </span>

                                        </div>
                                        <div className="select-option" onClick={toggleDropdownSkillName}>
                                            {
                                                !isOpenSkillName && (
                                                    <img src={arrowright}></img>
                                                )
                                            }
                                            {
                                                isOpenSkillName && (
                                                    <img src={arrowDown}></img>
                                                )
                                            }
                                            <i className={`dropdown-arrow ${isOpenSkillName ? 'open' : ''}`}></i>
                                        </div>

                                    </div>
                                    {isOpenSkillName && (
                                        <div className="dropdown-menu w-[300px] mt-2"
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
                                                    checked={selectedOptionskillName.length === 4}
                                                    onChange={handleSelectAllskillName}
                                                />
                                                <label className='text-[#009EF9] text-xs font-medium' htmlFor="selectAll">Select All</label>
                                            </div>
                                            <ul className="p-3 ">

                                                <li className=' flex items-center p-1' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="student"
                                                        name="option"
                                                        value="Student"
                                                        checked={selectedOptionskillName.includes('Student')}
                                                        onChange={handleOptionChangeSkillName}
                                                    />
                                                    <label className='text-xs font-normal' htmlFor="student">Student</label>
                                                </li>
                                                <li className=' flex items-center p-1' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="parent"
                                                        name="option"
                                                        value="Parent"
                                                        checked={selectedOptionskillName.includes('Parent')}
                                                        onChange={handleOptionChangeSkillName}
                                                    />
                                                    <label className='text-xs font-normal' htmlFor="parent">Parent</label>
                                                </li>
                                                <li className=' flex items-center p-1' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="counselor"
                                                        name="option"
                                                        value="Counselor"
                                                        checked={selectedOptionskillName.includes('Counselor')}
                                                        onChange={handleOptionChangeSkillName}
                                                    />
                                                    <label className='text-xs font-normal' htmlFor="counselor">Counselor</label>
                                                </li>
                                                <li className=' flex items-center p-1' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                    <input
                                                        className='me-3'
                                                        type="checkbox"
                                                        id="others"
                                                        name="option"
                                                        value="Others"
                                                        checked={selectedOptionskillName.includes('Others')}
                                                        onChange={handleOptionChangeSkillName}
                                                    />
                                                    <label className='text-xs font-normal' htmlFor="others">Others</label>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                </div>

                                <div>
                                    <div className=''>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'>Skill Parameter</p>

                                        </div>

                                        <div className=' bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] font-normal '
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid #B7B7B7"
                                            }}>

                                            <span className=' text-base text-[#3E4DAC] font-semibold'>Select Skill Parameter</span>

                                            <div className="select-option" onClick={toggleDropdownSkillParameter}>
                                                {
                                                    !isOpenEvluationSkillParameter && (
                                                        <img src={arrowright}></img>
                                                    )
                                                }
                                                {
                                                    isOpenEvluationSkillParameter && (
                                                        <img src={arrowDown}></img>
                                                    )
                                                }

                                                <i className={`dropdown-arrow ${isOpenEvluationSkillParameter ? 'open' : ''}`}></i>
                                            </div>
                                        </div>
                                        {isOpenEvluationSkillParameter && (
                                            <div className="dropdown-menu w-[312px] ms-5 mt-2"
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid #B7B7B7"
                                                }}>
                                                <ul className="p-3">
                                                    <li className='flex ' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                        <input type="radio" id="html" name="selectskillParameter" value="HTML" />
                                                        <div className='flex items-center'>
                                                            <label
                                                                className='ms-5'
                                                                htmlFor="communication"
                                                            >
                                                                Communication
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li className='flex' style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}>
                                                        <input type="radio" id="html" name="selectskillParameter" value="HTML" />
                                                        <div className='flex items-center'>
                                                            <label
                                                                className='ms-5'
                                                                htmlFor="com"
                                                            >
                                                                Com
                                                            </label>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className=' mt-[90px]  border-b-2'>
                                <div className='flex justify-center'>
                                    {
                                        !parametersection && (
                                            <p onClick={handleproceed} className='bg-[#FFDB70] text-base font-bold p-4 rounded-lg mb-10 flex justify-center w-[97px]'>Procced</p>
                                        )
                                    }

                                </div>



                                {
                                    proceed && (<div className=' mt-2 rounded border mb-5 flex me-10 '>

                                        <form className='w-full'>

                                            <div className='flex justify-between'>


                                                <div className='mx-10 mt-10 w-1/6 '>
                                                    {/* 1 */}
                                                    <div className={`w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium ${SoftSkills ? 'text-[#0A98EA] ' : 'text-[black]'}`}
                                                        style={{
                                                            borderRadius: "8px",

                                                            border: `${!SoftSkills ? "1px solid #B7B7B7" : "none"}`,
                                                            background: " #FFF",
                                                            boxShadow: `${SoftSkills ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "none"}`,
                                                        }}>
                                                        <p>Soft Skills</p>
                                                        <img onClick={handleSoftSkill} src={arrowright} />

                                                    </div>

                                                    <div className='w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4'
                                                        style={{
                                                            borderRadius: "8px",
                                                            border: "1px solid #B7B7B7",
                                                            background: " #FFF"
                                                        }}>
                                                        <p>Skill Category 2</p>
                                                        <img src={arrowright} />

                                                    </div>

                                                    <div className='w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4'
                                                        style={{
                                                            borderRadius: "8px",
                                                            border: "1px solid #B7B7B7",
                                                            background: " #FFF"
                                                        }}>
                                                        <p>Skill Category 2</p>
                                                        <img src={arrowright} />

                                                    </div>

                                                    <div className='w-11/12 h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4'
                                                        style={{
                                                            borderRadius: "8px",
                                                            border: "1px solid #B7B7B7",
                                                            background: " #FFF"
                                                        }}>
                                                        <p>Skill Category 2</p>
                                                        <img src={arrowright} />

                                                    </div>

                                                </div>

                                                <div className='flex-1 flex   me-10'>
                                                    {
                                                        SoftSkills && (
                                                            <div className='w-full flex flex-col items-center'>

                                                                <div
                                                                    className={`flex text-base font-medium mt-10 w-11/12  h-[65px] justify-between rounded-md px-4 items-center ${selectedSection === 'communication' ? 'bg-[#E2F1FF]' : 'bg-[#F8F8F8]'
                                                                        }`}
                                                                >
                                                                    <p className='w-full'>Communication</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input
                                                                            className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'
                                                                            name='communication'
                                                                            type='text'
                                                                        />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                        <ArrowForwardIcon onClick={() => handleArrowClick('communication')} />
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className={`flex text-base font-medium mt-8  w-11/12 h-[65px] justify-between rounded-md px-4 items-center ${selectedSection === 'negotiation' ? 'bg-[#E2F1FF]' : 'bg-[#F8F8F8]'
                                                                        }`}
                                                                >
                                                                    <p className='w-full'>Negotiation</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input
                                                                            className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'
                                                                            name='negotiation'
                                                                            type='text'
                                                                        />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                        <ArrowForwardIcon onClick={() => handleArrowClick('negotiation')} />
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className={`flex  text-base font-medium mt-8 w-11/12 h-[65px] justify-between rounded-md px-4 items-center ${selectedSection === 'Time Management' ? 'bg-[#E2F1FF]' : 'bg-[#F8F8F8]'
                                                                        }`}
                                                                >
                                                                    <p className='w-full'>Time Management</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input
                                                                            className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'
                                                                            name='Time Management'
                                                                            type='text'
                                                                        />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                        <ArrowForwardIcon onClick={() => handleArrowClick('Time Management')} />
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        )
                                                    }
                                                    {
                                                        selectedSection && (
                                                            <div className='w-full flex flex-col items-center'>
                                                                <div className='flex text-base font-medium mt-10 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center'>
                                                                    <p className='w-full' > Verbal Communication</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]' name='verbalCommunication' type='text' />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                    </div>


                                                                </div>
                                                                <div className='flex text-base font-medium mt-8 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center'>
                                                                    <p className='w-full'>Non- Verbal Communication</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]' name='verbalCommunication' type='text' />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                    </div>

                                                                </div>
                                                                <div className='flex text-base font-medium mt-8 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center'>
                                                                    <p className='w-full'>Active Listening</p>
                                                                    <div className='flex justify-between ms-2 items-center w-full'>
                                                                        <input className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]' name='verbalCommunication' type='text' />
                                                                        <p className='w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]'>%</p>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                            <div className='mt-9 mb-7 flex justify-center'>

                                                <p onClick={handleparametersection} className='bg-[#2EB0FB] rounded-lg px-4 py-1 font-semibold text-[#fff]'>Apply</p>

                                            </div>
                                        </form>
                                    </div>)
                                }
                                {
                                    parametersection && (
                                        <div className='flex  justify-between px-10 py-6 mb-5 me-10 '
                                            style={{
                                                borderRadius: "10px",
                                                border: "1px solid #939393"
                                            }}
                                        >
                                            <div >
                                                <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Soft Skills</p>
                                            </div>
                                            <div >
                                                <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Communication</p>
                                            </div>

                                            <div className='flex gap-10'>
                                                <div className='flex flex-col gap-5'>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Verbal Communication</p>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Non-Verbal Communication</p>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Active Listening</p>
                                                </div>

                                                <div className='flex flex-col gap-5'>

                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>
                                                        <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                            <img src={edit} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>

                                                    </div>
                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>

                                                    </div>
                                                </div>

                                                {/* <div className='flex items-center justify-between'>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Verbal Communication</p>
                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>
                                                        <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                            <img src={edit} />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Non-Verbal Communication</p>
                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>
                                                        <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                            <img src={edit} />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'>Active Listening</p>
                                                    <div className='flex gap-16 items-center '>
                                                        <p className='bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal'
                                                            style={{
                                                                border: " 0.909px solid #CECECE",
                                                                background: "#FFFEE2"
                                                            }}
                                                        >50%</p>
                                                        <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                            <img src={edit} />
                                                        </div>
                                                    </div>

                                                </div> */}





                                            </div>

                                        </div>
                                    )
                                }
                            </div>

                            <div className=''>
                                <div className='flex justify-between me-10 mt-10'>
                                    <p className='text-xl font-medium border-b-2 flex items-center'>Item Earning Parameter</p>
                                    <div className=''>
                                        <div className=' flex flex-col'>
                                            <div className='flex gap-[72px]'>
                                                {
                                                    parametersection && (
                                                        <div className='w-[94px] bg-[#FFEAE9]  rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center'>
                                                            <p className='text-2xl'>+</p>
                                                            <div>

                                                                <p className='w-full '>Add</p>

                                                            </div>

                                                        </div>
                                                    )
                                                }


                                                <div>
                                                    <div>
                                                        <div variant="outlined" onClick={handleClickOpenearningparameter} className='button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center'>
                                                            <p className='text-2xl'>+</p>
                                                            <div>
                                                                <p className='w-full '>Create new earning parameter</p>

                                                            </div>


                                                        </div>

                                                        <BootstrapDialogearningparameter
                                                            onClose={handleCloseearningparameter}
                                                            aria-labelledby="customized-dialog-title"
                                                            open={openearningparameter}
                                                        >
                                                            <BootstrapDialogTitleearningparameter id="customized-dialog-title" onClose={handleCloseearningparameter}>
                                                                <p className='text-[22px] font-bold text-[#3E4DAC]'>Add new Item earning parameter</p>
                                                            </BootstrapDialogTitleearningparameter>
                                                            <DialogContent dividers>
                                                                <Typography gutterBottom>
                                                                    <form className='mt-6 mx-10'>
                                                                        <div className='flex items-center gap-4'>

                                                                            <p className='font-bold text-lg me-[36px]'>Item Earning Parameter</p>
                                                                        </div>

                                                                        <input className='mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='itemEarningParameter1' type="text" placeholder='Eg. Entrepreneurship Lab' />

                                                                        <div className='mt-12 mb-7 flex justify-center'>
                                                                            <input autoFocus onClick={handleCloseearningparameter} className='bg-[#3E4DAC] rounded-lg px-12 py-3 text-xl font-bold text-[#fff]' type="submit" value="Add" />

                                                                        </div>
                                                                    </form>
                                                                </Typography>

                                                            </DialogContent>

                                                        </BootstrapDialogearningparameter>
                                                    </div>


                                                </div >

                                            </div>


                                        </div>

                                    </div>
                                </div>



                                <div className=' mt-12'>
                                    {
                                        !parametersection && (
                                            <>
                                                <div className='flex items-center gap-4'>
                                                    <p className='h-2 w-2 bg-black rounded-full'></p>
                                                    <p className='font-bold text-lg me-[36px]'>Item Earning Parameter</p>
                                                </div>
                                                <div className='flex gap-20 items-center'>
                                                    <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[349px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                                        style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)" }}
                                                    >

                                                        <select
                                                            required
                                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0'
                                                            name="itemEarningParameter"
                                                        >
                                                            <option selected className="">Select Item Earning Parameter</option>
                                                            <option value="Offline"> Offline</option>

                                                        </select>

                                                    </div>
                                                    <div className='mt-12 mb-7 flex justify-center'>
                                                        <input className='bg-[#2EB0FB] rounded-lg px-4 py-3 font-semibold text-[#fff]' type="submit" value="Apply" />

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        !parametersection && (
                                            <div className='flex gap-5 items-center ms-5 mt-5'>
                                                <div className='flex gap-2 bg-[#DAFFD3] p-2 rounded'>
                                                    <p>Creativity</p>
                                                    <img src={closeCircle} />
                                                </div>
                                                <input
                                                    className='w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#F6F7FF]'
                                                    name='communication'
                                                    type='text'
                                                    placeholder='0'
                                                />
                                                <div className='w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#F6F7FF]'>
                                                    <p>%</p>
                                                    <img src={arrowDown} />
                                                </div>

                                            </div>
                                        )

                                    }

                                    {
                                        parametersection && (
                                            <div className=' mt-12'>



                                                <div className=' w-[420px] px-[36px] py-[25px] mt-16'
                                                    style={{
                                                        borderRadius: "20px",
                                                        border: "1px solid #B4B4B4"
                                                    }}
                                                >
                                                    <div className='flex  justify-between items-center '>
                                                        <div className='flex gap-2 bg-[#DAFFD3] p-2 rounded'>
                                                            <p>Creativity</p>

                                                        </div>
                                                        <div className='flex gap-10 me-[70px]'>
                                                            <div className='w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#DAFFD3]'>
                                                                <p>50</p>
                                                                <p>%</p>

                                                            </div>
                                                            <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                                <img src={edit} />
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className='flex justify-between items-center  mt-5'>
                                                        <div className='flex gap-2 bg-[#E8F1FF] p-2 rounded'>
                                                            <p>Delight</p>

                                                        </div>
                                                        <div className='flex gap-10 me-[70px]'>
                                                            <div className='w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#E8F1FF]'>
                                                                <p>50</p>
                                                                <p>%</p>

                                                            </div>
                                                            <div className='bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center '>
                                                                <img src={edit} />
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>



                                            </div>
                                        )
                                    }

                                </div>

                            </div>


                        </div>
                    )}






                    <div className='flex items-center justify-center mt-20 mb-10'>
                        <input type="submit" value='Save' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                        <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                    </div>



                </form>


            </Layout>
        </div >
    );
};

export default Assignment;