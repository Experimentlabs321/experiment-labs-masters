
import orgImg1 from "../../../../assets/CharitySite/ShowCase/organisation1.png";
import orgImg2 from "../../../../assets/CharitySite/ShowCase/organisation2.png";
import orgImg3 from "../../../../assets/CharitySite/ShowCase/organisation3.png";
import charity from "../../../../assets/CharitySite/ShowCase/charity-event.png";
import ShowCaseHero from "./ShowCaseHero";
import OpportunitiesPage from "./OpportunitiesPage";
import GetintouchPage from "./GetintouchPage";
import ShowCaseFaqs from "./ShowCaseFaqs";





const ShowcaseHome = () => {

    const data = {


      
        showCaseHeroData: {
            title: "Showcase Your Charities",
            subTitle: "Share your created charities and seek advice from experienced adults."
        },
      
        ShowCaseFaqsData : {
            description : "Find answers to common questions about the sign-up process and your role as a mentor on our platform.",
            questions : {
        
                rows: [
                    {
                        title: "How do I join?",
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                          ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                          In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                          Fusce sed commodo purus, at tempus turpis.`,
                    },
                    {
                        title: "How can I create a charity?",
                        content:
                            "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
                    },
                    {
                        title: "How can I get advice?",
                        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                        Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                        Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                        Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
                    },
                    {
                        title: "How can I support others?",
                        content: "current version is 1.2.1"
                    },
                    {
                        title: "How do I contact you?",
                        content: "current version is 1.2.1"
                    },
                ],
            }

        },
        opportunitiesData : {
            title : 'Connect',
            heading : "Unlock Opportunities and Learn from Experts",
            subHeading : "Participating in our platform provides numerous benefits. Connect with experienced adults, network with like-minded individuals, learn from experts, and receive guidance to enhance your charity.",
            opportunitiesTypes: [
                {
                    img: orgImg1,
                    title: "Connect with Experienced Adults",
                    desc: "Tap into the knowledge and experience of experienced adults who can provide valuable advice and guidance for your charity",
                },
                {
                    img: orgImg2,
                    title: "Expand Your Network",
                    desc: "Connect with other students who are passionate about creating charities and build a network of like-minded individuals.",
                },
                {
                    img: orgImg3,
                    title: "Learn from Experts",
                    desc: "Gain insights and knowledge from experts in various fields who can help you improve your charity and make a greater impact.",
                },
            ]
        },
        formData: {
            title: "Submit",
            heading: "Get in Touch",
            desc: "Please fill out the form below to submit your charity project.",
            sideImg: charity,
            form: {
                name: "Name",
                mobile: "Mobile Number",
                charity: "Charity Name",
                details: "Details",
                email: "Email",
                btn1: "Help",
                btn2: "Next",
            }
        },


    }
    return (
        <div className="font-roboto mx-[20px]">
           <ShowCaseHero showCaseHeroData={data?.showCaseHeroData}/>
           <OpportunitiesPage opportunitiesData={data?.opportunitiesData}></OpportunitiesPage>
           <GetintouchPage formData={data?.formData}></GetintouchPage>
           <ShowCaseFaqs ShowCaseFaqsData={data?.ShowCaseFaqsData}/> 
        </div>
    );
};

export default ShowcaseHome;