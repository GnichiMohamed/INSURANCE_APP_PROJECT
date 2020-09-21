import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVehicle } from "../../actions/vehicle";

const AddVehicle = ({ addVehicle, history }) => {
  const [formData, setFormData] = useState({
    new_value: "",
    actual_value: "",
    date_first_circulation: "",
    brand: "",
    model: "",
    power: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    new_value,
    actual_value,
    date_first_circulation,
    brand,
    model,
    power,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Register your Vehicle</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add your vehicle to get the best
        offers
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addVehicle(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Vehicle New Value"
            name="new_value"
            value={new_value}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Vehicle Actual Value"
            name="actual_value"
            value={actual_value}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Date of First Circulation"
            name="date_first_circulation"
            value={date_first_circulation}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={brand}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Model"
            name="model"
            value={model}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <select name="power" value={power} onChange={(e) => onChange(e)}>
            <option value="0">* Select Power</option>
            <option value="2CV">2CV</option>
            <option value="3-4CV">3-4CV</option>
            <option value="5-6CV">5-6CV</option>
            <option value="7-10CV">7-10CV</option>
            <option value="11-14CV">11-14CV</option>
            <option value="15CVmore">15CVmore</option>
          </select>
          <small className="form-text">
            Give us an idea about the power of the vehicle
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddVehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired,
};

export default connect(null, { addVehicle })(withRouter(AddVehicle));
