import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_VEHICLE,
  VEHICLE_ERROR,
  UPDATE_VEHICLE,
  DELETE_VEHICLE,
  GET_VEHICLES,
  CLEAR_VEHICLE,
  GET_SINGLE_VEHICLE,
  GET_SIMULATION,
} from "./types";

// Add a vehicle
export const addVehicle = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/vehicles/add_vehicle", formData, config);

    dispatch({
      type: ADD_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert("Vehicle Added", "success"));

    history.push("/dashboard-client");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

// Update a vehicle

export const editVehicle = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/vehicles/edit-vehicle/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert("Vehicle Updated", "success"));

    history.push("/dashboard-client");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

// Delete vehicle
export const deleteVehicle = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/vehicles/${id}`);

    dispatch({
      type: DELETE_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert("Vehicle Removed", "success"));
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

// Get vehicles by user ID
export const getVehiclesById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_VEHICLE });
  try {
    const res = await axios.get(`/api/vehicles/user/${userId}`);
    // console.log(res.data);
    dispatch({
      type: GET_VEHICLES,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single vehicle by ID
export const getSingleVehicleByIdView = (vehicleId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/vehicles/vehicle-view/${vehicleId}`);

    dispatch({
      type: GET_SINGLE_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single vehicle by ID
export const getSingleVehicleById = (vehicleId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/vehicles/vehicle/${vehicleId}`);

    dispatch({
      type: GET_SINGLE_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get simulation by vehicle ID
export const getSimulationByVehicleId = (vehicleId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/vehicles/simulation/${vehicleId}`);

    dispatch({
      type: GET_SIMULATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
