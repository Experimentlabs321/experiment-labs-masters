import React from 'react';

//Questions

import Faq from "react-faq-component";

const Questions = ({ questionsData }) => {
  
    const styles = {
        // bgColor: 'white',
        titleTextColor: "#0E286C",
        rowTitleColor: "#0E286C",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };
    
    const config = {
         animate: true,
        // arrowIcon: "V",
         tabFocus: true
    };

    return (
        <div className="flex gap-10 my-[110px] mx-[50px]">
           <div className="w-full text-[#0E286C]">
            <h1 className=" text-[48px] font-bold">Questions</h1>
            <p className="text-lg font-normal my-5">{questionsData?.Description}</p>
            <button
            style={{border: "1px solid #000"}}
            className="px-6 py-3 hover:bg-[#0E286C] hover:text-[#fff]"
            >
                Button
            </button>

           </div>
           <div className="w-[100%]">
           <Faq
            
                data={questionsData?.questions}
                styles={styles}
                config={config}
            />

           </div>
           
        </div>

    );
};

export default Questions;