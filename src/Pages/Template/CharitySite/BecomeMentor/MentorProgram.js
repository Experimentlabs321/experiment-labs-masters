
import { Link } from "react-router-dom";

const MentorProgram = () => {


    return (
        <div className=" mt-[70px] mx-[30px] text-[#0E286C]">
            <div className="text-[#0E286C] flex justify-between items-center ">
                <div className=" w-[40%]">
                    <h1 className="text-[48px] font-bold">Join Our Mentor Program Today</h1>

                </div>
                <div >
                    <p className="text-[#0E286C] text-xs font-normal mt-[12px] mb-5">Share your expertise and inspire students</p>
                    <div className="flex   gap-3"  >
                        <div
                            className="h-[42px] flex  items-center w-[395px] p-3"
                            style={{
                                border: "0.889px solid #000",
                                background: "var(--White, #FFF)",
                            }}>
                            <input type="email" className="w-full text-base font-normal text-[#000] focus:none " placeholder="placeholder" />

                        </div>
                        <button
                            style={{
                                border: "0.889px solid #000",
                              
                            }}
                            className="text-base font-normal px-6 py-2 text-[#fff] bg-[#0E286C]">Confirm
                        </button>

                    </div>

                    <p className="text-[#0E286C] text-xs font-normal mt-[12px]">By signing up, you agree to our Terms and Conditions.</p>



                </div>

            </div>

        </div>
    );
};

export default MentorProgram;