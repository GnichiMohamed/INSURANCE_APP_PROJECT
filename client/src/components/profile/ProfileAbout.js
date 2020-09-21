import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    phone,
    about,
    user: { name },
  },
}) => (
  <div className="profile-about bg-light p-2">
    {phone && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(" ")[0]}'s Phone</h2>
        <p>{phone}</p>
        <div className="line"></div>
      </Fragment>
    )}

    <h2 className="text-primary">About Company</h2>
    {about && (
      <Fragment>
        <p>{about}</p>
        {/* <div className="line"></div> */}
      </Fragment>
    )}
  </div>
);
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
