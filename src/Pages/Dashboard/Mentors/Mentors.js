import React, { useState } from "react";
import Layout from "../Layout";
import OrgMentors from "./OrgMentors";
import AddMentors from "./AddMentors";

export default function Mentors() {
  const [currentPage, setCurrentPage] = useState("My Mentors");
  return (
    <div>
      <Layout>
        <div className="p-4 mt-20 lg:mt-0">
          <div className=" my-5  flex items-center gap-4">
            <button
              onClick={() => setCurrentPage("My Mentors")}
              className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                currentPage === "My Mentors"
                  ? "bg-[#3E4DAC] text-white"
                  : "bg-white border-2 border-gray-400 text-black"
              }`}
            >
              My Mentors
            </button>
            <button
              onClick={() => setCurrentPage("Add Mentors")}
              className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                currentPage === "Add Mentors"
                  ? "bg-[#3E4DAC] text-white"
                  : "bg-white border-2 border-gray-400 text-black"
              }`}
            >
              Add Mentors
            </button>
          </div>
        </div>
        <div>
          {currentPage === "My Mentors" && <OrgMentors />}
          {currentPage === "Add Mentors" && <AddMentors />}
        </div>
      </Layout>
    </div>
  );
}
