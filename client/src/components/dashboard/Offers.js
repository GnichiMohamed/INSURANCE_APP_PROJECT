import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import OfferItem from "./OfferItem";
import Search from "./Search";
import { getOffers } from "../../actions/offer";

const Offers = ({ getOffers, offer: { offers, loading } }) => {
  // const state = {
  //   search: "",
  // };

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getOffers();
    // const fetchItems = async () => {
    //   let result = offers;
    //   console.log(result);
    //   setItems(result);
    // };
    // fetchItems();
  }, []);

  // const { search } = this.state;
  // const [setState] = useState([]);

  // const onChange = (e) => {
  //   this.setState({ search: e.target.value });
  // };

  // const filteredOffers = offers.filter((offer) => {
  //   return offer.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  // });

  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    // getQuery(q);
  };

  const offersList = offers;
  // const { text } = setText;
  const filteredOffers = offersList.filter((offer) => {
    return offer.title.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  });

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Offers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Available Offers
          </p>
          {/* <Search getQuery={(q) => setQuery(q)} /> */}
          <input
            type="text"
            className="form-control"
            placeholder="Search Offers"
            value={text}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />{" "}
          <br />
          <section className="cards">
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <OfferItem key={offer._id} offer={offer} />
              ))
            ) : (
              <h4>No offers found...</h4>
            )}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Offers.propTypes = {
  getOffers: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { getOffers })(Offers);
