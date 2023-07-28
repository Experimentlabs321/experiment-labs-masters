
import required from '../../../assets/ContentManagement/required.png'



const QuizResult = () => {



    return (
        <div className="mx-10 my-20">
            <form>
                <div className='flex'>
                    <div className="w-full">

                        <div className=' '>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-semibold text-[#000000]  py-2'>Attempts From</p>

                            </div>
                            <div
                                style={{
                                    border: "1.085px solid #CECECE",
                                    background: "#F6F7FF"
                                }}
                                className=" flex  border  rounded-lg h-[40px] w-[80%] px-2 text-[#535353] mt-5 ms-5">

                                <select
                                    required
                                    className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-[#3E4DAC]  font-semibold"
                                    name="option"
                                    id="option"
                                >

                                    <option className="" value="Student">Enrolled users who have attempted the quiz</option>
                                    <option value="Parent"></option>
                                    <option value="Counselor"></option>
                                    <option value="Others"></option>
                                </select>
                            </div>
                        </div>

                        <div className='mt-16 '>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-semibold text-[#000000]  py-2'>Attempts that are</p>

                            </div>

                            <div className='w-[80%] grid grid-cols-2 gap-5 mt-5 ms-5'>
                                <p>
                                    <input type="checkbox" id="vehAttemptsThatAreicle1" name="vehAttemptsThatAreicle1" value="BIn Progressike" />
                                    <label className='ms-5' for="vehAttemptsThatAreicle1">In Progress</label>
                                </p>
                                <p>
                                <p>
                                    <input type="checkbox" id="vehAttemptsThatAreicle1" name="vehAttemptsThatAreicle1" value="Overdue" />
                                    <label className='ms-5' for="vehAttemptsThatAreicle1">Overdue</label>
                                </p>
                                </p>
                                <p>
                                <p>
                                    <input type="checkbox" id="vehAttemptsThatAreicle1" name="vevehAttemptsThatAreicle1hicle3" value="Finished" />
                                    <label className='ms-5' for="vehAttemptsThatAreicle1">Finished</label>
                                </p>
                                </p>
                                <p>
                                <p>
                                    <input type="checkbox" id="vehAttemptsThatAreicle1" name="vehAttemptsThatAreicle1" value="Never Submitted" />
                                    <label className='ms-5' for="vehivehAttemptsThatAreicle1cle1">Never Submitted</label>
                                </p>
                                </p>

                            </div>



                        </div>




                    </div>
                    <div className="w-full">
                       
                        <div className=''>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-semibold text-[#000000]  py-2'>Show Total Marks/Points Earned</p>

                            </div>

                            <div className=" flex gap-20 items-center  h-[40px] ms-5  text-[#535353] ">
                                <div>
                                    <input id="showTotalMarksOrPointsEarned" className="peer/draft me-2 " type="radio" name="showTotalMarksOrPointsEarned" />
                                    <label for="showTotalMarksOrPointsEarned" className="peer-checked/draft: font-normal">Yes</label>
                                </div>

                                <div>
                                    <input id="published" class="peer/published me-2" type="radio" name="showTotalMarksOrPointsEarned" />
                                    <label for="published" class="peer-checked/published: font-normal">NO</label>

                                </div>


                            </div>
                          
                        </div>
                       
                        <div className='mt-16'>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-semibold text-[#000000]  py-2'>Show marks/Points for each question</p>

                            </div>

                            <div className=" flex gap-20 items-center  h-[40px] ms-5  text-[#535353] ">
                                <div>
                                    <input id="drshowmarksOrPointsforeachquestionaft" className="peer/draft me-2 " type="radio" name="showmarksOrPointsforeachquestion"  />
                                    <label for="showmarksOrPointsforeachquestion" className="peer-checked/draft: font-normal">Yes</label>
                                </div>

                                <div>
                                    <input id="showmarksOrPointsforeachquestion" class="peer/published me-2" type="radio" name="showmarksOrPointsforeachquestion" />
                                    <label for="showmarksOrPointsforeachquestion" class="peer-checked/published: font-normal">NO</label>

                                </div>


                            </div>
                          
                        </div>
                       
                        <div className='mt-16'>
                            <div className='flex items-center gap-4'>
                                <p className='h-2 w-2 bg-black rounded-full'></p>
                                <p className='font-semibold text-[#000000]  py-2'>Show Rank Earned</p>

                            </div>

                            <div className=" flex gap-20 items-center  h-[40px] ms-5  text-[#535353] ">
                                <div>
                                    <input id="showRankEarned" className="peer/draft me-2 " type="radio" name="showRankEarned"  />
                                    <label for="showRankEarned" className="peer-checked/draft: font-normal">Yes</label>
                                </div>

                                <div>
                                    <input id="showRankEarned" class="peer/published me-2" type="radio" name="showRankEarned" />
                                    <label for="showRankEarned" class="peer-checked/published: font-normal">NO</label>

                                </div>


                            </div>
                          
                        </div>




                    </div>




                </div>


                <div className='flex items-center justify-center mt-20 mb-10'>
                    <input type="submit" value='Save' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                    <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                </div>
            </form>

        </div >
    )
};


export default QuizResult;