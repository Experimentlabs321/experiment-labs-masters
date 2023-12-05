import React from 'react';



import makeDiff from "../../../../assets/CharitySite/BecomeMentor/makeDiff.png"
import BecomeMentorHero from './BecomeMentorHero';
import MakeDifference from './MakeDifference';
import MentorProgram from './MentorProgram';
import Faqs from './Faqs';



const BecomeMentorHome = () => {

    const data = {


      
        becomeMentorHeroData: {
            title: "Become a Mentor",
            subTitle: "Join our community of experienced adults and make a difference in students' charity projects."
        },
        makeDifferenceData: {
            image: makeDiff,
            title: "Become a Mentor and Make a Difference",
            description: "Share your knowledge, support students, and make a meaningful impact in their charitable endeavors by becoming a mentor.",
            subSection : [
                {
                    title :"Share",
                    description: "Share your expertise and guide students in their charity projects."
                },
                {
                    title :"Support",
                    description: "Support students as they navigate the challenges of creating and managing charities."
                }
            ]

        },
        faqsData : {
            description : "Find answers to common questions about the sign-up process and your role as a mentor on our platform.",
            questions : {
        
                rows: [
                    {
                        title: "How do I sign up?",
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                          ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                          In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                          Fusce sed commodo purus, at tempus turpis.`,
                    },
                    {
                        title: "What is my role as a mentor?",
                        content:
                            "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
                    },
                    {
                        title: "How often should I interact with students?",
                        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                        Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                        Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                        Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
                    },
                    {
                        title: "Can I mentor multiple students?",
                        content: "current version is 1.2.1"
                    },
                    {
                        title: "What if I have more questions?",
                        content: "current version is 1.2.1"
                    },
                ],
            }

        }


    }
    return (
        <div className="font-roboto mx-[20px]">
           <BecomeMentorHero becomeMentorHeroData={data?.becomeMentorHeroData}/> 
           <MakeDifference makeDifferenceData={data.makeDifferenceData}/>
           <MentorProgram />
           <Faqs faqsData={data?.faqsData}/>
                    
        </div>
    );
};

export default BecomeMentorHome;