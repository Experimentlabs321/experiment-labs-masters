import React, { useEffect, useState } from 'react';
import './style.css'

const Feature = () => {


    const [courses, setCourses] = useState([
        // Science/Innovation
        // Commerce/Entrepreneurship
        // Humanities/Arts
        // Delete the option   
        {
            category: 'All',
            details: [
                {
                    category: 'Science/Innovation',
                    title: 'Leadership and career planning through innovation',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 12+ careers based on 40+ Skills',
                        'Build your own innovative products and learn about different innovation based careers',
                        'Industry projects from Zomato, Swiggy, Nykaa and many more'
                    ]
                },
                {
                    category: 'Leadership and career planning through Business',
                    title: 'Commerce/Entrepreneurship',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 20+ careers based on 40+ Skills',
                        'Build your own ventures and learn about different business based careers and path to leadership',
                        'Build Strong portfolios, chart out the best indian and international institutions and how to get admissions'
                    ]
                },
                {
                    category: 'Humanities/Arts',
                    title: 'Leadership and career planning through Creativity',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 15+ careers based on 40+ Skills',
                        'Learn about different career options by experiential learning'
                    ]
                }

            ]
        },
        {
            category: 'Science/Innovation',
            details: [
                {
                    category: 'Science/Innovation',
                    title: 'Leadership and career planning through innovation',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 12+ careers based on 40+ Skills',
                        'Build your own innovative products and learn about different innovation based careers',
                        'Industry projects from Zomato, Swiggy, Nykaa and many more'
                    ]
                }
            ]
        },
        {
            category: 'Commerce/Entrepreneurship',
            details: [
                {
                    category: 'Leadership and career planning through Business',
                    title: 'Commerce/Entrepreneurship',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 20+ careers based on 40+ Skills',
                        'Build your own ventures and learn about different business based careers and path to leadership',
                        'Build Strong portfolios, chart out the best indian and international institutions and how to get admissions'
                    ]
                }
            ]
        },
        {
            category: 'Humanities/Arts',
            details: [
                {
                    category: 'Humanities/Arts',
                    title: 'Leadership and career planning through Creativity',
                    data: [
                        '12 Weeks',
                        'Hybrid',
                        '130+ Hours',
                        'Entrance Based Selection: Olympiad'
                    ],
                    info: [
                        'Experience 15+ careers based on 40+ Skills',
                        'Learn about different career options by experiential learning'
                    ]
                }
            ]
        }

    ]);

    const [selectedIndex, setSelectedIndex] = useState(1);


    return (
        <div className='px-10 md:px-40 mt-48'>
            <div>
                <h1 className='text-4xl font-serif'>Envision. Experiment. Educate. Enable.</h1>
                <h1 className='text-4xl font-serif font-extrabold mt-2'><span className='bg-gradient-to-t from-green to-50% to-transparent'>Hands-on</span> & <span className='bg-gradient-to-t from-green to-50% to-transparent'>Placement</span> Driven Programmes</h1>
                <div className='parent-container'>
                    {
                        courses.map((course, index) => (
                            <div onClick={() => setSelectedIndex(index)} className={`courses ${selectedIndex === index && 'bg-green'}`} key={index}>
                                {course?.category}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8'>
                {
                    courses[selectedIndex]?.details?.map((course, index) =>
                        <div style={{border: "2px solid gray"}} key={index} className='border-2 rounded-md'>
                            <div style={{borderBottom: "2px solid gray"}} className='w-full p-5'>
                                <h1>{course.category}</h1>
                                <h4>{course.title}</h4>
                            </div>
                            <div className='w-full p-5'>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Feature;