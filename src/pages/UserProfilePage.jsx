import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/profile/components/UserProfile";

const UserProfilePage = () => {
  return (
    <Navbar>
      <h1 className="text-xl font-bold text-center text-indigo-500">
        My Profile
      </h1>
      <UserProfile />
    </Navbar>
  );
};

export default UserProfilePage;
