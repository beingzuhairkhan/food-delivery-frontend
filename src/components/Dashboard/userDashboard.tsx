import React from "react";
// import Navbar from "../Layout/userNavbar";
import RestaurantNavbar from "../Layout/restaurantNavbar";
import OwnerDashboard from "./ownerDashboard";
import UserNavbar from '../Layout/userNavbar'
import Category from "../User/Category";
import Shop from "../User/Shop";
import SuggestedItems from "../User/SuggestedItems";
const UserDashboard: React.FC = () => {

  return (
    <div>
      <UserNavbar />
      <Category/>
      <Shop/>
      <SuggestedItems/>
    </div>
  );
};

export default UserDashboard;
