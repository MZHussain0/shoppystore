import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/profile/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <Navbar>
      <h1 className="text-2xl font-bold text-center">My Orders</h1>
      <UserOrders />
    </Navbar>
  );
};

export default UserOrdersPage;
