//AdminCreateCertificateDetails

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const AdminCreateCertificateDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/createCertificate/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/createCertificate/organizationsId/${userInfo?.organizationId}`
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

    const newCertificateCredentialsFormName = form.certificateCredentialsForm?.value;
    const newAddName = form.add?.value;
    const newEditName = form.edit?.value;
    const newSelectCourseName = form.selectCourse?.value;
    const newGapInTopAndBottomName = form.gapInTopAndBottom?.value;
    const newRequiredCompletionPercentageName = form.requiredCompletionPercentage?.value;
    const newOrganizationLogoName = form.organizationLogo?.value;
    const newOrganizationLogoPositionName = form.organizationLogoPosition?.value;
    const newTopRightName = form.topRight?.value;
    const newTopCenterName = form.topCenter?.value;
    const newTopLeftName = form.topLeft?.value;
    const newBottomLeftName = form.bottomLeft?.value;
    const newBottomRightName = form.bottomRight?.value;
    const newOrganizationLogoSizeName = form.organizationLogoSize?.value;
    const newHeaderTitleName = form.headerTitle?.value;
    const newHeaderTitleFontFamilyName = form.headerTitleFontFamily?.value;
    const newHeaderTitleFontSizeName = form.headerTitleFontSize?.value;
    const newHeaderTitleColorName = form.headerTitleColor?.value;
    const newHeaderSubtitleNameName = form.headerSubtitle?.value;
    const newHeaderSubtitleFontFamilyName = form.headerSubtitleFontFamily?.value;
    const newHeaderSubtitleFontSizeName = form.headerSubtitleFontSize?.value;
    const newHeaderSubtitleColorName = form.headerSubtitleColor?.value;
    const newRecipientNameAboveTextName = form.recipientNameAboveText?.value;
    const newRecipientNameAboveTextFontFamilyName = form.recipientNameAboveTextFontFamily?.value;
    const newRecipientNameAboveTextFontSizeName = form.recipientNameAboveTextFontSize?.value;
    const newRecipientNameAboveTextColorName = form.recipientNameAboveTextColor?.value;
    const newRecipientNameName = form.recipientName?.value;
    const newRecipientNameFontFamilyName = form.recipientNameFontFamily?.value;
    const newRecipientNameFontSizeName = form.recipientNameFontSize?.value;
    const newRecipientNameColorName = form.recipientNameColor?.value;
    const newUnderlineRecipientNameName = form.underlineRecipientName?.value;
    const newShowName = form.show?.value;
    const newHideName = form.hide?.value;
    const underlineColor = form.underlineColor?.value;
    const contentOneType = form.contentOneType?.value;
    const staticName = form.static?.value;
    const dynamic = form.dynamic?.value;
    const certificateContentOne = form.certificateContentOne?.value;
    const certificateContentOneFontFamily = form.certificateContentOneFontFamily?.value;
    const certificateContentOneFontSize = form.certificateContentOneFontSize?.value;
    const certificateContentOneColor = form.certificateContentOneColor?.value;
    const addMoreContent = form.addMoreContent?.value;
    const authorOneName = form.authorOneName?.value;
    const authorOneDesignation = form.authorOneDesignation?.value;
    const authorOneSignature = form.authorOneSignature?.value;
    const authorOneSignatureSize = form.authorOneSignatureSize?.value;
    const addAuthor = form.addAuthor?.value;
    const authNameFontFamily = form.authNameFontFamily?.value;
    const authorNameFontSize = form.authorNameFontSize?.value;
    const authorNameColor = form.authorNameColor?.value;
    const authDesignationFontFamily = form.authDesignationFontFamily?.value;
    const authorDesignationFontSize = form.authorDesignationFontSize?.value;
    const authorDesignationColor = form.authorDesignationColor?.value;
    const submitCertificateTemplate = form.submitCertificateTemplate?.value;
    const addTemplateBackground = form.addTemplateBackground?.value;


    const itemDetails = {
      certificateCredentialsForm: newCertificateCredentialsFormName,
      add: newAddName,
      edit: newEditName,
      selectCourse: newSelectCourseName,
      gapInTopAndBottom: newGapInTopAndBottomName,
      requiredCompletionPercentage: newRequiredCompletionPercentageName,
      organizationLogo: newOrganizationLogoName,
      organizationLogoPosition: newOrganizationLogoPositionName,
      topRight: newTopRightName,
      topCenter: newTopCenterName,
      topLeft: newTopLeftName,
      bottomLeft: newBottomLeftName,
      bottomRight: newBottomRightName,
      organizationLogoSize: newOrganizationLogoSizeName,
      headerTitle: newHeaderTitleName,
      headerTitleFontFamily: newHeaderTitleFontFamilyName,
      headerTitleFontSize: newHeaderTitleFontSizeName,
      headerTitleColor: newHeaderTitleColorName,
      headerSubtitle: newHeaderSubtitleNameName,
      headerSubtitleFontFamily: newHeaderSubtitleFontFamilyName,
      headerSubtitleFontSize: newHeaderSubtitleFontSizeName,
      headerSubtitleColor: newHeaderSubtitleColorName,
      recipientNameAboveText: newRecipientNameAboveTextName,
      recipientNameAboveTextFontFamily: newRecipientNameAboveTextFontFamilyName,
      recipientNameAboveTextFontSize: newRecipientNameAboveTextFontSizeName,
      recipientNameAboveTextColor: newRecipientNameAboveTextColorName,
      recipientName: newRecipientNameName,
      recipientNameFontFamily: newRecipientNameFontFamilyName,
      recipientNameFontSize: newRecipientNameFontSizeName,
      recipientNameColor: newRecipientNameColorName,
      underlineRecipientName: newUnderlineRecipientNameName,
      show: newShowName,
      hide: newHideName,
      underlineColor: underlineColor,
      contentOneType: contentOneType,
      static: staticName,
      dynamic: dynamic,
      certificateContentOne: certificateContentOne,
      certificateContentOneFontFamily: certificateContentOneFontFamily,
      certificateContentOneFontSize: certificateContentOneFontSize,
      certificateContentOneColor: certificateContentOneColor,
      addMoreContent: addMoreContent,
      authorOneName: authorOneName,
      authorOneDesignation: authorOneDesignation,
      authorOneSignature: authorOneSignature,
      authorOneSignatureSize: authorOneSignatureSize,
      addAuthor: addAuthor,
      authNameFontFamily: authNameFontFamily,
      authorNameFontSize: authorNameFontSize,
      authorNameColor: authorNameColor,
      authDesignationFontFamily: authDesignationFontFamily,
      authorDesignationFontSize: authorDesignationFontSize,
      authorDesignationColor: authorDesignationColor,
      submitCertificateTemplate: submitCertificateTemplate,
      addTemplateBackground: addTemplateBackground,

    };
    console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/createCertificate/organizationId/${userInfo?.organizationId}`,
      itemDetails
    );
    console.log(item)
    if (item?.data === "Items Name updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Name added Successfully");
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
                <p className='text-lg font-medium'>Certificate Credentials Form</p>
                <input name='certificateCredentialsForm' defaultValue={itemDetails?.certificateCredentialsForm} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add</p>
                <input name='add' defaultValue={itemDetails?.add} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Edit</p>
                <input name='edit' defaultValue={itemDetails?.edit} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select course</p>
                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Gap in top and bottom</p>
                <input name='gapInTopAndBottom' defaultValue={itemDetails?.gapInTopAndBottom} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Required Completion Percentage</p>
                <input name='requiredCompletionPercentage' defaultValue={itemDetails?.requiredCompletionPercentage} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Organization Logo</p>
                <input name='organizationLogo' defaultValue={itemDetails?.organizationLogo} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Organization Logo position</p>
                <input name='organizationLogoPosition' defaultValue={itemDetails?.organizationLogoPosition} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Top Right</p>
                <input name='topRight' type='text' defaultValue={itemDetails?.topRight} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Top Center</p>
                <input name='topCenter' defaultValue={itemDetails?.topCenter} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Top Left</p>
                <input name='topLeft' defaultValue={itemDetails?.topLeft} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Bottom Left</p>
                <input name='bottomLeft' defaultValue={itemDetails?.bottomLeft} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Bottom Right</p>
                <input name='bottomRight' defaultValue={itemDetails?.bottomRight} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Organization Logo size</p>
                <input name='organizationLogoSize' defaultValue={itemDetails?.organizationLogoSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header title</p>
                <input name='headerTitle' defaultValue={itemDetails?.headerTitle} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header title font family</p>
                <input name='headerTitleFontFamily' defaultValue={itemDetails?.headerTitleFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header title font size</p>
                <input name='headerTitleFontSize' defaultValue={itemDetails?.headerTitleFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header title color</p>
                <input name='headerTitleColor' defaultValue={itemDetails?.headerTitleColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header subtitle</p>
                <input name='headerSubtitle' defaultValue={itemDetails?.headerSubtitle} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header subtitle font family</p>
                <input name='headerSubtitleFontFamily' defaultValue={itemDetails?.headerSubtitleFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header subtitle font size</p>
                <input name='headerSubtitleFontSize' defaultValue={itemDetails?.headerSubtitleFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Header subtitle color</p>
                <input name='headerSubtitleColor' defaultValue={itemDetails?.headerSubtitleColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name above text</p>
                <input name='recipientNameAboveText' defaultValue={itemDetails?.recipientNameAboveText} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name above text font family</p>
                <input name='recipientNameAboveTextFontFamily' defaultValue={itemDetails?.recipientNameAboveTextFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name above text font size</p>
                <input name='recipientNameAboveTextFontSize' defaultValue={itemDetails?.recipientNameAboveTextFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name above text color</p>
                <input name='recipientNameAboveTextColor' defaultValue={itemDetails?.recipientNameAboveTextColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name</p>
                <input name='recipientName' defaultValue={itemDetails?.recipientName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name font family</p>
                <input name='recipientNameFontFamily' defaultValue={itemDetails?.recipientNameFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name font size</p>
                <input name='recipientNameFontSize' defaultValue={itemDetails?.recipientNameFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Recipient name color</p>
                <input name='recipientNameColor' defaultValue={itemDetails?.recipientNameColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Underline recipient name</p>
                <input name='underlineRecipientName' defaultValue={itemDetails?.underlineRecipientName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Show</p>
                <input name='show' type='text' defaultValue={itemDetails?.show} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Hide</p>
                <input name='hide' type='text' defaultValue={itemDetails?.hide} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Underline color</p>
                <input name='underlineColor' defaultValue={itemDetails?.underlineColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Content 1 type</p>
                <input name='contentOneType' defaultValue={itemDetails?.contentOneType} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Static</p>
                <input name='static' defaultValue={itemDetails?.static} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Dynamic</p>
                <input name='dynamic' defaultValue={itemDetails?.dynamic} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Certificate content 1</p>
                <input name='certificateContentOne' defaultValue={itemDetails?.certificateContentOne} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Certificate content 1 font family</p>
                <input name='certificateContentOneFontFamily' defaultValue={itemDetails?.certificateContentOneFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Certificate content 1 font Size</p>
                <input name='certificateContentOneFontSize' defaultValue={itemDetails?.certificateContentOneFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Certificate content 1 color</p>
                <input name='certificateContentOneColor' defaultValue={itemDetails?.certificateContentOneColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add More Content</p>
                <input name='addMoreContent' defaultValue={itemDetails?.addMoreContent} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author 1 name</p>
                <input name='authorOneName' defaultValue={itemDetails?.authorOneName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author 1 designation</p>
                <input name='authorOneDesignation' defaultValue={itemDetails?.authorOneDesignation} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author 1 signature</p>
                <input name='authorOneSignature' defaultValue={itemDetails?.authorOneSignature} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author 1 signature size</p>
                <input name='authorOneSignatureSize' defaultValue={itemDetails?.authorOneSignatureSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add Author</p>
                <input name='addAuthor' defaultValue={itemDetails?.addAuthor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Auth name font family</p>
                <input name='authNameFontFamily' defaultValue={itemDetails?.authNameFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author name font size</p>
                <input name='authorNameFontSize' defaultValue={itemDetails?.authorNameFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author name color</p>
                <input name='authorNameColor' defaultValue={itemDetails?.authorNameColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Auth designation font family</p>
                <input name='authDesignationFontFamily' defaultValue={itemDetails?.authDesignationFontFamily} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author designation font size</p>
                <input name='authorDesignationFontSize' defaultValue={itemDetails?.authorDesignationFontSize} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Author designation color</p>
                <input name='authorDesignationColor' defaultValue={itemDetails?.authorDesignationColor} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Submit Certificate Template</p>
                <input name='submitCertificateTemplate' defaultValue={itemDetails?.submitCertificateTemplate} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add Template Background</p>
                <input name='addTemplateBackground' defaultValue={itemDetails?.addTemplateBackground} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>


            </div>
            <div className="flex items-center justify-center mt-20 mb-10 ">
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

export default AdminCreateCertificateDetails;