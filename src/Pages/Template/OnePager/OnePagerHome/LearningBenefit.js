import React from "react";

const LearningBenefit = ({ learnerBenefitData }) => {
    return (
        <div className="bg-[#F9FAFF] py-10">
            <div className="mt-[66px] w-11/12 mx-auto font-inter">
                <h1
                    className="text-black font-inter font-bold sm:text-[20px] md:text-[32px] pb-3 w-full lg:w-[583px]"
                    style={{ borderBottom: "2px solid #4555BA" }}
                >
                    {learnerBenefitData.learnerBenefitHeading}
                </h1>
                <div>
                    {
                        learnerBenefitData.benefitDetails?.map((benefitDetail) => {
                            return (
                                <div className="grid justify-items-center gap-10 md:gap-0 md:flex md:justify-between my-[33px]">
                                    <div className="flex gap-10">
                                    <img alt="benefit" src={benefitDetail.icon}></img>
                                    <div>
                                        {
                                            benefitDetail.description?.map((description) => {
                                                return (
                                                    <div className="flex my-[20px] gap-3">
                                                        <img alt="benefit" src={learnerBenefitData.learnerBenefitEllipse}></img>
                                                        <p className="text-center text-[#3E3E3E] font-bold text-[13px] md:text-[20px]">
                                                            {description}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    </div>
                                    <div className="flex gap-10">
                                        {
                                            benefitDetail.benefitSystem?.map((benefitSystem) => {
                                                return (
                                                    <div className="grid justify-items-center w-[133px] h-[100px] md:w-[188px] md:h-[107px]" style={{ borderRadius: "7px", background: "#FFF", boxShadow: "0px 4px 20px 0px #D0D6FF", padding: "3px" }}>
                                                        <img alt="benefit" src={benefitSystem.sysicon}></img>
                                                        <div>
                                                            <p className="text-center text-[#3E3E3E] font-bold text-[11.407px] md:text-[16px]">
                                                                {benefitSystem.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default LearningBenefit;
/*
                <div>
                    {
                        learnerBenefitData.benefitDetails?.map((benefitDetail) => {
                            return (
                                <div className="flex items-center my-[33px] gap-8">
                                    <img alt="benefit" src={benefitDetail.icon}></img>
                                    <div>
                                        {
                                            benefitDetail.description?.map((description) => {
                                                return (
                                                    <div className="flex my-[20px] gap-3">
                                                        <img alt="benefit" src={learnerBenefitData.learnerBenefitEllipse}></img>
                                                        <p className="text-center text-[#3E3E3E] font-bold md:text-[20px]">
                                                            {description}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="grid grid-cols-2 gap-12">
                    {
                        learnerBenefitData.benefitSystem?.map((benefitSystem) => {
                            return (
                                <div className="grid items-center justify-items-center" style={{borderRadius: "7px",background: "#FFF",boxShadow: "0px 4px 20px 0px #D0D6FF",padding: "6px 23px"}}>
                                    <img alt="benefit" src={benefitSystem.sysicon}></img>
                                    <div>
                                        <p className="text-center text-[#3E3E3E] font-bold md:text-[20px]">
                                            {benefitSystem.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
*/