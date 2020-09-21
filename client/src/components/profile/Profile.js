import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileOffer from "./ProfileOffer";
import { getProfileById } from "../../actions/profile";
import { getOfferByIdPublic } from "../../actions/offer";

const Profile = ({
  getProfileById,
  getOfferByIdPublic,
  profile: { profile, loading },
  auth,
  match,
  offer,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getOfferByIdPublic(match.params.id);
  }, [getProfileById, getOfferByIdPublic, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <div>
            {offer !== null || loading === false ? (
              <Fragment>
                <ProfileOffer offer={offer} />
              </Fragment>
            ) : (
              <h4>No offer credentials</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getOfferByIdPublic: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth, // To have the edit-profile button
  offer: state.offer,
});

export default connect(mapStateToProps, { getProfileById, getOfferByIdPublic })(
  Profile
);
