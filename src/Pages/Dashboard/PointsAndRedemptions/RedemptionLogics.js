//PointsRedemptions.js

import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
/* import Category1 from './Category1'; */

import updateimg from '../../../assets/PointsRedemptions/Upload.svg';
import editimg from '../../../assets/PointsRedemptions/edit.svg';
import deleteimg from '../../../assets/PointsRedemptions/delete.svg';
import Filterimg from '../../../assets/PointsRedemptions/Filter.svg';
import undo from '../../../assets/PointsRedemptions/Sync-retry.svg';
import RedemptionCategory from './RedemptionCategory';



const RedemptionLogics = () => {

    const [category, setCategory] = useState(null);
    const [buttonCount, setButtonCount] = useState(1);
    /* const [buttonnum, setbuttonnum] = useState(0); */


    const handleClickCategory = (selectedCategory) => {
        setCategory(selectedCategory === category ? null : selectedCategory);


    };



    const handleClick = () => {
        const buttonnum = localStorage.getItem('redemptionbuttonnum') || 0;

        const newButtonCount = parseInt(buttonnum) + 1;

        /* setbuttonnum(newButtonCount); */
        localStorage.setItem('redemptionbuttonnum', newButtonCount);
        const newCategory = `Category${newButtonCount}`;

        // Check if the category already exists
        const storedCategories = JSON.parse(localStorage.getItem('redemptioncategories')) || [];
        const categoryExists = storedCategories.includes(newCategory);


        if (categoryExists) {
            // Category already exists, handle accordingly (e.g., show an error message)
            console.log('Category already exists');
            return;
        }

        setButtonCount(newButtonCount);

        // Update local storage
        storedCategories.push(newCategory);
        localStorage.setItem('redemptioncategories', JSON.stringify(storedCategories));

        setCategory(newCategory);
    };




    useEffect(() => {
        const storedButtonCount = localStorage.getItem('redemptionbuttonnum');
        if (storedButtonCount) {
            setButtonCount(parseInt(storedButtonCount, 10));
        }

        const storedCategories = localStorage.getItem('redemptioncategories');


        if (storedCategories) {
            const parsedCategories = JSON.parse(storedCategories);
            if (parsedCategories.length > 0) {
                setCategory(parsedCategories[0]);
            }
        }
    }, []);

    const allcategorie = localStorage.getItem('redemptioncategories')
    const allcategories = JSON.parse(allcategorie);





    return (
        <div>
            <Layout>
                <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10 '>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Redemption Logics</div>
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
                <div className='flex justify-end mx-[75px] my-9'>
                    <img src={undo} ></img>

                </div>
                <div className='flex justify-between mx-[75px]'>

                    <div className='flex justify-between items-center '>
                        <input className='me-2 text-[#737373] h-[20px] w-[20px]' type="checkbox" id="" name="" value="" />
                        <p className='font-semibold text-[#000000]'>Select All</p>
                    </div>

                    <div className='flex items-center '>
                        <p className='font-semibold  text-[#000000] px-4 py-2'>Select Category</p>
                        <div className=" flex gap-2  border  rounded-lg h-[40px] w-[300px] px-2 ms-5 text-[#535353] ">

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
                    <div className='flex gap-5 items-center '>
                        <p className='font-semibold text-[#000000]'>Upload</p>
                        <img className='h-[70px] w-[70px]' src={updateimg}></img>
                        <p className='font-semibold text-[#000000] me-3'>Edit</p>
                        <img className='h-[35px] w-[35px] bg-[#404040] rounded-full p-1' src={editimg}></img>
                        <p className='font-semibold text-[#000000] me-3'>Delete</p>
                        <img className='h-[35px] w-[35px] bg-[#E70000] rounded-full p-1 ' src={deleteimg}></img>
                    </div>
                </div>
                <div className='lg:flex justify-center items-center mt-5 '>

                    <div className='flex-1 justify-center  lg:flex gap-4 px-10 items-center'>

                            <button

                                className={`px-6 py-3 text-base  font-semibold ${category === 'Category'
                                    ? 'text-[#0A98EA] border-t-2 border-t-[#0A98EA]'
                                    : 'text-[#949494]'
                                    }`}
                                onClick={() => handleClickCategory('Category')}
                            >
                                Category
                            </button>

                            {allcategories?.map(a => <>
                                <button
                                    /* key={index} */
                                    className={`px-6 py-3 text-base  font-semibold ${category === a
                                        ? 'text-[#0A98EA] border-b-2 border-b-[#0A98EA]'
                                        : 'text-[#949494]'
                                        }`}
                                    onClick={() => handleClickCategory(a)}
                                >
                                    {a}
                                </button>
                            </>)
                            }
                        

                        <button onClick={handleClick} className='w-6 h-6 flex justify-center items-center bg-[#D9D9D9] text-[#737373] text-4xl rounded-full'> +</button>

                    </div>

                   {/*  <div>

                        <button onClick={handleClick} className='w-6 h-6 flex justify-center items-center bg-[#D9D9D9] text-[#737373] text-4xl rounded-full'> +</button>
                    </div> */}

                    <div className='px-32'>
                        <img src={Filterimg}></img>
                    </div>

                </div>


                <div>
                    <RedemptionCategory />
                    {/* 
                {
                    category && <>
                        <RedemptionCategory/>
                        
                    </>
                } */}
                </div>


            </Layout>
        </div>
    );
};

export default RedemptionLogics;