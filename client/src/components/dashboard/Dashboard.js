import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Offer from "./Offer";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getOfferById } from "../../actions/offer";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  getOfferById,
  match,
  offer: { offers },
  offer,
}) => {
  useEffect(() => {
    getCurrentProfile();
    if (user) getOfferById(user._id);
  }, [getCurrentProfile, getOfferById, user]);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className="profiles">
            {offers.length > 0 ? (
              <Offer key={offers._id} offer={offer} />
            ) : (
              <h4>No offers found...</h4>
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getOfferById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  offer: state.offer,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getOfferById,
})(Dashboard);
