import React from 'react';

const CreateCharityPage = ({ createCharityData }) => {
    // Adjust this value for image opacity

    return (
        <div className="mt-[24px] w-11/12 mx-auto font-roboto flex gap-12">
            <div style={{ width: '100%' }}>
                <div style={{
                    backgroundImage: `url("${createCharityData.bgImg}")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <h1 className="font-bold text-[40px] border-b-4 border-[#FFC062] py-[4px] w-[258px] ">{createCharityData?.title}</h1>
                    <p className="text-[#0E286C] font-bold text-[32px] w-[596px] pt-[14px]">{createCharityData?.heading}</p>
                    <p className="w-[553px] pt-[14px]">{createCharityData.firstDesc}</p>
                    <p className="w-[553px] pt-[307px] mb-[33px]">{createCharityData.secondDesc}</p>
                </div>
            </div>
            <div className="border shadow-md shadow-[#FFE4BB] border-[#FFE4BB] w-full">
                <form className="px-[20.25px]">
                    <label htmlFor="name" className="block text-[20px] font-bold mb-2 pt-[27px]">{createCharityData?.form?.name}</label>
                    <input type="text" id="name" name="name" className="w-full border-2 p-2 mb-2" placeholder="Write your name" />
                    <label htmlFor="charityName" className="block text-[20px] font-bold mb-2">{createCharityData?.form?.charity}</label>
                    <input type="text" id="charityName" name="charityName" className="w-full border-2 p-2 mb-2" placeholder="Write your charity name" />
                    <label htmlFor="mobileNumber" className="block text-[20px] font-bold mb-2">{createCharityData?.form?.mobile}</label>
                    <input type="text" id="mobileNumber" name="mobileNumber" className="w-full border-2 p-2 mb-2" placeholder="Write your mobile number"/>
                    <label htmlFor="details" className="block text-[20px] font-bold mb-2">{createCharityData?.form?.details}</label>
                    <textarea id="details" name="details" className="w-full border-2 p-2 mb-2" placeholder="Write your charity details" maxLength={200}></textarea>
                    <p className="text-end">Words Limit 200</p>
                    <label htmlFor="email" className="block text-[20px] font-bold mb-2">{createCharityData?.form?.email}</label>
                    <input type="email" id="email" name="email" className="w-full border-2 p-2 mb-2" placeholder="Write your email"/>
                    <div className="flex justify-between text-[20px] font-normal mb-[27px] mt-[23px]">
                        <button className="shadow-lg shadow-slate-50 py-[10px] px-[25px] rounded">{createCharityData?.form?.btn1}</button>
                        <button type="submit" className="bg-[#0E286C] text-white py-[10px] px-[25px] rounded">{createCharityData?.form?.btn2}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCharityPage;
