import React, { useState } from "react";
// import { connect } from "react-redux";

// import { searchOffer } from "../../actions/offer";

const Search = ({ getQuery }) => {
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search Offers"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
        {/* <button type="submit" className="btn btn-primary btn-bg mt-3">
          Search
        </button> */}
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  text: state.text,
  //   search: state.search,
});

export default Search;
