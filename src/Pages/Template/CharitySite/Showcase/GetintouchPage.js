const GetintouchPage = ({ formData }) => {
    // Adjust this value for image opacity

    return (
        <div className="mt-[37px] mx-[30px] font-roboto flex gap-4">
            <div className="w-3/5">
                <img src={formData?.sideImg} alt="" />
            </div>
            <div className="w-1/2">

                <form className="px-[20.25px]">
                    <p className="font-semibold pt-7 text-[#0E286C]">{formData?.title}</p>
                    <h1 className="text-[48px] font-bold w-[768px] text-[#0E286C]">{formData?.heading}</h1>
                    <p className="text-lg font-normal mt-[24px] w-[768px] text-[#0E286C]">{formData?.desc}</p>
                    <label htmlFor="name" className="block text-[20px] font-bold mb-2 pt-[27px]">{formData?.form?.name}</label>
                    <input type="text" id="name" name="name" className="w-full border-2 p-2 mb-2" placeholder="Write your name" />
                    <label htmlFor="charityName" className="block text-[20px] font-bold mb-2">{formData?.form?.charity}</label>
                    <input type="text" id="charityName" name="charityName" className="w-full border-2 p-2 mb-2" placeholder="Write your charity name" />
                    <label htmlFor="mobileNumber" className="block text-[20px] font-bold mb-2">{formData?.form?.mobile}</label>
                    <input type="text" id="mobileNumber" name="mobileNumber" className="w-full border-2 p-2 mb-2" placeholder="Write your mobile number" />
                    <label htmlFor="details" className="block text-[20px] font-bold mb-2">{formData?.form?.details}</label>
                    <textarea id="details" name="details" className="w-full border-2 p-2 mb-4" placeholder="Write your charity details" maxLength={200}></textarea>
                    <p className="text-end">Words Limit 200</p>
                    <label htmlFor="email" className="block text-[20px] font-bold mb-2">{formData?.form?.email}</label>
                    <input type="email" id="email" name="email" className="w-full border-2 p-2 mb-2" placeholder="Write your email" />
                    <div className="flex justify-between text-[20px] font-normal mb-[27px] mt-[23px]">
                        <button className="shadow-lg shadow-slate-50 py-[10px] px-[25px] rounded">{formData?.form?.btn1}</button>
                        <button type="submit" className="bg-[#0E286C] text-white py-[10px] px-[25px] rounded">{formData?.form?.btn2}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GetintouchPage;
