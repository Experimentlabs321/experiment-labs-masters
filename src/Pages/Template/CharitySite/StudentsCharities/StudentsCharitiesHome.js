
import React from 'react';

import Volunteer from "../../../../assets/CharitySite/StudentsCharities/Volunteer.png";
import Estoy from "../../../../assets/CharitySite/StudentsCharities/Estoy.png";
import safe from "../../../../assets/CharitySite/StudentsCharities/safe.png";
import naturalCharity1 from "../../../../assets/CharitySite/JoinCharity/naturalcharity1.png";
import naturalCharity2 from "../../../../assets/CharitySite/JoinCharity/naturalcharity2.png";
import naturalCharity3 from "../../../../assets/CharitySite/JoinCharity/naturalcharity3.png";
import instructorImg from "../../../../assets/CharitySite/JoinCharity/classInstructor.png";
import StudentsCharitiesHero from './StudentsCharitiesHero';
import TopExperienced from './TopExperienced';
import JoinOurThriving from './JoinOurThriving';
import ExperiencedAdults from './ExperiencedAdults';



const StudentsCharitiesHome = () => {

    const data = {
        studentsCharitiesHeroData: {
            title: "Connecting Students, Charities",
            smallTitle: "Empowering",
            description: "Our mission is to provide a platform where students can share and seek advice regarding their created charities. We aim to connect experienced adults who can create videos and provide guidance to students, helping them make a positive impact in their communities."
        },
        joinOurThrivingData: {
            title: "Join our thriving community today!",

            description: "Discover and share advice with fellow students and experienced mentors on creating impactful charities."
        },


        topExperiencedData: {
            heading: "Top Experienced Adults",

            expertAdviceTypes: [
                {
                    img: Volunteer,
                    title: "Volunteer provide food charity",
                    desc: "Based on our experience in successfully managing charitable initiatives, we provide daily meals through our donations.",
                    type: "Food",
                    creator: "Created by max",
                    member: "200 members",
                },
                {
                    img: Estoy,
                    title: "Estoy para service cloth charity",
                    desc: "We provide clothes every day and have 200 volunteers who have been serving for the past 10 years.Show more.",
                    type: "Cloth",
                    creator: "Created by kaven",
                    member: "20 members",
                },


            ]
        },

       
        experiencedAdultsData: {
            title: "Experienced Adults",
            categories: [
                {
                    name: "Natural Charities",
                    about: [
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },

                    ]
                },
                {
                    name: "Animal Charities",
                    // about: [
                    //     {
                    //         img: naturalCharity1,
                    //         title: "How to Start a Charity",
                    //         desc: "Learn the steps to start your own charity and make a difference.",
                    //         instructor: [
                    //             {
                    //                 name: "John Doe",
                    //                 img: instructorImg,
                    //                 date: "10 Jan 2022"
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         img: naturalCharity2,
                    //         title: "Fundraising Strategies for Charities",
                    //         desc: "Discover effective fundraising strategies for your charity organization.",
                    //         instructor: [
                    //             {
                    //                 name: "Jane Smith",
                    //                 img: instructorImg,
                    //                 date: "11 Jan 2022"
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         img: naturalCharity3,
                    //         title: "Marketing Tips for Charities",
                    //         desc: "Learn effective marketing strategies to promote your charity.",
                    //         instructor: [
                    //             {
                    //                 name: "Sarah Johnson",
                    //                 img: instructorImg,
                    //                 date: "10 Jan 2022"
                    //             }
                    //         ]
                    //     },
                    // ]
                },
                {
                    name: "Food Charities",
                    about: [
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: "We have been providing our services for around 10 years with 300 volunteers serving.",
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    members: "1000"
                                }
                            ]
                        },

                    ]
                },
                {
                    name: "Water Charities",
                    about: [
                        {
                            img: naturalCharity1,
                            title: "How to Start a Charity",
                            desc: "Learn the steps to start your own charity and make a difference.",
                            instructor: [
                                {
                                    name: "John Doe",
                                    img: instructorImg,
                                    date: "10 Jan 2022"
                                }
                            ]
                        },
                        {
                            img: naturalCharity2,
                            title: "Fundraising Strategies for Charities",
                            desc: "Discover effective fundraising strategies for your charity organization.",
                            instructor: [
                                {
                                    name: "Jane Smith",
                                    img: instructorImg,
                                    date: "11 Jan 2022"
                                }
                            ]
                        },
                        {
                            img: naturalCharity3,
                            title: "Marketing Tips for Charities",
                            desc: "Learn effective marketing strategies to promote your charity.",
                            instructor: [
                                {
                                    name: "Sarah Johnson",
                                    img: instructorImg,
                                    date: "10 Jan 2022"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "Home Charities",
                    about: [
                        {
                            img: naturalCharity1,
                            title: "How to Start a Charity",
                            desc: "Learn the steps to start your own charity and make a difference.",
                            instructor: [
                                {
                                    name: "John Doe",
                                    img: instructorImg,
                                    date: "10 Jan 2022"
                                }
                            ]
                        },
                        {
                            img: naturalCharity2,
                            title: "Fundraising Strategies for Charities",
                            desc: "Discover effective fundraising strategies for your charity organization.",
                            instructor: [
                                {
                                    name: "Jane Smith",
                                    img: instructorImg,
                                    date: "11 Jan 2022"
                                }
                            ]
                        },
                        {
                            img: naturalCharity3,
                            title: "Marketing Tips for Charities",
                            desc: "Learn effective marketing strategies to promote your charity.",
                            instructor: [
                                {
                                    name: "Sarah Johnson",
                                    img: instructorImg,
                                    date: "10 Jan 2022"
                                }
                            ]
                        },
                    ]
                }],
        }


    }
    return (
        <div className="font-roboto">
            <StudentsCharitiesHero studentsCharitiesHeroData={data?.studentsCharitiesHeroData} />
            <TopExperienced topExperiencedData={data?.topExperiencedData} />
            <ExperiencedAdults experiencedAdults={data?.experiencedAdultsData} />
            <JoinOurThriving joinOurThrivingData={data?.joinOurThrivingData} />
          
        </div>
    );
};

export default StudentsCharitiesHome;