import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useReactToPrint } from "react-to-print";

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

  useEffect(() => {
    const courseInfo = userInfo?.courses?.find(
      (course) => course?.courseId === courseId
    );

    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${courseId}`)
      .then((response) => {
        setCourseData(response?.data);
      })
      .catch((error) => console.error(error));

    if (courseInfo?.batchId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/certificateTemplates/courseId/${courseId}/batchId/${courseInfo?.batchId}`
        )
        .then((response) => {
          setCertificateTemplate(response?.data?.template);
        })
        .catch((error) => console.error(error));

      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/batchId/${courseInfo?.batchId}`
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

  const CertificateContent = React.forwardRef((props, ref) => {
    // Content of your certificate component
    return (
      <div>
        <div
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
              <div className=" text-center">
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
                  }}
                  className=" font-medium"
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
                  <div className="mx-auto">
                    {certificateTemplate?.orgLogo && (
                      <img
                        style={{
                          width: `${certificateTemplate?.orgLogoSize * zoom}px`,
                        }}
                        // className=" mx-auto"
                        src={certificateTemplate?.orgLogo}
                        alt="orgLogo"
                      />
                    )}
                  </div>
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
                className="mt-5 px-4 py-2 bg-green text-white text-lg font-bold rounded-md"
                onClick={handlePrint}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DownloadCertificate;
