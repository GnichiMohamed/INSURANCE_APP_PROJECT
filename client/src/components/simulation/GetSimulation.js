import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSimulationByVehicleId } from "../../actions/vehicle";

// import "./shett1.css";

const GetSimulation = ({
  getSimulationByVehicleId,
  vehicle,
  vehicle: {
    offer_simulation: { user },
  },
  auth,
  match,
}) => {
  useEffect(() => {
    getSimulationByVehicleId(match.params.id);
  }, [getSimulationByVehicleId, match.params.id]);

  //   console.log("offer_simulation", vehicle.offer_simulation.user);

  return (
    <section className="cards">
      <h3 className="text-primary">This is the most relevant offer:</h3>
      <h5></h5>
      <h5></h5>
      <h5></h5>
      <Link
        to={`/api/offers/offerPublic/${vehicle.offer_simulation._id}`}
        className="card"
      >
        <div className="card-inner">
          <div className="card-front">
            <img src={user && user.avatar} alt="" />
          </div>
          <div className="card-back">
            <h1>{user && user.name}</h1>
            <ul>
              <li>
                <strong>Title:</strong>{" "}
                {vehicle && vehicle.offer_simulation.title}
              </li>
              <li>
                <strong>Company:</strong>{" "}
                {vehicle && vehicle.offer_simulation.company}
              </li>
              <li>
                <strong>Location:</strong>{" "}
                {vehicle && vehicle.offer_simulation.location}
              </li>

              <li>
                <strong>Description:</strong>{" "}
                {vehicle && vehicle.offer_simulation.description}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </section>
  );
};

GetSimulation.propTypes = {
  getSimulationByVehicleId: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
  offer_simulation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.vehicle,
  offer_simulation: state.offer_simulation,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSimulationByVehicleId })(
  GetSimulation
);
