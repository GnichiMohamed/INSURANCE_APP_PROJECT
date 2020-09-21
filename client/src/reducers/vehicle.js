import {
  ADD_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE,
  VEHICLE_ERROR,
  GET_VEHICLES,
  CLEAR_VEHICLE,
  GET_SINGLE_VEHICLE,
  GET_SIMULATION,
} from "../actions/types";

const initialState = {
  vehicle: {}, // instead of null, error: vehicle is undefined !!
  vehicles: [],
  loading: true,
  error: {},
  offer_simulation: {},
  // search: null,
  // text: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //   case GET_VEHICLE:
    case ADD_VEHICLE:
    case DELETE_VEHICLE:
    case UPDATE_VEHICLE:
    case GET_SINGLE_VEHICLE:
      return {
        ...state,
        vehicle: payload,
        loading: false,
      };
    case GET_SIMULATION:
      return {
        ...state,
        offer_simulation: payload,
        loading: false,
      };
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: payload,
        loading: false,
      };

    case VEHICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_VEHICLE:
      return {
        ...state,
        vehicle: null,
        loading: false,
      };
    //   case SEARCH_VEHICLE:
    //     return {
    //       ...state,
    //       // search: state.offers.filter((offer) => offer.name.match(reg)),
    //       text: payload,
    //       loading: false,
    //     };
    // case CLEAR_SEARCH:
    //   return {
    //     ...state,
    //     search: null,
    //   };
    default:
      return state;
  }
}
