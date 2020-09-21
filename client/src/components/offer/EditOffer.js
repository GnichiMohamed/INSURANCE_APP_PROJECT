import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editOffer, getSingleOfferById } from "../../actions/offer";

const EditOffer = ({
  offer: { loading },
  getSingleOfferById,
  editOffer,
  history,
  match,
  offer,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    price: "",
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  useEffect(() => {
    getSingleOfferById(match.params.id);

    setFormData({
      title: loading || !offer.title ? "" : offer.title,
      company: loading || !offer.company ? "" : offer.company,
      location: loading || !offer.location ? "" : offer.location,
      from: loading || !offer.from ? "" : offer.from,
      to: loading || !offer.to ? "" : offer.to,
      price: loading || !offer.price ? "" : offer.price,
      description: loading || !offer.description ? "" : offer.description,
    });
  }, [loading, getSingleOfferById, match.params.id]);

  const { company, title, location, from, to, price, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editOffer(match.params.id, formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Offer</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Edit Offer
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Offer Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Offer Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditOffer.propTypes = {
  getSingleOfferById: PropTypes.func.isRequired,
  editOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { editOffer, getSingleOfferById })(
  withRouter(EditOffer)
);
