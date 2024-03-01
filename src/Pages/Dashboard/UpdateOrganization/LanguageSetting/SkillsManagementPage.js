//SkillsManagementPage

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SkillsCreationsDetails from './SkillsCreationsDetails';
import SkillsImprovementEngineDetails from './SkillsImprovementEngineDetails';




const SkillsManagementPage = () => {
  
    const [adminSkillsCreationsOpen, setAdminSkillsCreationsOpen] = useState(false);
    const [adminSkillsImprovementEngineOpen, setAdminSkillsImprovementEngineOpen] = useState(false);



    return (
        <div className=''>


            {/*Skills Creations */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminSkillsCreationsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Skills Creations                    
                        </p>
                      
                    </div>
                    {
                        (adminSkillsCreationsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminSkillsCreationsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminSkillsCreationsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminSkillsCreationsOpen) && (
                        <SkillsCreationsDetails />
                    )
                }

            </div>
            {/*Skills Improvement Engine */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminSkillsImprovementEngineOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Skills Improvement Engine                   
                        </p>
                      
                    </div>
                    {
                        (adminSkillsImprovementEngineOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminSkillsImprovementEngineOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminSkillsImprovementEngineOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminSkillsImprovementEngineOpen) && (
                        <SkillsImprovementEngineDetails />
                    )
                }

            </div>



        </div>
    );
};

export default SkillsManagementPage;