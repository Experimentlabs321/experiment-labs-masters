

import Faq from "react-faq-component";
import { Link } from "react-router-dom";

const ShowCaseFaqs = ({ ShowCaseFaqsData }) => {

    const styles = {
        // bgColor: 'white',
        titleTextColor: "#0E286C",
        rowTitleColor: "#0E286C",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };

    const config = {
        animate: true,
        //arrowIcon: "+",
        tabFocus: true
    };

    return (
        <div className="flex text-[#0E286C] justify-center gap-10 my-[110px] mx-[50px]">

            <div className="w-[50%]">
                <h1 className="text-center text-[48px] font-bold">FAQs</h1>
                <p className="text-center text-lg font-normal mt-5 mb-20">{ShowCaseFaqsData?.description}</p>
                <Faq

                    data={ShowCaseFaqsData?.questions}
                    styles={styles}
                    config={config}
                />

                <h1 className="text-center text-[32px] font-bold mt-20">Still have questions?</h1>
                <p className="text-center text-lg font-normal mt-3 mb-6">Contact us today!</p>
                <p className="text-center">
                    <Link to=""
                        style={{
                            border: "0.889px solid #000",

                        }}
                        className="text-base font-normal px-6 py-2  hover:text-[#fff] hover:bg-[#0E286C]">Confirm
                    </Link>

                </p>


            </div>

        </div>

    );
};

export default ShowCaseFaqs;