import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getOfferById } from "../../actions/offer";
import { connect } from "react-redux";

const ProfileOffer = ({
  offer: { offers },
  offer: { company, title, location, current, to, from, description },
}) => {
  if (offers) {
    const offer = offers.map((off, index) => (
      <tr key={off._id}>
        <th scope="row">{index + 1}</th>

        <td>{off.title}</td>
        <td>{off.company}</td>
        <td>{off.location}</td>
        <td>
          <Link
            to={`/api/offers/offerPublic/${off._id}`}
            className="btn btn-primary mr-2"
          >
            <i className="fas fa-arrow-cirlcle-right"></i>
            Details
          </Link>
          {/* <Link
            to={`/api/offers/offer/${off._id}`}
            className="btn btn-outline-primary mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteOffer(off._id)}
            className="btn btn-danger"
          >
            Delete
          </button> */}
        </td>
      </tr>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-car" /> Offers
            </h2>
          </div>
          <div className="col-md-6" />
        </div>

        <table className="table border show">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Company</th>
              <th scope="col">Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> {offer}</tbody>
        </table>

        {/* <table className="table table-striped">
          <thead className="thead-universe">
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>{company}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Link
                    // to={`/profile/${profile._id}/${offer._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-arrow-cirlcle-right"></i> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

ProfileOffer.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default ProfileOffer;
