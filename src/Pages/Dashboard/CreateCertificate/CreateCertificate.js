import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import CertificateTemplate1 from "../../../assets/Dashboard/CertificateTemplate1.png";
import CertificateTemplate2 from "../../../assets/Dashboard/CertificateTemplate2.png";
import CertificateTemplate3 from "../../../assets/Dashboard/CertificateTemplate3.png";
import CertificateTemplate4 from "../../../assets/Dashboard/CertificateTemplate4.png";
import CertificateTemplate5 from "../../../assets/Dashboard/CertificateTemplate5.png";
import CertificateTemplate6 from "../../../assets/Dashboard/CertificateTemplate6.png";
import CertificateTemplate7 from "../../../assets/Dashboard/CertificateTemplate7.png";
import CertificateTemplate8 from "../../../assets/Dashboard/CertificateTemplate8.png";
import CertificateTemplate9 from "../../../assets/Dashboard/CertificateTemplate9.png";
import AddIcon from "@mui/icons-material/Add";
import Signature from "../../../assets/Dashboard/Signature.png";
import CertificateEditor from "./CertificateEditor";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useReactToPrint } from "react-to-print";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";

const CreateCertificate = () => {
  const { userInfo } = useContext(AuthContext);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [zoom, setZoom] = useState(1);
  const sectionRef = useRef(null);
  const downloadRef = useRef(null);
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [gapInTopAndBottom, setGapInTopAndBottom] = useState(115);
  const [certificateText, setCertificateText] = useState("");
  const [headerTitle, setHeaderTitle] = useState("CERTIFICATE OF RECOGNITION");
  const [headerSubtitle, setHeaderSubtitle] = useState("");
  const [recipientNameAboveText, setRecipientNameAboveText] = useState(
    "The following award is given to"
  );
  const [recipientName, setRecipientName] = useState("Daniel Martinez");
  const [headerTitleFontSize, setHeaderTitleFontSize] = useState(70);
  const [headerSubtitleFontSize, setHeaderSubtitleFontSize] = useState(55);
  const [certificateTextFontSize, setCertificateTextFontSize] = useState(25);
  const [recipientNameFontSize, setRecipientNameFontSize] = useState(100);
  const [recipientNameAboveTextFontSize, setRecipientNameAboveTextFontSize] =
    useState(45);
  const [courseNameFontSize, setCourseNameFontSize] = useState(30);
  const [authorNameFontSize, setAuthorNameFontSize] = useState(40);
  const [authorPositionFontSize, setAuthorPositionFontSize] = useState(35);
  const [headerTitleColor, setHeaderTitleColor] = useState("#091677");
  const [headerSubtitleColor, setHeaderSubtitleColor] = useState("#000000");
  const [certificateTextColor, setCertificateTextColor] = useState("#000000");
  const [recipientNameColor, setRecipientNameColor] = useState("#000000");
  const [recipientNameAboveTextColor, setRecipientNameAboveTextColor] =
    useState("#000000");
  const [courseNameColor, setCourseNameColor] = useState("#000000");
  const [authorNameColor, setAuthorNameColor] = useState("#000000");
  const [authorPositionColor, setAuthorPositionColor] = useState("#000000");
  const [headerTitleFontFamily, setHeaderTitleFontFamily] = useState("Lora");
  const [headerSubtitleFontFamily, setHeaderSubtitleFontFamily] = useState("");
  const [certificateTextFontFamily, setCertificateTextFontFamily] =
    useState("");
  const [recipientNameFontFamily, setRecipientNameFontFamily] =
    useState("Courgette");
  const [
    recipientNameAboveTextFontFamily,
    setRecipientNameAboveTextFontFamily,
  ] = useState("Lora");
  const [courseNameFontFamily, setCourseNameFontFamily] = useState("");
  const [authorNameFontFamily, setAuthorNameFontFamily] = useState("");
  const [authorPositionFontFamily, setAuthorPositionFontFamily] = useState("");
  const [showRecipientNameUnderline, setShowRecipientNameUnderline] =
    useState(true);
  const [underlineColor, setUnderlineColor] = useState("#000000");
  const [authors, setAuthors] = useState([
    {
      name: "Author Name",
      position: "Designation of author",
      signature: Signature,
      signatureSize: 350,
    },
  ]);
  const [orgData, setOrgData] = useState({});
  const [orgLogo, setOrgLogo] = useState("");
  const [orgLogoSize, setOrgLogoSize] = useState(300);
  const [showOrgLogo, setShowOrgLogo] = useState(true);
  const [orgLogoPosition, setOrgLogoPosition] = useState("Top Center");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [certificateTextContents, setCertificateTextContents] = useState([
    {
      type: "Static",
      content:
        "This certificate is given to Marceline Anderson for his achievement in the field of education and proves that he is competent in his field.",
      contentFontFamily: "Lora",
      contentColor: "#000000",
      contentFontSize: 35,
    },
  ]);
  const [backgroundTemplates, setBackgroundTemplates] = useState([
    CertificateTemplate9,
    CertificateTemplate1,
    CertificateTemplate6,
    CertificateTemplate2,
    CertificateTemplate5,
    CertificateTemplate3,
    CertificateTemplate4,
    CertificateTemplate7,
    CertificateTemplate8,
  ]);
  const [selectedBackgroundTemplate, setSelectedBackgroundTemplate] = useState(
    backgroundTemplates[0]
  );

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = selectedBackgroundTemplate;

      img.onload = () => {
        const { width, height } = img;
        setImageDimensions({ width, height });

        const parentWidth = sectionRef.current?.clientWidth;
        const parentHeight = sectionRef.current?.clientHeight;

        console.log(parentWidth, parentHeight);

        const widthRatio = parentWidth / width;
        const heightRatio = height / parentHeight;

        const initialZoom = Math.min(widthRatio, heightRatio);

        // Adjust the initial width of the section based on the parent div's width
        sectionRef.current.style.width = `${parentWidth}px`;

        setZoom(initialZoom + 0.2);
        console.log(initialZoom);
      };
    };

    loadImage();
  }, [selectedBackgroundTemplate]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        setOrgLogo(response?.data?.org_logo);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${selectedCourse?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [selectedCourse]);

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      const deltaX = event.clientX - position.x;
      const deltaY = event.clientY - position.y;

      sectionRef.current.scrollLeft -= deltaX;
      sectionRef.current.scrollTop -= deltaY;

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handlePrint = useReactToPrint({
    content: () => downloadRef.current,
    pageStyle: `
      @page {
        size: ${imageDimensions.width * zoom}px ${
      imageDimensions.height * zoom
    }px;
        margin: 0mm;
      }
      body {
        margin: 0mm;
      }
    `,
  });

  const CertificateContent = React.forwardRef((props, ref) => {
    // Content of your certificate component
    return (
      <div>
        <div
          id="your-section-id"
          style={{
            width: `${imageDimensions.width * zoom}px`,
            height: `${imageDimensions.height * zoom}px`,
            backgroundPosition: "center",
            transform: `scale(${zoom})`,
            transition: "transform 0.2s ease",
          }}
        >
          <div className="relative" ref={downloadRef}>
            <div
              style={{
                paddingTop: `${gapInTopAndBottom * zoom}px`,
                paddingBottom: `${gapInTopAndBottom * zoom}px`,
              }}
              className="absolute w-full flex flex-col justify-between h-full"
            >
              {orgLogo &&
                showOrgLogo &&
                (orgLogoPosition === "Top Left" ||
                  orgLogoPosition === "Top Right") && (
                  <div
                    style={
                      {
                        // top: `${gapInTopAndBottom * zoom}px`,
                      }
                    }
                    className={`mx-auto absolute ${
                      orgLogoPosition === "Top Right" ? ` left-20` : ` right-20`
                    }`}
                  >
                    <img
                      style={{
                        width: `${orgLogoSize * zoom}px`,
                      }}
                      // className=" mx-auto"
                      src={orgLogo}
                      alt="orgLogo"
                    />
                  </div>
                )}
              <div className=" text-center">
                {orgLogo && showOrgLogo && orgLogoPosition === "Top Center" && (
                  <div className="mx-auto w-full text-center">
                    <img
                      style={{
                        width: `${orgLogoSize * zoom}px`,
                      }}
                      className=" mx-auto mb-4"
                      src={orgLogo}
                      alt="orgLogo"
                    />
                  </div>
                )}
                <h1
                  style={{
                    fontSize: `${headerTitleFontSize * zoom}px`,
                    fontFamily: `${headerTitleFontFamily}`,
                    color: `${headerTitleColor}`,
                  }}
                  className=" font-semibold"
                >
                  {headerTitle}
                </h1>
                <h2
                  style={{
                    fontSize: `${headerSubtitleFontSize * zoom}px`,
                    fontFamily: `${headerSubtitleFontFamily}`,
                    color: `${headerSubtitleColor}`,
                  }}
                  className=" font-semibold"
                >
                  {headerSubtitle}
                </h2>
              </div>
              <div className=" text-center">
                <p
                  style={{
                    fontSize: `${recipientNameAboveTextFontSize * zoom}px`,
                    fontFamily: `${recipientNameAboveTextFontFamily}`,
                    color: `${recipientNameAboveTextColor}`,
                  }}
                >
                  {recipientNameAboveText}
                </p>
                <h1
                  style={{
                    fontSize: `${recipientNameFontSize * zoom}px`,
                    fontFamily: `${recipientNameFontFamily}`,
                    color: `${recipientNameColor}`,
                    borderColor: underlineColor,
                  }}
                  className={` font-medium ${
                    showRecipientNameUnderline &&
                    `border-b-[4px] border-[${underlineColor}]`
                  } inline-block`}
                >
                  {recipientName}
                </h1>
                <p className="mt-3 font-medium max-w-[60%] mx-auto">
                  {/* {certificateText} */}
                  {certificateTextContents?.map((content, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: `${content.contentFontSize * zoom}px`,
                        fontFamily: `${content.contentFontFamily}`,
                        color: `${content.contentColor}`,
                      }}
                    >
                      {content?.type === "Static"
                        ? content?.content
                        : content?.content === "Recipient name"
                        ? recipientName
                        : content?.content === "Course name"
                        ? selectedCourse?.courseFullName
                        : content?.content === "Batch name"
                        ? selectedBatch?.batchName
                        : content?.content === "Organization name" &&
                          orgData?.organizationName}{" "}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <div className="w-[80%] p-2 mx-auto flex items-center justify-between">
                  {orgLogo &&
                    showOrgLogo &&
                    orgLogoPosition === "Bottom Left" && (
                      <div className="mx-auto">
                        <img
                          style={{
                            width: `${orgLogoSize * zoom}px`,
                          }}
                          // className=" mx-auto"
                          src={orgLogo}
                          alt="orgLogo"
                        />
                      </div>
                    )}
                  {authors?.map((author, index) => (
                    <div key={index} className="mx-auto w-fit text-center">
                      {author.signature && (
                        <img
                          style={{
                            width: `${author.signatureSize * zoom}px`,
                          }}
                          className=" mx-auto"
                          src={author.signature}
                          alt="Signature"
                        />
                      )}
                      <div
                        className={`w-fit ${
                          author.name && "border-t-[2px] border-black"
                        } px-2`}
                      >
                        <h1
                          style={{
                            fontSize: `${authorNameFontSize * zoom}px`,
                            fontFamily: `${authorNameFontFamily}`,
                            color: `${authorNameColor}`,
                          }}
                          className=""
                        >
                          {author.name}
                        </h1>
                        <h2
                          style={{
                            fontSize: `${authorPositionFontSize * zoom}px`,
                            fontFamily: `${authorPositionFontFamily}`,
                            color: `${authorPositionColor}`,
                          }}
                          className=""
                        >
                          {author.position}
                        </h2>
                      </div>
                    </div>
                  ))}
                  {orgLogo &&
                    showOrgLogo &&
                    orgLogoPosition === "Bottom Right" && (
                      <div className="mx-auto">
                        <img
                          style={{
                            width: `${orgLogoSize * zoom}px`,
                          }}
                          // className=" mx-auto"
                          src={orgLogo}
                          alt="orgLogo"
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
            <img
              style={{
                width: `${imageDimensions.width * zoom}px`,
                height: `${imageDimensions.height * zoom}px`,
              }}
              // className="w-full"
              src={selectedBackgroundTemplate}
              alt="CertificateTemplate"
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Layout>
        <div className="grid grid-cols-12">
          <div
            className="border rounded-md border-black"
            style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
          >
            <button
              className="p-2 border-r border-black"
              onClick={handleZoomIn}
            >
              <ZoomInIcon />
            </button>
            <button
              className="p-2 border-l border-black"
              onClick={handleZoomOut}
            >
              <ZoomOutIcon />
            </button>
          </div>
          <div className="col-span-9 relative overflow-hidden">
            <div
              ref={sectionRef}
              style={{
                width: "100%",
                height: "85vh",
                overflow: "hidden",
                position: "relative",
                padding: "20px",
                cursor: dragging ? "grabbing" : "grab",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              // className="my-auto"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <CertificateContent zoom={zoom} />
            </div>
            <div className="border-t border-black h-[15vh] p-1">
              <div className=" w-full flex gap-4 flex-row overflow-x-scroll p-2">
                <label className=" h-full my-auto w-fit text-center min-w-[150px] ">
                  <input
                    className="hidden"
                    type="file"
                    name="input-file-upload"
                    id="input-file-upload"
                    // onChange={handleFileChange}
                    onChange={async (e) => {
                      e.preventDefault();
                      const file = e.target.files[0];
                      try {
                        if (file) {
                          const url = await uploadFileToS3(file);
                          const reader = new FileReader();

                          reader.onloadend = async () => {
                            const img = await url;
                            setSelectedBackgroundTemplate(img);
                            setBackgroundTemplates([
                              img,
                              ...backgroundTemplates,
                            ]);
                          };

                          reader.readAsDataURL(file);
                        }
                        // authors[index].signature = await uploadFileToS3(file);
                        // authors[index].signature = file.name;
                      } catch (error) {
                        console.error("Error uploading file:", error);
                      }
                    }}
                    multiple
                  />
                  <AddIcon sx={{ fontSize: "40px", color: "gray" }} />
                  <p className="w-fit text-gray-400 font-bold ">
                    Add Template Background
                  </p>
                </label>
                {backgroundTemplates?.map((backgroundTemplate) => (
                  <div
                    className={` min-w-fit h-full shadow-md  ${
                      selectedBackgroundTemplate === backgroundTemplate &&
                      " shadow-red-500 border border-red-400"
                    }`}
                  >
                    <img
                      onClick={() =>
                        setSelectedBackgroundTemplate(backgroundTemplate)
                      }
                      className={` ${
                        selectedBackgroundTemplate !== backgroundTemplate &&
                        " opacity-40"
                      }  cursor-pointer min-w-fit h-[11vh]`}
                      key={backgroundTemplate}
                      src={backgroundTemplate}
                      alt="backgroundTemplate"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="col-span-3 border-l border-black h-[100vh] overflow-y-scroll p-1"> */}
          {/* <button onClick={handlePrint}>Download PDF</button> */}
          <CertificateEditor
            selectedBackgroundTemplate={selectedBackgroundTemplate}
            imageDimensions={imageDimensions}
            zoom={zoom}
            gapInTopAndBottom={gapInTopAndBottom}
            setGapInTopAndBottom={setGapInTopAndBottom}
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            courseName={courseName}
            setCourseName={setCourseName}
            certificateText={certificateText}
            setCertificateText={setCertificateText}
            headerTitle={headerTitle}
            setHeaderTitle={setHeaderTitle}
            headerSubtitle={headerSubtitle}
            setHeaderSubtitle={setHeaderSubtitle}
            recipientNameAboveText={recipientNameAboveText}
            setRecipientNameAboveText={setRecipientNameAboveText}
            headerTitleFontSize={headerTitleFontSize}
            setHeaderTitleFontSize={setHeaderTitleFontSize}
            headerSubtitleFontSize={headerSubtitleFontSize}
            setHeaderSubtitleFontSize={setHeaderSubtitleFontSize}
            certificateTextFontSize={certificateTextFontSize}
            setCertificateTextFontSize={setCertificateTextFontSize}
            recipientNameFontSize={recipientNameFontSize}
            setRecipientNameFontSize={setRecipientNameFontSize}
            recipientNameAboveTextFontSize={recipientNameAboveTextFontSize}
            setRecipientNameAboveTextFontSize={
              setRecipientNameAboveTextFontSize
            }
            courseNameFontSize={courseNameFontSize}
            setCourseNameFontSize={setCourseNameFontSize}
            headerTitleColor={headerTitleColor}
            setHeaderTitleColor={setHeaderTitleColor}
            headerSubtitleColor={headerSubtitleColor}
            setHeaderSubtitleColor={setHeaderSubtitleColor}
            certificateTextColor={certificateTextColor}
            setCertificateTextColor={setCertificateTextColor}
            recipientNameColor={recipientNameColor}
            setRecipientNameColor={setRecipientNameColor}
            recipientNameAboveTextColor={recipientNameAboveTextColor}
            setRecipientNameAboveTextColor={setRecipientNameAboveTextColor}
            courseNameColor={courseNameColor}
            setCourseNameColor={setCourseNameColor}
            headerTitleFontFamily={headerTitleFontFamily}
            setHeaderTitleFontFamily={setHeaderTitleFontFamily}
            headerSubtitleFontFamily={headerSubtitleFontFamily}
            setHeaderSubtitleFontFamily={setHeaderSubtitleFontFamily}
            certificateTextFontFamily={certificateTextFontFamily}
            setCertificateTextFontFamily={setCertificateTextFontFamily}
            recipientNameFontFamily={recipientNameFontFamily}
            setRecipientNameFontFamily={setRecipientNameFontFamily}
            recipientNameAboveTextFontFamily={recipientNameAboveTextFontFamily}
            setRecipientNameAboveTextFontFamily={
              setRecipientNameAboveTextFontFamily
            }
            courseNameFontFamily={courseNameFontFamily}
            setCourseNameFontFamily={setCourseNameFontFamily}
            authors={authors}
            setAuthors={setAuthors}
            count={count}
            setCount={setCount}
            authorNameFontSize={authorNameFontSize}
            setAuthorNameFontSize={setAuthorNameFontSize}
            authorNameColor={authorNameColor}
            setAuthorNameColor={setAuthorNameColor}
            authorNameFontFamily={authorNameFontFamily}
            setAuthorNameFontFamily={setAuthorNameFontFamily}
            authorPositionFontSize={authorPositionFontSize}
            setAuthorPositionFontSize={setAuthorPositionFontSize}
            authorPositionColor={authorPositionColor}
            setAuthorPositionColor={setAuthorPositionColor}
            authorPositionFontFamily={authorPositionFontFamily}
            setAuthorPositionFontFamily={setAuthorPositionFontFamily}
            courses={courses}
            setCourses={setCourses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            batchesData={batchesData}
            setBatchesData={setBatchesData}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            certificateTextContents={certificateTextContents}
            setCertificateTextContents={setCertificateTextContents}
            orgLogo={orgLogo}
            setOrgLogo={setOrgLogo}
            orgLogoSize={orgLogoSize}
            setOrgLogoSize={setOrgLogoSize}
            showOrgLogo={showOrgLogo}
            setShowOrgLogo={setShowOrgLogo}
            orgLogoPosition={orgLogoPosition}
            setOrgLogoPosition={setOrgLogoPosition}
            showRecipientNameUnderline={showRecipientNameUnderline}
            setShowRecipientNameUnderline={setShowRecipientNameUnderline}
            underlineColor={underlineColor}
            setUnderlineColor={setUnderlineColor}
            setSelectedBackgroundTemplate={setSelectedBackgroundTemplate}
            setImageDimensions={setImageDimensions}
            setZoom={setZoom}
            backgroundTemplates={backgroundTemplates}
            setBackgroundTemplates={setBackgroundTemplates}
          />
          {/* </div> */}
        </div>
      </Layout>
    </>
  );
};

export default CreateCertificate;
