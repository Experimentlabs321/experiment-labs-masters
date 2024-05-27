import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OrgMentors() {
  const { userInfo } = useContext(AuthContext);
  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        console.log(response?.data.reverse());
        setAllMentors(response?.data.reverse());
        setFilteredMentors(response?.data.reverse());
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  return (
    <div className="px-4">
      <div>
        <input
          onChange={(e) => {
            setFilteredMentors(
              allMentors?.filter((student) => {
                return Object.keys(student).some((key) =>
                  student[key]
                    ?.toString()
                    .toLowerCase()
                    .includes(e.target.value.toString().toLowerCase())
                );
              })
            );
          }}
          name="Search"
          placeholder="Search"
          className="block w-full px-4 py-2 mt-2 mb-4 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div style={{ height: "70vh" }} className="overflow-x-auto">
        <table className="min-w-full font-sans bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="py-3 px-6 border-b text-left">Name</th>
              <th className="py-3 px-6 border-b text-left">Email</th>
              <th className="py-3 px-6 border-b text-left">Phone</th>
              <th className="py-3 px-6 border-b text-left">Joining Date</th>
              <th className="py-3 px-6 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredMentors &&
              filteredMentors[0] &&
              filteredMentors?.reverse()?.map((mentor, index) => {
                const formattedDate = new Date(
                  mentor?.dateCreated
                )?.toLocaleDateString();

                return (
                  <tr
                    key={mentor?._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6 border-b text-left">
                      <Link to={`/profile/${mentor?.email}`}>
                        {mentor?.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      <Link to={`/profile/${mentor?.email}`}>
                        {mentor?.email}
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      <Link to={`/profile/${mentor?.email}`}>
                        {mentor?.phone}
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      <Link to={`/profile/${mentor?.email}`}>
                        {formattedDate}
                      </Link>
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      <Link to={`/profile/${mentor?.email}`}>
                        {mentor?.role}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
