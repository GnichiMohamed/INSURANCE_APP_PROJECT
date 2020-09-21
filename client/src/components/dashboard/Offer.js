import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteOffer, editOffer } from "../../actions/offer";
import { connect } from "react-redux";

const Offer = ({
  offer: {
    // user: { _id, name, avatar },

    // title,
    // company,
    // location,
    offers,
  },
  deleteOffer,
}) => {
  const offer = offers.map((off, index) => (
    <tr key={off._id}>
      <th scope="row">{index + 1}</th>

      <td>{off.title}</td>
      <td>{off.company}</td>
      <td>{off.location}</td>
      <td>
        <Link
          to={`/api/offers/offer-view/${off._id}`}
          className="btn btn-primary mr-2"
        >
          View
        </Link>
        <Link
          to={`/api/offers/edit-offer/${off._id}`}
          className="btn btn-outline-primary mr-2"
        >
          Edit
        </Link>
        <button onClick={() => deleteOffer(off._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    // <div className="profile bg-light">
    //   <img src={avatar} alt="" className="round-img" />
    //   <div>
    //     <h2>{name}</h2>
    //     <p>
    //       {title} {company && <span> company name: {company}</span>}
    //     </p>
    //     <p className="my-1">{location && <span>{location}</span>}</p>
    //     <Link to={`/profile/user/${_id}`} className="btn btn-primary">
    //       View Profile
    //     </Link>
    //   </div>
    // </div>

    // Show in Table

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
  );
};

Offer.propTypes = {
  offer: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
  editOffer: PropTypes.func.isRequired,
};

export default connect(null, { deleteOffer, editOffer })(Offer);
