///StudentSignUpSelectCourses



import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image3 from '../../../../assets/LoginPage/image3.png';
import movieLab from '../../../../assets/LoginPage/movieLab.png';
import EntrepreneurshipLab from '../../../../assets/LoginPage/EntrepreneurshipLab.png';
import ProductLab from '../../../../assets/LoginPage/ProductLab.png';
import ChampionsClub from '../../../../assets/LoginPage/Championsclub.png';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const StudentSignUpSelectCourses = () => {

    const [MovieLabs, setMovieLab] = useState('');
    const [EntrepreneurshipLabs, setEntrepreneurshipLab] = useState('');
    const [ProductLabs, setProductLab] = useState('');
    const [ChampionsClubs, setChampionsClub] = useState('');

    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(false);

    const toggleSelection1 = () => {
        setSelected1(!selected1);
        setMovieLab('Movie Lab')
    };
    const toggleSelection2 = () => {
        setSelected2(!selected2);
        setEntrepreneurshipLab('Entrepreneurship Lab')
    };
    const toggleSelection3 = () => {
        setSelected3(!selected3);
        setProductLab('Product Lab')
    };
    const toggleSelection4 = () => {
        setSelected4(!selected4);
        setChampionsClub('Champions Club')
    };




    return (
        <div className="">
            <div className='flex justify-between mx-20 mt-[100px]'>
                <p className="flex items-center text-3xl font-semibold gap-2 "><Link to='/selectProfile' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
                </p>
                <p className='text-[#065AD8] text-2xl font-bold'>
                    Skip <span> <ArrowForwardIcon /></span>
                </p>
            </div>

            <div className="flex">
                <div className="w-[100%] flex flex-col items-center mt-[70px]">

                    <p className=' text-[40px] font-extrabold'>Select your Course(s)  </p>
                    <div className='w-full mt-[85px] '>
                        <div className='flex gap-[40px] mx-[90px] '>
                            <div className='h-[357px] w-[60%]'
                                style={{
                                    borderRadius: "36px",
                                    background: "rgba(10, 152, 234, 0.10)"
                                }}
                            >
                                <p className='flex justify-center mb-[-25px] mt-[39px]'><img src={movieLab} alt='img' /></p>
                                <div className='bg-[#006BA6] rounded-[14px] h-[85px] flex flex-col justify-center mx-[22px]'>
                                    <p className='text-[#fff] text-base font-bold ms-5'>Movie Lab</p>
                                    <p className='text-[#fff] text-xs font-medium flex justify-between mx-5 mt-1'>Siddharth Moulik <Link className='text-[10px] border-b '>See more</Link></p>

                                </div>

                                <div className={`flex justify-center items-center h-[74px] mt-[34px] text-lg font-semibold ${selected1 ? 'bg-[#065AD8] text-white' : 'border-[#006BA6] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`} 
                                   onClick={toggleSelection1}
                                    style={{
                                        borderRadius: "36px",
                                        border: "1px solid #006BA6",
                                        
                                    }}
                                >
                                    <p >Select</p>

                                </div>


                            </div>
                            <div className='h-[357px] w-[60%]'
                                style={{
                                    borderRadius: "36px",
                                    background: "rgba(10, 152, 234, 0.10)"
                                }}
                            >
                                <p className='flex justify-center mb-[-23px] mt-[33px]'><img src={EntrepreneurshipLab} alt='img' /></p>
                                <div className='bg-[#FFBC42] rounded-[14px] h-[85px] flex flex-col justify-center mx-[22px]'>
                                    <p className=' text-base font-bold ms-5'>Entrepreneurship Lab</p>
                                    <p className=' text-xs font-medium flex justify-between mx-5 mt-1'>Naman Jain <Link className='text-[10px] border-b border-b-black'>See more</Link></p>

                                </div>

                                <div className={`flex justify-center items-center h-[74px] mt-[34px] text-lg font-semibold ${selected2 ? 'bg-[#065AD8] text-white' : 'border-[#006BA6] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`} 
                                onClick={toggleSelection2}
                                    style={{
                                        borderRadius: "36px",
                                        border: "1px solid #006BA6",
                                       
                                    }}
                                >
                                    <p >Select</p>

                                </div>


                            </div>
                            <div className='h-[357px] w-[60%]'
                                style={{
                                    borderRadius: "36px",
                                    background: "rgba(10, 152, 234, 0.10)"
                                }}
                            >
                                <p className='flex justify-center mb-[-18px] mt-[39px]'><img src={ProductLab} alt='img' /></p>
                                <div className='bg-[#D81159] rounded-[14px] h-[85px] flex flex-col justify-center mx-[22px]'>
                                    <p className='text-[#fff] text-base font-bold ms-5'>Product Lab</p>
                                    <p className='text-[#fff] text-xs font-medium flex justify-between mx-5 mt-1'>Shekhar Gupta<Link className='text-[10px] border-b'>See more</Link></p>

                                </div>

                                <div className={`flex justify-center items-center h-[74px] mt-[34px] text-lg font-semibold ${selected3 ? 'bg-[#065AD8] text-white' : 'border-[#006BA6] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`} 
                                onClick={toggleSelection3}
                                    style={{
                                        borderRadius: "36px",
                                        border: "1px solid #006BA6",
                                      
                                    }}
                                >
                                    <p >Select</p>

                                </div>


                            </div>
                            <div className='h-[357px] w-[60%]'
                                style={{
                                    borderRadius: "36px",
                                    background: "rgba(10, 152, 234, 0.10)"
                                }}
                            >
                                <p className='flex justify-center mb-[-18px] mt-[58px]'><img src={ChampionsClub} alt='img' /></p>
                                <div className='bg-[#640066] rounded-[14px] h-[85px] flex flex-col justify-center mx-[22px]'>
                                    <p className='text-[#fff] text-base font-bold ms-5'>Champions club - Free</p>
                                    <div className='text-[#fff] text-xs font-medium flex justify-between mx-5 mt-1 gap-10'><p className='w-[50%]'>naman@experimentlabs.in</p> <Link className='text-[10px] border-b'>See more</Link></div>

                                </div>

                                <div className={`flex justify-center items-center h-[74px] mt-[34px] text-lg font-semibold ${selected4 ? 'bg-[#065AD8] text-white' : 'border-[#006BA6] bg-[#fff] text-[#676767]'} rounded-[36px] cursor-pointer`} 
                                onClick={toggleSelection4}
                                    style={{
                                        borderRadius: "36px",
                                        border: "1px solid #006BA6",
                                        
                                    }}
                                >
                                    <p >Select</p>

                                </div>


                            </div>
                         
                           

                        </div>

                    </div>



                </div>

            </div>


            <div className='flex justify-end items-center mt-[120px] mx-20 mb-10'>
               
                <Link to='/studentSignUpPricePlans'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px]">Next</Link>
            </div>



        </div >




    );
};

export default StudentSignUpSelectCourses;

