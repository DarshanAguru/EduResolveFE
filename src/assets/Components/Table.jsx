/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
const Table = ({ users, type, refreshData }) => {
  const [status, setStatus] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  React.useEffect(() => {
    setStatus(users);
  }, [users]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "rejected") {
      const rej_users = users.filter(
        (user) => user.verificationStatus === "rejected"
      );
      setStatus(rej_users);
    } else if (value === "verified") {
      const ver_users = users.filter(
        (user) => user.verificationStatus === "verified"
      );
      setStatus(ver_users);
    } else if (value === "pending") {
      const pen_users = users.filter(
        (user) => user.verificationStatus === "pending"
      );
      setStatus(pen_users);
    } else {
      setStatus(users);
    }
  };
  return (
    <div className=" overflow-x-auto m-10 shadow-md sm:rounded-lg">
      <FormInput
        label="Gender"
        id="gender"
        type="select"
        options={["verified", "pending", "rejected"]}
        required={true}
        is="dashboard"
        placeholder="all"
        onChange={handleChange}
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table Headings */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {/* Heading Columns */}
          <tr>
            <th scope="col" className="px-6 py-3">
              S.no
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              {(type === "mentors" || type === "teachers") &&
                "Subject Expertise"}
              {type === "org" && "Institution"}
              {type === "students" && "Grade"}
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {status.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th className="px-6 py-4">{index + 1}.</th>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-500">
                    {user.emailId}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                {type === "org" && user.institution}
                {type === "mentors" || type === "teachers" ? 
  user.subjectExpertise && Array.isArray(user.subjectExpertise) ? user.subjectExpertise.join(", ") : "No expertise provided"
: null}
                {type === "students" && user.grade}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${user.verificationStatus === "verified" ? "bg-green-500" : user.verificationStatus === "pending" ? "bg-amber-300" : "bg-red-500"} me-2`}
                  ></div>{" "}
                  {user.verificationStatus}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleViewUser(user)}
                >
                  View user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        type={type}
        refreshUsers={refreshData}
      />
    </div>
  );
};

export default Table;
