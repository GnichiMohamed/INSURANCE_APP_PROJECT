import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSingleVehicleByIdView } from "../../actions/vehicle";

const ViewVehicle = ({
  getSingleVehicleByIdView,
  vehicle: { vehicle, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getSingleVehicleByIdView(match.params.id);
  }, [getSingleVehicleByIdView, match.params.id]);

  //   console.log("vehicle", vehicle.actual_value);

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m8">
          <h3 className="text-primary">Vehicle Information:</h3>
          <div className="card story">
            <div className="card-content">
              <span className="card-title text-primary">
                Vehicle New Value:
              </span>{" "}
              {vehicle && vehicle.new_value}
              <div className="card-content">
                <span className="card-title text-primary">
                  Vehicle Actual Value:{" "}
                </span>{" "}
                {vehicle && vehicle.actual_value}
              </div>
              <div className="card-content">
                <span className="card-title text-primary">
                  Date Of First Circulation:
                </span>{" "}
                <Moment format="YYYY/MM/DD">
                  {vehicle && vehicle.date_first_circulation}
                </Moment>
              </div>
              <div className="card-content">
                <span className="card-title text-primary">Brand:</span>{" "}
                {vehicle && vehicle.brand}
              </div>
              <div className="card-content">
                <span className="card-title text-primary">Vehcile Model:</span>{" "}
                {vehicle && vehicle.model}
              </div>
              <div className="card-content">
                <span className="card-title text-primary">Vehicle Power:</span>{" "}
                {vehicle && vehicle.power}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/dashboard-client"
        className="btn btn-default mr-2 btn-lg float-right"
      >
        Return to Dashboard
      </Link>
      <Link
        to={`/api/vehicles/simulation/${vehicle && vehicle._id}`}
        className="btn btn-primary mr-2 btn-lg float-right"
      >
        Get Simulation
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

ViewVehicle.propTypes = {
  getSingleVehicleByIdView: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.vehicle,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSingleVehicleByIdView })(
  ViewVehicle
);
