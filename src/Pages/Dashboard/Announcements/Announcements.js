import React, { useState } from "react";
import Layout from "../Layout";
import AdminAnnouncementForm from "./AdminAnnouncementForm";

const Announcements = () => {
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  return (
    <div>
      <Layout>
        <div className="p-4">
          <div className="flex items-center justify-between h-24 ">
            <h1 className="text-3xl font-bold">Announcements</h1>
            <button
              onClick={() => setShowAnnouncementForm(true)}
              className="bg-sky-500 text-white px-4 py-2 font-medium rounded hover:bg-sky-600 transition duration-300"
            >
              Publish Announcement
            </button>
          </div>
          {showAnnouncementForm && <AdminAnnouncementForm />}
          <div id="ember849" className="ember-view">
            <div className="card-body" data-ember-action="850">
              <div className=" flex items-start mb-10 w-[700px] border border-[#E5E8EC] rounded-md">
                <div className="announce-img-container bg-[#EAEAEA]">
                  <img
                    alt="Announcement Img"
                    className="image-class max-w-[255px] h-[142px] object-contain"
                    src="https://dme2wmiz2suov.cloudfront.net/Institution(2351)/Announcement/2314986-STUDYING_ABROAD_&amp;_WRITING_YOUR_STATEMENT_OF_PURPOSE_(26).png?Expires=1707571005&amp;Signature=EnNBrbLZ5p~nCS4TdmWKgenYdrki3yE3QPXYAGZPlDzJ-PG2ahTFv3twIrUduJkZGdJ~YKaLAp5Cjz12bGXipy9UL5jX7taWUHIydGPb3o78ArTJx42QImuqMiboCOBE9m0YF0eC1uCeqjHUwdOy66UGNHPpKicI7fXA1kDk61V~n0YFvm9sIF~jH2AYSS8jrbx2d0RmXU9yTocOlyzi-ZaWmoUW6v4Uh4NCB~IL6Usm6KnICZPA9Qgq0KmLqki8y3HJxaQpA99t2j1~mlQKue6bKlU8LoppyNeracu-tA4UEBz9veO5heZZjV5wqMaE4UKEet-rte6B8pdUYOEHjg__&amp;Key-Pair-Id=APKAIIFZDCEANAVU2VTA"
                  />
                </div>
                <div className="announcement-container my-[10px] mx-[20px]">
                  <div className="announcement-title-container flex gap-[16px]">
                    <div className="announcement-title-text pt-[6px] text-[16px] font-medium ">
                      Get your SOPs and LORs reviewed at discounted rate!{" "}
                    </div>
                    <div className="announcement-urgency-text high-urgency bg-[#F7E7E9] text-[#E63946] w-fit h-fit py-[6px] px-[8px] mt-1 rounded text-[12px] whitespace-nowrap font-medium">
                      HIGH URGENCY
                    </div>
                  </div>
                  <div className="announcement-description my-2">
                    <small className="text-muted m-0 text-[14px] font-normal">
                      <p>Hi Study Abroad Applicants,&nbsp;</p>
                      <p>
                        This is to inform you that our pricing for the SOP and
                        LOR feedback packages will be revised from 1st October,
                        2023 due to limited slot availability.&nbsp;
                      </p>
                      <p>
                        So this is the last chance to get your feedback at
                        discounted rates.&nbsp;
                      </p>
                      <p>
                        To reserve your slots:&nbsp;
                        <a
                          href="http://www.wiseupcommunications.com/study-abroad-program"
                          target="_blank"
                        >
                          REGISTER HERE
                        </a>
                      </p>
                      <p>
                        Thanks and wish you all the best for your applications!
                        :)&nbsp;
                      </p>
                      <p>Regards,&nbsp;</p>
                      <p>Neha Agrawal&nbsp;</p>
                      <p>
                        <a
                          href="http://www.wiseupcommunications.com/study-abroad-program"
                          target="_blank"
                        >
                          {" "}
                        </a>
                      </p>
                    </small>
                  </div>
                  <small className="text-muted announcement-date-time text-[14px] font-medium text-gray-500 font-sans">
                    <span>27 Sep 23</span>•<span>06:20 PM</span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Announcements;
