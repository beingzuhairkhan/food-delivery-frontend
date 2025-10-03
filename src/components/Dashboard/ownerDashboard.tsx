import React from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi'; // Using react-icons for knife icon
import RestaurantNavbar from '../Layout/restaurantNavbar';
import ShopData from '../Restaurant/ShopData';

const OwnerDashboard = () => {


  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantNavbar />
      <ShopData/>
    
    </div>
  );
};

export default OwnerDashboard;
