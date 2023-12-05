

import { Link } from "react-router-dom";




const MakeDifference = ({ makeDifferenceData }) => {


    return (
        <div className=" mx-[30px] text-[#0E286C] my-[110px]">
            <p className="text-base font-semibold">Empower</p>
            <div className="flex justify-between">
                <div className="w-full">
                    <h1 className="text-[48px] font-bold">{makeDifferenceData?.title}</h1>
                    <p className="text-lg font-normal mb-8">{makeDifferenceData?.description}</p>
                    <div className="flex gap-6 mb-6">
                        {
                            makeDifferenceData?.subSection?.map((item) => (
                                <div className="w-full">
                                    <h1 className="text-xl font-bold">{item?.title}</h1>
                                    <p className="text-base font-normal text-[#000]">{item?.description}</p>
                                </div>
                            ))

                        }

                    </div>
                    <Link to=""
                        style={{
                            borderRadius: "8px",
                            background: "#0E286C",
                            boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                        }}
                        className="px-[25px] py-[10px] text-xl font-bold text-[#fff] "
                    >Share your thoughts</Link>
                </div>
                <div className="w-full flex justify-end">
                    
                    <img src={makeDifferenceData?.image} alt="image"/>
                </div>

            </div>

        </div>
    );
};

export default MakeDifference;