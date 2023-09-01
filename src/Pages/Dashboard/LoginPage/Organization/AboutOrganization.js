//AboutOrganization




import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image9 from '../../../../assets/LoginPage/image9.png';
import image10 from '../../../../assets/LoginPage/image10.png';
import account from '../../../../assets/LoginPage/account.svg';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const AboutOrganization = () => {
    const [Academic, setAcademic] = useState('');
    const [Gamification, setGamification] = useState('');
    const [Batches, setBatches] = useState('');
    const [ChampionsClubs, setChampionsClub] = useState('');

    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(false);

    const toggleSelection1 = () => {
        setSelected1(!selected1);
        setAcademic('Academic')
    };
    const toggleSelection2 = () => {
        setSelected2(!selected2);
        setGamification('Gamification')
    };
    const toggleSelection3 = () => {
        setSelected3(!selected3);
        setBatches('Batches')
    };



    return (
        <div className="flex"

        >
            <div className='w-[100%]'>
                <p className="flex items-center text-3xl font-semibold gap-2 ps-[80px] pt-[80px]"><Link to='/organizationName' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
                </p>

                <p className=' text-center text-4xl font-extrabold mt-20 '>Tell us about your <br /> Organization ! </p>
                <p className=' text-xl font-semibold mt-[35px] text-center text-[#8F8F8FCC] '>Select the categories to define your organization/product. </p>
                <div className=' overflow-auto h-[500px] mt-[50px]'>
                    <div className='grid grid-cols-3 mx-[100px] gap-[35px] '>

                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected1 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection1}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Academic</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected2 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection2}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Gamification</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected3 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection3}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Batches</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected1 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection1}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Academic</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected2 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection2}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Gamification</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected3 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection3}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Batches</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected1 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection1}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Academic</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected2 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection2}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Gamification</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected3 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection3}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Batches</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected1 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection1}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Academic</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected2 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection2}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Gamification</p>

                        </div>
                        <div className={`flex justify-center items-center h-[60px] text-lg font-semibold ${selected3 ? 'bg-[#065AD8] text-white' : 'border-[#8F8F8F] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`}
                            onClick={toggleSelection3}
                            style={{
                                borderRadius: "36px",
                                border: "1px solid #8F8F8F",

                            }}
                        >
                            <p >Batches</p>

                        </div>



                    </div>
                    <div className='flex justify-center'>
                        <p className='w-[170px] h-[60px] flex justify-center items-center mt-10'
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F",
                                background: "#F2FAFC"
                            }}
                        >View All</p>
                    </div>
                </div>

            </div>

            <div className='w-[100%]'
                style={{
                    backgroundImage: `url(${image9})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh"
                }}
            >
                <p className="flex items-center justify-end text-[#065AD8] text-3xl font-semibold gap-2 pt-[80px] pe-[150px]"><Link to='' >Skip <span><ArrowForwardIcon /></span> </Link>
                </p>

                <div className='flex justify-center pt-[100px]'>
                    <img src={image10} alt='image' />
                </div>

                <div className='flex justify-end'>
                    <Link to='/organizationServices'
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"

                        }}
                        className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-20 mb-10">Next</Link>
                </div>

            </div>








        </div >




    );
};

export default AboutOrganization;

