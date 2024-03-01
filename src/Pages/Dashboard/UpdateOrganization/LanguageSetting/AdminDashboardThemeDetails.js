//AdminDashboardThemeDetails



import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';


const AdminDashboardThemeDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/dashboardTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {

          console.log(response)
          setItemDetails(response?.data);

        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  console.log(itemDetails)
  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/dashboardTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    const form = event.target;

    const removeSection = form.removeSection?.value;
    const complete = form.complete?.value;
    const changeText = form.changeText?.value;
    const changeColor = form.changeColor?.value;
    const design = form.design?.value;
    const add = form.add?.value;
    const remove = form.remove?.value;
    const imageType = form.imageType?.value;
    const defaultName = form.default?.value;
    const avatar = form.avatar?.value;
    const buttonText = form.buttonText?.value;
    const changeButton = form.changeButton?.value;
    const changeCard = form.changeCard?.value;
    const changeImage = form.changeImage?.value;
    const addSection = form.addSection?.value;
    const headerText = form.headerText?.value;
    const changeProgress = form.changeProgress?.value;
    const changeImageBg = form.changeImageBg?.value;
    const myCourses = form.myCourses?.value;
    const allCourses = form.allCourses?.value;
    const addLabJourneySection = form.addLabJourneySection?.value;
    const removeLabJourneySection = form.removeLabJourneySection?.value;
    const addSchedule = form.addSchedule?.value;
    const removeSchedule = form.removeSchedule?.value;
    const save = form.save?.value;

    const itemDetail = {

      removeSection: removeSection,
      complete: complete,
      changeText: changeText,
      changeColor: changeColor,
      design: design,
      add: add,
      remove: remove,
      imageType: imageType,
      default: defaultName,
      avatar: avatar,
      buttonText: buttonText,
      changeButton: changeButton,
      changeCard: changeCard,
      changeImage: changeImage,
      addSection: addSection,
      headerText: headerText,
      changeProgress: changeProgress,
      changeImageBg: changeImageBg,
      myCourses: myCourses,
      allCourses: allCourses,
      addLabJourneySection: addLabJourneySection,
      removeLabJourneySection: removeLabJourneySection,
      addSchedule: addSchedule,
      removeSchedule: removeSchedule,
      save: save,

    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addUpdateOrganizationSubDetails/dashboardTheme/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    console.log(item)
    if (item?.data === "Update Organization SubDetails updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Names added Successfully");
      form.reset();
    }


  };

  return (
    <div>
    {
      adminLoading ?
        <div className='flex justify-center'>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
        :
        <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl'>
        <div className=' grid grid-cols-2 gap-4'>
  
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Remove Section</p>
            <input name='removeSection' defaultValue={itemDetails?.removeSection} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>complete</p>
            <input name='complete' defaultValue={itemDetails?.complete} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Text</p>
            <input name='changeText' defaultValue={itemDetails?.changeText} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Color</p>
            <input name='changeColor' defaultValue={itemDetails?.changeColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Design</p>
            <input name='design' defaultValue={itemDetails?.design} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Add</p>
            <input name='add' defaultValue={itemDetails?.add} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Remove</p>
            <input name='remove' defaultValue={itemDetails?.remove} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Image Type</p>
            <input name='imageType' defaultValue={itemDetails?.imageType} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Default</p>
            <input name='default' defaultValue={itemDetails?.default} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Avatar</p>
            <input name='avatar' defaultValue={itemDetails?.avatar} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
  
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Button Text</p>
            <input name='buttonText' defaultValue={itemDetails?.buttonText} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Button</p>
            <input name='changeButton' defaultValue={itemDetails?.changeButton} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Card</p>
            <input name='changeCard' defaultValue={itemDetails?.changeCard} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Image</p>
            <input name='changeImage' defaultValue={itemDetails?.changeImage} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Add Section</p>
            <input name='addSection' defaultValue={itemDetails?.addSection} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
  
  
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Header Text</p>
            <input name='headerText' defaultValue={itemDetails?.headerText} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
       
  
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change Progress</p>
            <input name='changeProgress' defaultValue={itemDetails?.changeProgress} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Change ImageBg</p>
            <input name='changeImageBg' defaultValue={itemDetails?.changeImageBg} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>My Courses</p>
            <input name='myCourses' defaultValue={itemDetails?.myCourses} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>All Courses</p>
            <input name='allCourses' defaultValue={itemDetails?.allCourses} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Add Lab Journey Section</p>
            <input name='addLabJourneySection' defaultValue={itemDetails?.addLabJourneySection} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Remove Lab Journey Section</p>
            <input name='removeLabJourneySection' defaultValue={itemDetails?.removeLabJourneySection} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Add Schedule</p>
            <input name='addSchedule' defaultValue={itemDetails?.addSchedule} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Remove Schedule</p>
            <input name='removeSchedule' defaultValue={itemDetails?.removeSchedule} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
          <div className='flex justify-between items-center w-[100%]'>
            <p className='text-lg font-medium'>Save</p>
            <input name='save' defaultValue={itemDetails?.save} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
          </div>
  
  
        </div>
        <div className="flex items-center justify-center mt-20 mb-10">
          <input
            type="submit"
            value="Save"
  
            className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
          />
  
        </div>
      </form>
    }
  </div>
   

  );
};

export default AdminDashboardThemeDetails;