import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import Locked from "../../../assets/Dashboard/Locked.png";

const DownloadCertificate = () => {
  const { courseId } = useParams();
  const sectionRef = useRef(null);
  const downloadRef = useRef(null);
  const { userInfo } = useContext(AuthContext);
  const [certificateTemplate, setCertificateTemplate] = useState({});
  const [zoom, setZoom] = useState(0.35);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [batchData, setBatchData] = useState({});
  const [orgData, setOrgData] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const courseInfo = userInfo?.courses?.find(
      (course) => course?.courseId === courseId
    );

    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/courses/${courseId}`)
      .then((response) => {
        setCourseData(response?.data);
      })
      .catch((error) => console.error(error));

    if (courseInfo?.batchId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/certificateTemplates/courseId/${courseId}/batchId/${courseInfo?.batchId}`
        )
        .then((response) => {
          setCertificateTemplate(response?.data?.template);
        })
        .catch((error) => console.error(error));

      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/batches/batchId/${courseInfo?.batchId}`
        )
        .then((response) => {
          setBatchData(response?.data);
        })
        .catch((error) => console.error(error));
    }

    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [courseId, userInfo]);

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters`)
      .then((response) => {
        const currentCourseChapter = response?.data?.filter(
          (item) => item?.courseId === courseId
        );
        if (currentCourseChapter) {
          let totalCompleted = 0;
          let totalTask = 0;
          currentCourseChapter?.forEach((item) => {
            item?.tasks?.forEach((singleTask) => {
              totalTask++;
              if (singleTask?.participants) {
                if (
                  singleTask?.participants?.find(
                    (item) => item?.participantId === userInfo?._id
                  )
                ) {
                  totalCompleted++;
                }
              }
            });
          });
          if (totalCompleted !== 0 && totalTask !== 0)
            setCompletionPercentage(
              parseInt((totalCompleted / totalTask) * 100)
            );
        }
      })
      .catch((error) => console.error(error));
  }, [userInfo, courseId]);

  const CertificateContent = React.forwardRef((props, ref) => {
    // Content of your certificate component
    return (
      <div className="relative">
        <div className="absolute z-40 h-full w-full flex flex-col items-center justify-center">
          <img className=" min-w-[40px]" src={Locked} alt="something" />
          <p className=" text-black text-center font-sans mt-4">
            To unlock the certificate you have to complete at least 70% of the
            course.
          </p>
        </div>
        <div
          className={`${completionPercentage < 70 && "filter blur-md"}`}
          id="your-section-id"
          style={{
            width: `${certificateTemplate?.imageDimensions?.width * zoom}px`,
            height: `${certificateTemplate?.imageDimensions?.height * zoom}px`,
            backgroundPosition: "start",
            // transform: `scale(${zoom})`,
            transition: "transform 0.2s ease",
          }}
        >
          <div className="relative" ref={downloadRef}>
            <div
              style={{
                paddingTop: `${
                  certificateTemplate?.gapInTopAndBottom * zoom
                }px`,
                paddingBottom: `${
                  certificateTemplate?.gapInTopAndBottom * zoom
                }px`,
              }}
              className="absolute w-full flex flex-col justify-between h-full"
            >
              {certificateTemplate?.orgLogo &&
                certificateTemplate?.showOrgLogo &&
                (certificateTemplate?.orgLogoPosition === "Top Left" ||
                  certificateTemplate?.orgLogoPosition === "Top Right") && (
                  <div
                    style={
                      {
                        // top: `${gapInTopAndBottom * zoom}px`,
                      }
                    }
                    className={`mx-auto absolute ${
                      certificateTemplate?.orgLogoPosition === "Top Right"
                        ? ` left-20`
                        : ` right-20`
                    }`}
                  >
                    <img
                      style={{
                        width: `${certificateTemplate?.orgLogoSize * zoom}px`,
                      }}
                      // className=" mx-auto"
                      src={certificateTemplate?.orgLogo}
                      alt="orgLogo"
                    />
                  </div>
                )}
              <div className=" text-center">
                {certificateTemplate?.orgLogo &&
                  certificateTemplate?.showOrgLogo &&
                  certificateTemplate?.orgLogoPosition === "Top Center" && (
                    <div className="mx-auto w-full text-center">
                      <img
                        style={{
                          width: `${certificateTemplate?.orgLogoSize * zoom}px`,
                        }}
                        className=" mx-auto mb-4"
                        src={certificateTemplate?.orgLogo}
                        alt="orgLogo"
                      />
                    </div>
                  )}
                <h1
                  style={{
                    fontSize: `${
                      certificateTemplate?.headerTitleFontSize * zoom
                    }px`,
                    fontFamily: `${certificateTemplate?.headerTitleFontFamily}`,
                    color: `${certificateTemplate?.headerTitleColor}`,
                  }}
                  className=" font-semibold"
                >
                  {certificateTemplate?.headerTitle}
                </h1>
                <h2
                  style={{
                    fontSize: `${
                      certificateTemplate?.headerSubtitleFontSize * zoom
                    }px`,
                    fontFamily: `${certificateTemplate?.headerSubtitleFontFamily}`,
                    color: `${certificateTemplate?.headerSubtitleColor}`,
                  }}
                  className=" font-semibold"
                >
                  {certificateTemplate?.headerSubtitle}
                </h2>
              </div>
              <div className=" text-center">
                <p
                  style={{
                    fontSize: `${
                      certificateTemplate?.recipientNameAboveTextFontSize * zoom
                    }px`,
                    fontFamily: `${certificateTemplate?.recipientNameAboveTextFontFamily}`,
                    color: `${certificateTemplate?.recipientNameAboveTextColor}`,
                  }}
                >
                  {certificateTemplate?.recipientNameAboveText}
                </p>
                <h1
                  style={{
                    fontSize: `${
                      certificateTemplate?.recipientNameFontSize * zoom
                    }px`,
                    fontFamily: `${certificateTemplate?.recipientNameFontFamily}`,
                    color: `${certificateTemplate?.recipientNameColor}`,
                    borderColor: certificateTemplate?.underlineColor,
                  }}
                  className={` font-medium ${
                    certificateTemplate?.showRecipientNameUnderline &&
                    `border-b-[4px]`
                  } inline-block`}
                >
                  {userInfo?.name}
                </h1>
                <p className="mt-3 font-medium max-w-[60%] mx-auto">
                  {/* {certificateText} */}
                  {certificateTemplate?.certificateTextContents?.map(
                    (content, index) => (
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
                          ? userInfo?.name
                          : content?.content === "Course name"
                          ? courseData?.courseFullName
                          : content?.content === "Batch name"
                          ? batchData?.batchName
                          : content?.content === "Organization name" &&
                            orgData?.organizationName}{" "}
                      </span>
                    )
                  )}
                </p>
              </div>
              <div>
                <div className="w-[80%] p-2 mx-auto flex items-center justify-between">
                  {certificateTemplate?.orgLogo &&
                    certificateTemplate?.showOrgLogo &&
                    certificateTemplate?.orgLogoPosition === "Bottom Left" && (
                      <div className="mx-auto">
                        <img
                          style={{
                            width: `${
                              certificateTemplate?.orgLogoSize * zoom
                            }px`,
                          }}
                          // className=" mx-auto"
                          src={certificateTemplate?.orgLogo}
                          alt="orgLogo"
                        />
                      </div>
                    )}
                  {certificateTemplate?.authors?.map((author, index) => (
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
                            fontSize: `${
                              certificateTemplate?.authorNameFontSize * zoom
                            }px`,
                            fontFamily: `${certificateTemplate?.authorNameFontFamily}`,
                            color: `${certificateTemplate?.authorNameColor}`,
                          }}
                          className=""
                        >
                          {author.name}
                        </h1>
                        <h2
                          style={{
                            fontSize: `${
                              certificateTemplate?.authorPositionFontSize * zoom
                            }px`,
                            fontFamily: `${certificateTemplate?.authorPositionFontFamily}`,
                            color: `${certificateTemplate?.authorPositionColor}`,
                          }}
                          className=""
                        >
                          {author.position}
                        </h2>
                      </div>
                    </div>
                  ))}
                  {certificateTemplate?.orgLogo &&
                    certificateTemplate?.showOrgLogo &&
                    certificateTemplate?.orgLogoPosition === "Bottom Right" && (
                      <div className="mx-auto">
                        <img
                          style={{
                            width: `${
                              certificateTemplate?.orgLogoSize * zoom
                            }px`,
                          }}
                          // className=" mx-auto"
                          src={certificateTemplate?.orgLogo}
                          alt="orgLogo"
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
            <img
              style={{
                width: `${
                  certificateTemplate?.imageDimensions?.width * zoom
                }px`,
                height: `${
                  certificateTemplate?.imageDimensions?.height * zoom
                }px`,
              }}
              // className="w-full"
              src={certificateTemplate?.selectedBackgroundTemplate}
              alt="CertificateTemplate"
            />
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = certificateTemplate?.selectedBackgroundTemplate;

      img.onload = () => {
        const { width, height } = img;
        // setImageDimensions({ width, height });

        const parentWidth = sectionRef.current?.clientWidth;
        const parentHeight = sectionRef.current?.clientHeight;

        console.log(parentWidth, parentHeight);

        const widthRatio = parentWidth / width;
        const heightRatio = height / parentHeight;

        const initialZoom = Math.min(widthRatio, heightRatio);

        // Adjust the initial width of the section based on the parent div's width
        sectionRef.current.style.width = `${parentWidth}px`;

        if (initialZoom > 0.5) setZoom(0.5);
        else setZoom(initialZoom);
        console.log(initialZoom);
      };
    };

    loadImage();
  }, [certificateTemplate?.selectedBackgroundTemplate]);

  const handlePrint = useReactToPrint({
    content: () => downloadRef.current,
    pageStyle: `
      @page {
        size: ${certificateTemplate?.imageDimensions?.width * zoom}px ${
      certificateTemplate?.imageDimensions?.height * zoom
    }px;
        margin: 0mm;
      }
      body {
        margin: 0mm;
      }
    `,
  });

  return (
    <div>
      <Layout>
        <div className="px-4">
          <div className=" mt-10 relative overflow-hidden">
            <div
              ref={sectionRef}
              style={{
                width: "100%",
                //   height: "85vh",
                overflow: "hidden",
                position: "relative",
                //   padding: "20px",
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
            <div
              className="flex flex-col items-center justify-center my-5"
              // style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
            >
              <div>
                <button
                  className="p-2 border border-black rounded-l-md"
                  onClick={handleZoomIn}
                >
                  <ZoomInIcon />
                </button>
                <button
                  className="p-2 border border-black rounded-r-md"
                  onClick={handleZoomOut}
                >
                  <ZoomOutIcon />
                </button>
              </div>
              <button
                className={`mt-5 px-4 py-2 ${
                  completionPercentage < 70 ? " bg-gray-400" : " bg-green"
                } text-white text-lg font-bold rounded-md flex items-center justify-center gap-2`}
                onClick={() => {
                  if (completionPercentage >= 70) handlePrint();
                  else
                    Swal.fire({
                      title: "You have to complete at least 70% of the course!",
                      icon: "warning",
                    });
                }}
              >
                Download PDF{" "}
                {completionPercentage < 70 && (
                  <img className="w-[20px]" src={Locked} alt="locked" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DownloadCertificate;
