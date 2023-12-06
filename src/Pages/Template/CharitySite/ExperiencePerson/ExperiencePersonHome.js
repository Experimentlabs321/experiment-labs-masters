
import React from 'react';

import safe from "../../../../assets/CharitySite/ExperiencePerson/safe.png";
import coin from "../../../../assets/CharitySite/ExperiencePerson/coins.png";
import stock from "../../../../assets/CharitySite/ExperiencePerson/stock.png";
import naturalCharity1 from "../../../../assets/CharitySite/JoinCharity/naturalcharity1.png";
import naturalCharity2 from "../../../../assets/CharitySite/JoinCharity/naturalcharity2.png";
import naturalCharity3 from "../../../../assets/CharitySite/JoinCharity/naturalcharity3.png";
import instructorImg from "../../../../assets/CharitySite/JoinCharity/classInstructor.png";
import ExperiencePersonHero from './ExperiencePersonHero';
import YourAdvice from './YourAdvice';
import GetEarlyAccess from './GetEarlyAccess';
import Questions from './Questions';
import AdvicePosts from './AdvicePosts';




const ExperiencePersonHome = () => {

    const data = {


        advicePostsData: {
            title: "Experienced Adults",
            categories: [
                {
                    name: "Natural Charities",
                    about: [
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Craft a Compelling Story: Share your charity's mission in a captivating narrative that resonates with potential donors.",
                                "Utilize Social Media Impactfully: Leverage the power of social platforms to amplify your message and connect with a broader audience.",
                                "Host Engaging Events: Plan fundraisers and events that not only raise funds but also",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
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
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Craft a Compelling Story: Share your charity's mission in a captivating narrative that resonates with potential donors.",
                                "Utilize Social Media Impactfully: Leverage the power of social platforms to amplify your message and connect with a broader audience.",
                                "Host Engaging Events: Plan fundraisers and events that not only raise funds but also",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },

                    ]
                },
                {
                    name: "Water Charities",
                    about: [
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Craft a Compelling Story: Share your charity's mission in a captivating narrative that resonates with potential donors.",
                                "Utilize Social Media Impactfully: Leverage the power of social platforms to amplify your message and connect with a broader audience.",
                                "Host Engaging Events: Plan fundraisers and events that not only raise funds but also",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "Home Charities",
                    about: [
                        {
                            img: safe,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: coin,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Craft a Compelling Story: Share your charity's mission in a captivating narrative that resonates with potential donors.",
                                "Utilize Social Media Impactfully: Leverage the power of social platforms to amplify your message and connect with a broader audience.",
                                "Host Engaging Events: Plan fundraisers and events that not only raise funds but also",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                        {
                            img: stock,
                            type: "Nature",
                            title: "safe nature charity",
                            desc: [
                                "Define Your Cause: Clarify the purpose of your charity, whether it's hunger relief, education, or healthcare.",
                                "Engage the Community: Foster a sense of belonging by involving locals and volunteers in your charitable efforts.",
                                "Transparent Operations: Build trust through transparent communication about how donations are utilized for maximum impact",
                            ],
                            instructor: [
                                {
                                    name: "nhkil",
                                    img: instructorImg,
                                    date: "11 Jan 2023",
                                    time: "5 min read"
                                }
                            ]
                        },
                    ]
                }],
        },
        yourAdviceData: {
            title: "Share Your Advice with Us",
            subTitle: "Contribute your own advice and engage with the community."
        },
        getEarlyAccessData: {
            bgImage: naturalCharity1,
            title: "Get Early Access Today!",
            subTitle: "Be the first to experience new features and upcoming events."
        },
        questionsData : {
            Description : "Find answers to frequently asked questions about advice posts and the overall website.",
            questions : {
        
                rows: [
                    {
                        title: "Lorem ipsum dolor sit amet,",
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                          ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                          In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                          Fusce sed commodo purus, at tempus turpis.`,
                    },
                    {
                        title: "Nunc maximus, magna at ultricies elementum",
                        content:
                            "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
                    },
                    {
                        title: "Curabitur laoreet, mauris vel blandit fringilla",
                        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                        Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                        Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                        Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
                    },
                    {
                        title: "What is the package version",
                        content: "current version is 1.2.1"
                    },
                ],
            }

        }


    }
    return (
        <div className="font-roboto">
            <ExperiencePersonHero />
            <AdvicePosts advicePostsData={data?.advicePostsData} />
            <YourAdvice yourAdviceData={data?.yourAdviceData} />
            <GetEarlyAccess getEarlyAccessData={data?.getEarlyAccessData} />
            <Questions questionsData={data?.questionsData} />
        </div>
    );
};

export default ExperiencePersonHome;