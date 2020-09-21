import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_OFFER,
  DELETE_OFFER,
  OFFER_ERROR,
  GET_OFFERS,
  CLEAR_OFFER,
  ADD_OFFER,
  UPDATE_OFFER,
  GET_SINGLE_OFFER,
  SEARCH_OFFER,
  CLEAR_SEARCH,
} from "./types";

// Get current users offer
export const getCurrentOffer = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/offers/me");

    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all offers
export const getOffers = () => async (dispatch) => {
  dispatch({ type: CLEAR_OFFER });
  try {
    const res = await axios.get("/api/offers");

    dispatch({
      type: GET_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get offers by user ID
export const getOfferById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_OFFER });
  try {
    const res = await axios.get(`/api/offers/user/${userId}`);
    dispatch({
      type: GET_OFFERS,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get offers by user ID ***Public***
export const getOfferByIdPublic = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_OFFER });
  try {
    const res = await axios.get(`/api/offers/user_public/${userId}`);
    dispatch({
      type: GET_OFFERS,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single offer by ID
export const getSingleOfferById = (offerId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/offer/${offerId}`);

    dispatch({
      type: GET_SINGLE_OFFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single offer by ID  ***Public***
export const getSingleOfferByIdPublic = (offerId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/offerPublic/${offerId}`);

    dispatch({
      type: GET_SINGLE_OFFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single offer by ID
export const getSingleOfferByIdView = (offerId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/offer-view/${offerId}`);

    dispatch({
      type: GET_SINGLE_OFFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add an offer
export const addOffer = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/offers/add_offer", formData, config);

    dispatch({
      type: ADD_OFFER,
      payload: res.data,
    });

    dispatch(setAlert("Offer Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update an offer

export const editOffer = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/offers/edit-offer/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_OFFER,
      payload: res.data,
    });

    dispatch(setAlert("Offer Updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete offer
export const deleteOffer = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/offers/${id}`);

    dispatch({
      type: DELETE_OFFER,
      payload: res.data,
    });

    dispatch(setAlert("Offer Removed", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Search Offer

// export const searchOffer = (text) => async (dispatch) => {
//   dispatch({
//     type: SEARCH_OFFER,
//     payload: text,
//   });
// };

// export const clearSearch = () => (dispatch) => {
//   dispatch({
//     type: CLEAR_SEARCH,
//   });
// };
