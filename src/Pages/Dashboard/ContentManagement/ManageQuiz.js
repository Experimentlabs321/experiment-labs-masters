
import Layout from '../Layout';
import required from '../../../assets/ContentManagement/required.png'
import youtube from '../../../assets/ContentManagement/youtube.svg'
import Audioimg from '../../../assets/ContentManagement/audio.png'
import { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import QuizGeneralInformation from './QuizGeneralInformation';
import QuizResult from './QuizResult';
import QuizEvaluationParameter from './QuizEvaluationParameter';



const ManageQuiz = () => {
    const [selectedTab, setSelectedTab] = useState('Quiz General Information');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };



    return (
        <div>
            <Layout>
                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Quiz in Topic 1</p>

                </div>
                <div className='px-10 flex  justify-between pb-3 text-lg'>
                    <button
                        onClick={() => handleTabClick('Quiz General Information')}
                        style={{
                            fontWeight: selectedTab === 'Quiz General Information' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Quiz General Information' ? '2px solid black' : 'none'
                        }}
                    >
                        Quiz General Information
                    </button>
                    <button
                        onClick={() => handleTabClick('Questions')}
                        style={{
                            fontWeight: selectedTab === 'Questions' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Questions' ? '2px solid black' : 'none'
                        }}
                    >
                        Questions
                    </button>
                    <button
                        onClick={() => handleTabClick('Question Bank')}
                        style={{
                            fontWeight: selectedTab === 'Question Bank' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Question Bank' ? '2px solid black' : 'none'
                        }}
                    >
                        Question Bank
                    </button>
                    <button
                        onClick={() => handleTabClick('Results')}
                        style={{
                            fontWeight: selectedTab === 'Results' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Results' ? '2px solid black' : 'none'
                        }}
                    >
                        Results
                    </button>
                    <button
                        onClick={() => handleTabClick('Evaluation Parameter')}
                        style={{
                            fontWeight: selectedTab === 'Evaluation Parameter' ? 'bold' : 'normal',
                            borderBottom: selectedTab === 'Evaluation Parameter' ? '2px solid black' : 'none'
                        }}
                    >
                        Evaluation Parameter
                    </button>
                </div>


                {
                    selectedTab === 'Quiz General Information' &&(
                        <QuizGeneralInformation/>
                    )
                }
                {
                    selectedTab === 'Results' &&(
                        <QuizResult/>
                    )
                }
                {
                    selectedTab === 'Evaluation Parameter' &&(
                        <QuizEvaluationParameter/>
                    )
                }




            </Layout>
        </div >
    )
};


export default ManageQuiz;