import Layout from "../Layout";
import required from "../../../assets/ContentManagement/required.png";
import youtube from "../../../assets/ContentManagement/youtube.svg";
import Audioimg from "../../../assets/ContentManagement/audio.png";
import { useContext, useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkillBasedParameter from "./Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "./Components/Shared/ItemEarningParameter";

const ManageAudio = () => {
  // upload file
  const [dragActive, setDragActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
        const fetchData = {
          organizationId: userInfo?.organizationId,
          courseId: response?.data?.courseId,
        };
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/skillCategoriesByCourseId`,
            fetchData
          )
          .then((res) => setSkillCategories(res?.data))
          .catch((error) => console.error(error));
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/itemCategoryByCourseId`,
            fetchData
          )
          .then((res) => setEarningCategories(res?.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form.readingTopicName);
    const readingTopicName = form.readingTopicName?.value;

    const ManageAudio = {
      readingTopicName,
      additionalFiles: selectedFile,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
    };

    console.log(ManageAudio);
  };

  return (
    <div>
      <Layout>
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Audio in Topic 1</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex  me-20 py-[35px] ps-[40px]">
            <div className="w-full">
              <div className="">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">
                    Audio Topic Name
                  </p>
                  <img src={required} alt="required" />
                </div>

                <input
                  required
                  className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                  name="readingTopicName"
                  type="text"
                  placeholder="Eg. Entrepreneurship Lab"
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" flex flex-col">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Upload Audio</p>
                </div>

                <div
                  className="w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6"
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  style={{
                    border: "0.917px dashed #000",
                    background: "#F6F7FF",
                  }}
                >
                  {dragActive ? (
                    <>
                      <div className="bg-[#3734DE] rounded-full mb-5">
                        <img src={Audioimg} alt="audioImg" />
                      </div>

                      <p className="text-[17px] font-semibold mb-5">
                        Drag and drop{" "}
                      </p>
                      <p className="text-sm font-medium mb-5">Or</p>
                    </>
                  ) : (
                    selectedFile && <p>Selected file: {selectedFile.name}</p>
                  )}
                  {!selectedFile && (
                    <>
                      <div className="flex gap-2 justify-center w-full">
                        <label
                          className="flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                          htmlFor="input-file-upload"
                        >
                          Browser
                        </label>
                        <input
                          className="w-[1%]"
                          style={{ fontSize: "0", opacity: "0" }}
                          type="file"
                          accept="/*"
                          name="input-file-upload"
                          id="input-file-upload"
                          onChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 my-10">
            <p className="text-[25px] font-bold mb-10">Evaluation Parameter</p>
            <SkillBasedParameter
              selectedData={skillParameterData}
              setSelectedData={setSkillParameterData}
              categories={skillCategories}
            />
            <ItemEarningParameter
              selectedData={earningParameterData}
              setSelectedData={setEarningParameterData}
              categories={earningCategories}
            />
          </div>
          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
            />
            <input
              type="submit"
              value="Save & Display"
              className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
            />
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default ManageAudio;
