const OpportunitiesPage = ({ opportunitiesData }) => {
    return (
        <div className="font-roboto bg-[#F1F5FF] shadow-md w-full mt-[77px] text-[#0E286C]">
            <div className="mx-[30px]">
                <p className="font-semibold pt-7">{opportunitiesData?.title}</p>
                <h1 className="text-[48px] font-bold w-[768px]">{opportunitiesData?.heading}</h1>
                <p className="text-lg font-normal mt-[24px] w-[768px]">{opportunitiesData.subHeading}</p>
                <div className="pt-[44px] flex gap-[27px] ">
                    {
                        opportunitiesData?.opportunitiesTypes?.map((item, index) => {
                            return (
                                <div
                                    
                                    key={index} className=" h-[420px] w-full items-center gap-[40px] ">
                                    <img className="w-full" src={item.img} alt="" />
                                    <div>
                                        <h1 className="font-bold text-[27px] text-[#0E286C] pt-[13px]">{item.title}</h1>
                                        <p className="text-[13px] pt-[15px] pb-[5px]">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default OpportunitiesPage;