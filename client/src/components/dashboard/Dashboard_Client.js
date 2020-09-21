import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import Vehicle from "../vehicle/Vehicle";
import DashboardActions_Client from "./DashboardActions_Client";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getVehiclesById } from "../../actions/vehicle";

const Dashboard_Client = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  getVehiclesById,
  match,
  vehicle: { vehicles },
  vehicle,
}) => {
  useEffect(() => {
    getCurrentProfile();
    if (user) getVehiclesById(user._id);
  }, [getCurrentProfile, getVehiclesById, user]);
  // console.log(vehicle);
  // console.log(vehicles);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Client Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions_Client />

          <div className="profiles">
            {vehicles.length > 0 ? (
              <Vehicle key={vehicles._id} vehicle={vehicle} />
            ) : (
              <h4>No vehicles found...</h4>
            )}
          </div>

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard_Client.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getVehiclesById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  vehicle: state.vehicle,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getVehiclesById,
})(Dashboard_Client);
