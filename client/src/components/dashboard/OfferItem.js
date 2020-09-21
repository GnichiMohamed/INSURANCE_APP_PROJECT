import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./sheett.css";

const OfferItem = ({
  offer: {
    user: { name, avatar },
    _id,
    title,
    company,
    location,
    description,
  },
}) => {
  return (
    <Link to={`/api/offers/offerPublic/${_id}`} className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={avatar} alt="" />
        </div>
        <div className="card-back">
          <h1>{name}</h1>
          <ul>
            <li>
              <strong>Title:</strong> {title}
            </li>
            <li>
              <strong>Company:</strong> {company}
            </li>
            <li>
              <strong>Location:</strong> {location}
            </li>

            <li>
              <strong>Description:</strong> {description}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default OfferItem;
