import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSingleOfferByIdPublic } from "../../actions/offer";

const ViewOfferPublic = ({
  getSingleOfferByIdPublic,
  offer: { offer, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getSingleOfferByIdPublic(match.params.id);
  }, [getSingleOfferByIdPublic, match.params.id]);

  //   console.log("offer", offer);

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m8">
          <h3>Offer Title: {offer && offer.title}</h3>
          <div className="card story">
            <div className="card-content">
              <p>Company: {offer && offer.company}</p>
              <p>Location: {offer && offer.location}</p>
              <span className="card-title">From: {offer && offer.from}</span> -
              To: {offer && offer.to}
              <p>Price: {offer && offer.price}</p>
              <p>Description: {offer && offer.description}</p>
            </div>
          </div>
        </div>
      </div>

      <Link to="/profiles" className="btn btn-default mr-2 btn-lg float-right">
        Return to Insurances
      </Link>

      <Link to="#!" className="btn btn-primary mr-2 btn-lg float-right">
        Subscribe
      </Link>

      {/* <div className="card">
        <h5 className="card-header">{offer.title}</h5>
        <div className="card-body">
          <h5 className="card-title">{offer.company}</h5>
          <p className="card-text">{offer.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div> */}
    </Fragment>
  );
};

ViewOfferPublic.propTypes = {
  getSingleOfferByIdPublic: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSingleOfferByIdPublic })(
  ViewOfferPublic
);
