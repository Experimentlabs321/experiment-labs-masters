
import required from '../../../assets/ContentManagement/required.png'
import chevronright from '../../../assets/ContentManagement/chevronright.svg'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';

import bxseditalt from '../../../assets/ContentManagement/bxseditalt.svg'
import Vector from '../../../assets/ContentManagement/Vector.svg'
import trash from '../../../assets/ContentManagement/trash.svg'
import back from '../../../assets/ContentManagement/back.svg'
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import arrow from '../../../assets/SkillsManagement/arrow.svg'
import { Link } from 'react-router-dom';
import AddingEditingCalQues from './AddingEditingCalQues';
import Layout from '../Layout';



const ManageQuestion = () => {
    const [selectedTab, setSelectedTab] = useState('Questions');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    //

    const [allSelect, setAllSelect] = useState(false);
    const [move, setMove] = useState(false);
    const [selectedOptionsQuestion, setSelectedOptionsQuestion] = useState([]);



    const handleOptionChangeQuestion = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsQuestion([...selectedOptionsQuestion, optionValue]);
            setMove(true)
        } else {
            setSelectedOptionsQuestion(selectedOptionsQuestion.filter((option) => option !== optionValue));
            setMove(false)
        }
    };

    const handleSelectAllQues = (event) => {
        const isChecked = event.target.checked;
        setAllSelect(true);

        if (isChecked) {
            setSelectedOptionsQuestion(['1', '2', '3',]);
        } else {
            setSelectedOptionsQuestion([]);
        }
    };
    ///

    const handleAllSelect = () => {
        setAllSelect(false);
        setSelectedOptionsQuestion([]);

    }


    // popup add from ques bank

    const [allSelectFromQuesBank, setAllSelectFromQuesBank] = useState(false);
    // const [move, setMove] = useState(false);
    const [selectedOptionsQuestionFromQuesBank, setSelectedOptionsQuestionFromQuesBank] = useState([]);



    const handleOptionChangeQuestionFromQuesBank = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptionsQuestionFromQuesBank([...selectedOptionsQuestionFromQuesBank, optionValue]);
            setMove(true)
        } else {
            setSelectedOptionsQuestionFromQuesBank(selectedOptionsQuestionFromQuesBank.filter((option) => option !== optionValue));
            setMove(false)
        }
    };

    const handleSelectAllQuesFromQuesBank = (event) => {
        const isChecked = event.target.checked;
        setAllSelectFromQuesBank(true);
        setAllSelect(false)

        if (isChecked) {
            setSelectedOptionsQuestionFromQuesBank(['1', '2', '3',]);
        } else {
            setSelectedOptionsQuestionFromQuesBank([]);
        }
    };
    ///

    const handleAllSelectFromQuesBank = () => {
        setAllSelectFromQuesBank(false);
        setSelectedOptionsQuestionFromQuesBank([]);

    }




    ////////////////////// add ques type
    const BootstrapDialogNewQues = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    function BootstrapDialogTitleNewQuesType(props) {
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

    BootstrapDialogTitleNewQuesType.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [openNewQuesType, setOpenNewQuesType] = React.useState(false);

    const handleClickOpenNewQuesType = () => {
        setOpenNewQuesType(true);
    };
    const handleCloseNewQuesType = () => {
        setOpenNewQuesType(false);
    };


    ////////////////////// Add From QuesBank
    const BootstrapDialogAddFromQuesBank = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
        '& .MuiDialog-paper': {
            width: '100%',
        },
    }));

    function BootstrapDialogTitleAddFromQuesBank(props) {
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

    BootstrapDialogTitleAddFromQuesBank.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [openAddFromQuesBank, setOpenAddFromQuesBank] = useState(false);

    const handleClickOpenAddFromQuesBank = () => {
        setOpenAddFromQuesBank(true);
    };
    const handleCloseAddFromQuesBank = () => {
        setOpenAddFromQuesBank(false);
    };



    //
    const [isOpenEvaluationCourseSelection, setIsOpenEvaluationCourseSelection] = useState(false);
    
    const toggleDropdownCourseSelection = () => {
        setIsOpenEvaluationCourseSelection(!isOpenEvaluationCourseSelection);
    };

    //
    const [addQues, setAddQues] = useState(false);

   

    //
   

    const handleAddSelQues = () => {
        setAddQues(false)


    }




    return (
        <div>
            <Layout>
                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Quiz in Topic 1</p>

                </div>
                <div className='px-10 flex  justify-between pb-3 text-lg'>
                    <Link to='/quizGeneralinfo'
                        onClick={() => handleTabClick('Quiz General Information')}
                        style={{
                            fontWeight: selectedTab === 'Quiz General Information' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Quiz General Information' ? '2px solid black' : 'none'
                        }}
                    >
                        Quiz General Information
                    </Link>
                    <Link to='/manageQuestion'
                        onClick={() => handleTabClick('Questions')}
                        style={{
                            fontWeight: selectedTab === 'Questions' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Questions' ? '2px solid black' : 'none'
                        }}
                    >
                        Questions
                    </Link>
                    <Link to='/manageQuestionBank'
                        onClick={() => handleTabClick('Question Bank')}
                        style={{
                            fontWeight: selectedTab === 'Question Bank' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Question Bank' ? '2px solid black' : 'none'
                        }}
                    >
                        Question Bank
                    </Link>
                    <Link to='/quizResult'
                        onClick={() => handleTabClick('Results')}
                        style={{
                            fontWeight: selectedTab === 'Results' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Results' ? '2px solid black' : 'none'
                        }}
                    >
                        Results
                    </Link>
                    <Link to='/quizEvaluationParameter'
                        onClick={() => handleTabClick('Evaluation Parameter')}
                        style={{
                            fontWeight: selectedTab === 'Evaluation Parameter' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Evaluation Parameter' ? '2px solid black' : 'none'
                        }}
                    >
                        Evaluation Parameter
                    </Link>
                </div>


               

                {
                    selectedTab === 'Questions' && (
                        <div className="mx-10 my-20">
                            {
                                !addQues && (
                                    <div >
                                        <div className='flex justify-between'>



                                            <div className=' flex items-center'>
                                                <div className='flex items-center justify-between border rounded-2xl  h-[40px] px-5 text-[#535353]  bg-[#F6F7FF] '>
                                                    <div className='flex gap-2'>
                                                        <SearchIcon />
                                                        <input className='focus:outline-0 text-[#535353]  bg-[#F6F7FF]'
                                                            name='Location' type="text" placeholder='Search Question' />
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                !allSelect && (
                                                    <div className=' '>

                                                        <div onClick={toggleDropdownCourseSelection} className="custom-dropdown flex justify-between items-center gap-2  h-[40px]  px-2 text-base text-[#fff] bg-[#3E4DAC] font-bold"
                                                            style={{
                                                                borderRadius: "8px",
                                                                border: "1px solid #B7B7B7"
                                                            }}
                                                        >

                                                            <div >
                                                                <div className='flex gap-2'>
                                                                    <p>+</p>
                                                                    <p>Add Question</p>


                                                                </div>

                                                            </div>
                                                            <div className="select-option" >
                                                                <img src={chevronright} alt='chevronRight'/>
                                                                <i className={`dropdown-arrow ${isOpenEvaluationCourseSelection ? 'open' : ''}`}></i>
                                                            </div>

                                                        </div>
                                                        {isOpenEvaluationCourseSelection && (
                                                            <div className="dropdown-menu bg-[black] text-[#fff] mt-1 flex gap-3 flex-col p-3"
                                                                style={{
                                                                    borderRadius: "8px",
                                                                    border: "1px solid #B7B7B7"
                                                                }}
                                                            >


                                                                <button onClick={handleClickOpenNewQuesType} >Add new question</button>

                                                                <div className='flex items-center'>
                                                                    <div>


                                                                        <BootstrapDialogNewQues
                                                                            onClose={handleCloseNewQuesType}
                                                                            aria-labelledby="customized-dialog-title"
                                                                            open={openNewQuesType}
                                                                        >
                                                                            <BootstrapDialogTitleNewQuesType id="customized-dialog-title" onClose={handleCloseNewQuesType}>
                                                                                <p className='text-[22px] font-bold text-[#3E4DAC]'>Question Type</p>
                                                                            </BootstrapDialogTitleNewQuesType>
                                                                            <DialogContent dividers>
                                                                                <Typography gutterBottom>
                                                                                    <form className=' mx-10'>
                                                                                        <div className='flex gap-10'>
                                                                                            <div className=''>
                                                                                                <div className=' '>
                                                                                                    <input type="radio" id="Calculated" name="fav_language" value="Calculated" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Calculated">Calculated</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Matching" name="fav_language" value="Matching" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Matching">Matching</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Numerical" name="fav_language" value="Numerical" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Numerical">Numerical</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Essay" name="fav_language" value="Essay" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Essay">Essay</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Drag and drop into text" name="fav_language" value="Drag and drop into text" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Drag and drop into text">Drag and drop into text</label>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div className=''>
                                                                                                <div className=''>
                                                                                                    <input type="radio" id="Calculated Multichoice" name="fav_language" value="Calculated Multichoice" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Calculated Multichoice">Calculated Multichoice</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Multiple choice" name="fav_language" value="Multiple choice" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Multiple choice">Multiple choice</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Short answer" name="fav_language" value="Short answer" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="Short answer">Short answer</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="True/False" name="fav_language" value="True/False" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="True/False">True/False</label>
                                                                                                </div>
                                                                                                <div className='mt-6'>
                                                                                                    <input type="radio" id="Select missing words" name="fav_language" value="Select missing words" />
                                                                                                    <label className='ms-6 text-sm font-semibold' for="True/False">Select missing words</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='flex justify-center mt-10'>
                                                                                            <Link to='/addingEditingCalQues' className='px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg'> Add </Link>
                                                                                        </div>

                                                                                    </form>
                                                                                </Typography>

                                                                            </DialogContent>

                                                                        </BootstrapDialogNewQues>
                                                                    </div>

                                                                </div>


                                                                <button onClick={handleClickOpenAddFromQuesBank}>Add from question bank</button>


                                                                <div className='w-full'>
                                                                    <BootstrapDialogAddFromQuesBank
                                                                        onClose={handleCloseAddFromQuesBank}
                                                                        aria-labelledby="customized-dialog-title"
                                                                        open={openAddFromQuesBank}

                                                                    >
                                                                        <BootstrapDialogTitleAddFromQuesBank id="customized-dialog-title" onClose={handleCloseAddFromQuesBank}>
                                                                            <p className='text-[22px] font-bold text-[#3E4DAC]'>Add Question From Question Bank</p>
                                                                        </BootstrapDialogTitleAddFromQuesBank>
                                                                        <DialogContent dividers>
                                                                            <Typography gutterBottom>
                                                                                <div className=' w-full '>

                                                                                    <div className='flex justify-between items-center mb-10'>
                                                                                        <div className='  flex items-center'>
                                                                                            <div className="flex items-center gap-4">

                                                                                                <p className="text-lg font-semibold">
                                                                                                    Select Batch
                                                                                                </p>

                                                                                            </div>

                                                                                            <div className=" flex gap-2  ms-6 border rounded-md  h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
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

                                                                                        <div className='flex '>
                                                                                            {
                                                                                                !allSelectFromQuesBank && (
                                                                                                    <div className=''>



                                                                                                        <div>
                                                                                                            <input
                                                                                                                style={{ fontSize: "0", opacity: "0" }}
                                                                                                                className='w-[0%]'
                                                                                                                type="checkbox"
                                                                                                                id="selectAllfromquesbank"
                                                                                                                checked={selectedOptionsQuestionFromQuesBank.length === 3}
                                                                                                                onChange={handleSelectAllQuesFromQuesBank}
                                                                                                            />
                                                                                                            <label className=' text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2' htmlFor="selectAllfromquesbank">Select All</label>

                                                                                                        </div>


                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            {
                                                                                                allSelectFromQuesBank && (
                                                                                                    <div className='flex  p-2'>

                                                                                                        <label onClick={handleAllSelectFromQuesBank} className=' text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2' htmlFor="DeSelect All">Deselect All</label>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            {
                                                                                                allSelectFromQuesBank && (
                                                                                                    <div className='flex  p-2'>

                                                                                                        <label className=' text-base font-semibold bg-[#FFE9E9] rounded-lg border p-2' htmlFor="Delete Selected">Delete Selected</label>
                                                                                                    </div>
                                                                                                )
                                                                                            }


                                                                                        </div>

                                                                                    </div>



                                                                                    <div className=''>
                                                                                        <div className=" mt-2"

                                                                                        >

                                                                                            <table className='w-full'>
                                                                                                <thead className='bg-[#FFFDEA]  '>
                                                                                                    <tr className='text-[#3E4DAC] text-base font-bold'>
                                                                                                        <th className='py-5'>Question No</th>
                                                                                                        <th>Question Name</th>
                                                                                                        <th>Question Type</th>
                                                                                                        <th>Marks</th>
                                                                                                        <th>Preview</th>


                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody className=''>

                                                                                                    <tr className='bg-[#F2FFFA] '>
                                                                                                        <td className='flex justify-center py-5 '>
                                                                                                            {
                                                                                                                allSelectFromQuesBank && (
                                                                                                                    <input
                                                                                                                        className='me-3'
                                                                                                                        type="checkbox"
                                                                                                                        id="1"
                                                                                                                        name="option"
                                                                                                                        value="1"
                                                                                                                        checked={selectedOptionsQuestionFromQuesBank.includes('1')}
                                                                                                                        onChange={handleOptionChangeQuestionFromQuesBank}
                                                                                                                    />
                                                                                                                )
                                                                                                            }

                                                                                                            <p>1</p>
                                                                                                        </td>
                                                                                                        <td className='text-center'>Question Name</td>
                                                                                                        <td className='text-center'>Question Type</td>
                                                                                                        <td className='text-center'>Marks</td>
                                                                                                        <td className='flex items-center justify-center'><img src={Vector} alt='Vector' /></td>


                                                                                                    </tr>
                                                                                                    <tr className=''>
                                                                                                        <td className='flex justify-center py-5'>
                                                                                                            {
                                                                                                                allSelectFromQuesBank && (
                                                                                                                    <input
                                                                                                                        className='me-3'
                                                                                                                        type="checkbox"
                                                                                                                        id="2"
                                                                                                                        name="option"
                                                                                                                        value="2"
                                                                                                                        checked={selectedOptionsQuestionFromQuesBank.includes('2')}
                                                                                                                        onChange={handleOptionChangeQuestionFromQuesBank}
                                                                                                                    />
                                                                                                                )
                                                                                                            }

                                                                                                            <p>2</p>
                                                                                                        </td>
                                                                                                        <td className='text-center'>Question Name</td>
                                                                                                        <td className='text-center'>Question Type</td>
                                                                                                        <td className='text-center'>Marks</td>
                                                                                                        <td className='flex items-center justify-center'><img src={Vector} /></td>


                                                                                                    </tr>
                                                                                                    <tr className=' bg-[#F2FFFA]'>
                                                                                                        <td className='flex justify-center py-5'>
                                                                                                            {
                                                                                                                allSelectFromQuesBank && (
                                                                                                                    <input
                                                                                                                        className='me-3'
                                                                                                                        type="checkbox"
                                                                                                                        id="3"
                                                                                                                        name="option"
                                                                                                                        value="3"
                                                                                                                        checked={selectedOptionsQuestionFromQuesBank.includes('3')}
                                                                                                                        onChange={handleOptionChangeQuestionFromQuesBank}
                                                                                                                    />
                                                                                                                )
                                                                                                            }

                                                                                                            <p>3</p>
                                                                                                        </td>
                                                                                                        <td className='text-center'>Question Name</td>
                                                                                                        <td className='text-center'>Question Type</td>
                                                                                                        <td className='text-center'>Marks</td>
                                                                                                        <td className='flex items-center justify-center'><img src={Vector} alt='Vector'/></td>


                                                                                                    </tr>

                                                                                                </tbody>
                                                                                            </table>

                                                                                        </div>
                                                                                    </div>




                                                                                    <div className='flex justify-center mt-10'>
                                                                                        <p autoFocus onclick={handleAddSelQues} className='px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg'>Add selected questions to quiz</p>
                                                                                    </div>


                                                                                </div>
                                                                            </Typography>

                                                                        </DialogContent>

                                                                    </BootstrapDialogAddFromQuesBank>
                                                                </div>



                                                            </div>
                                                        )}

                                                    </div>

                                                )
                                            }




                                        </div>

                                        <div className='flex justify-between mt-20 mb-10'>
                                            <div className='flex '>
                                                {
                                                    !allSelect && (
                                                        <div className='flex  p-2'>
                                                            <input
                                                                style={{ fontSize: "0", opacity: "0" }}
                                                                className='w-[0%]'
                                                                type="checkbox"
                                                                id="selectAll"
                                                                checked={selectedOptionsQuestion.length === 3}
                                                                onChange={handleSelectAllQues}
                                                            />
                                                            <label className=' text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2' htmlFor="selectAll">Select All</label>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    allSelect && (
                                                        <div className='flex  p-2'>

                                                            <label onClick={handleAllSelect} className=' text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2' htmlFor="DeSelect All">Deselect All</label>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    allSelect && (
                                                        <div className='flex  p-2'>

                                                            <label className=' text-base font-semibold bg-[#FFE9E9] rounded-lg border p-2' htmlFor="Delete Selected">Delete Selected</label>
                                                        </div>
                                                    )
                                                }


                                            </div>

                                        </div>

                                        <div className='flex justify-between text-lg font-medium mb-10'>
                                            <div className='flex gap-2 items-center'>
                                                <p> Total Questions : <span className='text-[#3E4DAC]'>3</span></p>

                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p>Total Marks/Points : <span className='text-[#3E4DAC]'>100</span></p>
                                                <img src={bxseditalt} alt='bxseditalt'/>
                                            </div>

                                        </div>

                                        <div className=''>
                                            <div className="w-[100%] mt-2"

                                            >

                                                <table className='w-full'>
                                                    <thead className='bg-[#FFFDEA]  '>
                                                        <tr className='text-[#3E4DAC] text-base font-bold'>
                                                            <th className='py-5'>Question No</th>
                                                            <th>Question Name</th>
                                                            <th>Question Type</th>
                                                            <th>Marks</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>

                                                        <tr className='bg-[#F2FFFA] '>
                                                            <td className='flex justify-center py-5 '>
                                                                {
                                                                    allSelect && (
                                                                        <input
                                                                            className='me-3'
                                                                            type="checkbox"
                                                                            id="1"
                                                                            name="option"
                                                                            value="1"
                                                                            checked={selectedOptionsQuestion.includes('1')}
                                                                            onChange={handleOptionChangeQuestion}
                                                                        />
                                                                    )
                                                                }

                                                                <p>1</p>
                                                            </td>
                                                            <td className='text-center'>Question Name</td>
                                                            <td className='text-center'>Question Type</td>
                                                            <td className='text-center'>Marks</td>
                                                            <td className='flex items-center justify-center'><img src={bxseditalt} alt='bxseditalt'/></td>

                                                            <td className=''><img src={trash} alt='trash'/></td>
                                                            
                                                        </tr>
                                                        <tr className=''>
                                                            <td className='flex justify-center py-5'>
                                                                {
                                                                    allSelect && (
                                                                        <input
                                                                            className='me-3'
                                                                            type="checkbox"
                                                                            id="2"
                                                                            name="option"
                                                                            value="2"
                                                                            checked={selectedOptionsQuestion.includes('2')}
                                                                            onChange={handleOptionChangeQuestion}
                                                                        />
                                                                    )
                                                                }

                                                                <p>2</p>
                                                            </td>
                                                            <td className='text-center'>Question Name</td>
                                                            <td className='text-center'>Question Type</td>
                                                            <td className='text-center'>Marks</td>
                                                            <td className='flex items-center justify-center'><img src={bxseditalt} alt='bxseditalt'/></td>

                                                            <td className=''><img src={trash} /></td>
                                                        </tr>
                                                        <tr className=' bg-[#F2FFFA]'>
                                                            <td className='flex justify-center py-5'>
                                                                {
                                                                    allSelect && (
                                                                        <input
                                                                            className='me-3'
                                                                            type="checkbox"
                                                                            id="3"
                                                                            name="option"
                                                                            value="3"
                                                                            checked={selectedOptionsQuestion.includes('3')}
                                                                            onChange={handleOptionChangeQuestion}
                                                                        />
                                                                    )
                                                                }

                                                                <p>3</p>
                                                            </td>
                                                            <td className='text-center'>Question Name</td>
                                                            <td className='text-center'>Question Type</td>
                                                            <td className='text-center'>Marks</td>
                                                            <td className='flex items-center justify-center'><img src={bxseditalt} alt='bxseditalt'/></td>

                                                            <td className=''><img src={trash} alt='trash'/></td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>

                                    </div >
                                )
                            }
                            {
                                addQues && (
                                    <>
                                        <div>
                                            <div className="flex justify-between items-center mb-10">
                                                <p className=" text-[26px] font-bold ">Adding/Editing Calculation Question </p>
                                                <div onClick={() => setAddQues(false)} className='bg-[#3E4DAC] flex  px-4 py-2 rounded-lg text-[#fff]'>
                                                    <img src={back} />
                                                    <p className="">Back</p>
                                                </div>

                                            </div>
                                            <AddingEditingCalQues />
                                        </div>
                                    </>

                                )
                            }

                        </div>
                    )
                }




            </Layout>
        </div >






    )
};


export default ManageQuestion;