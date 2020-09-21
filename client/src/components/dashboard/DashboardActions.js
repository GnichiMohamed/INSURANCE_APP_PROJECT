import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-offer" className="btn btn-light">
        <i className="fas fa-car text-primary"></i> Add Offer
      </Link>
    </div>
  );
};

export default DashboardActions;
