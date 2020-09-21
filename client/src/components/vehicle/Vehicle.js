import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteVehicle } from "../../actions/vehicle";
import { connect } from "react-redux";

const Vehicle = ({
  vehicle: {
    // user: { _id, name, avatar },

    // title,
    // company,
    // location,
    // the fuction fetch api
    vehicles,
  },
  deleteVehicle,
}) => {
  const vehicle = vehicles.map((v, index) => (
    <tr key={v._id}>
      <th scope="row">{index + 1}</th>

      <td>{v.new_value}</td>
      <td>{v.actual_value}</td>
      <td>{v.power}</td>
      <td>
        <Link
          to={`/api/vehicles/vehicle-view/${v._id}`}
          className="btn btn-primary mr-2"
        >
          View
        </Link>
        <Link
          to={`/api/vehicles/edit-vehicle/${v._id}`}
          className="btn btn-outline-primary mr-2"
        >
          Edit
        </Link>
        <button onClick={() => deleteVehicle(v._id)} className="btn btn-danger">
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
          <th scope="col">New Value</th>
          <th scope="col">Actual Value</th>
          <th scope="col">Power</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody> {vehicle}</tbody>
    </table>
  );
};

Vehicle.propTypes = {
  vehicle: PropTypes.object.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
  editVehicle: PropTypes.func.isRequired,
};

export default connect(null, { deleteVehicle })(Vehicle);
