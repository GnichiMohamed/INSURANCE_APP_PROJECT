import {
  GET_OFFER,
  OFFER_ERROR,
  DELETE_OFFER,
  GET_OFFERS,
  CLEAR_OFFER,
  ADD_OFFER,
  SEARCH_OFFER,
  UPDATE_OFFER,
  GET_SINGLE_OFFER,
  // CLEAR_SEARCH,
} from "../actions/types";

const initialState = {
  offer: {}, // instead of null, error: offer is undefined !!
  offers: [],
  loading: true,
  error: {},
  search: null,
  text: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OFFER:
    case ADD_OFFER:
    case DELETE_OFFER:
    case UPDATE_OFFER:
    case GET_SINGLE_OFFER:
      return {
        ...state,
        offer: payload,
        loading: false,
      };
    case GET_OFFERS:
      return {
        ...state,
        offers: payload,
        loading: false,
      };
    case OFFER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_OFFER:
      return {
        ...state,
        offer: null,
        loading: false,
      };
    case SEARCH_OFFER:
      return {
        ...state,
        // search: state.offers.filter((offer) => offer.name.match(reg)),
        text: payload,
        loading: false,
      };
    // case CLEAR_SEARCH:
    //   return {
    //     ...state,
    //     search: null,
    //   };
    default:
      return state;
  }
}
