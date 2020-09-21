import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSingleOfferByIdView } from "../../actions/offer";

//
//
import Web3 from "web3";
import Marketplace from "../blockchain/Marketplace.json";

const ViewOffer = ({
  getSingleOfferByIdView,
  offer: { offer },
  auth,
  match,
}) => {
  const [formData, setFormData] = useState({
    account: "",
    productCount: 0,
    products: [],
    // loading: true,
  });

  const { account, productCount, products, loading } = formData;
  async function purchaseProduct(id, price) {
    console.log(id, price);
    const web3 = window.web3;
    // this.setState({ loading: true });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    const accounts = await web3.eth.getAccounts();

    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      marketplace.methods
        .purchaseProduct(id)
        .send({ from: accounts[0], value: price })
        .once("receipt", (receipt) => {
          // this.setState({ loading: false });
        });
    }
  }
  // setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getSingleOfferByIdView(match.params.id);
    //
    loadWeb3();
    loadBlockchainData();

    // create product
    function createProduct(name, price) {
      // this.setState({ loading: true });
      this.state.marketplace.methods
        .createProduct(name, price)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          // this.setState({ loading: false });
        });
    }

    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }

    async function loadBlockchainData() {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);
      localStorage.setItem("account", accounts[0]);
      // this.setState({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = Marketplace.networks[networkId];
      if (networkData) {
        const marketplace = new web3.eth.Contract(
          Marketplace.abi,
          networkData.address
        );
        // this.setState({ marketplace });
        const productCount = await marketplace.methods.productCount().call();
        // console.log(productCount.toString());
        // store the product count
        // this.setState({ productCount });
        // we gonna fetch each product individually from the blockchain
        // loop through the products and load them onto react component
        // for (var i = 1; i <= productCount; i++) {
        //   const product = await marketplace.methods.products(i).call();
        //   this.setState({
        //     products: [...this.state.products, product],
        //   });
        // }
        // this.setState({ loading: false });
        // console.log(this.state.products);
      } else {
        window.alert("Marketplace contract not deployed to detected network.");
      }
    }
    //
  }, [getSingleOfferByIdView, match.params.id]);

  // console.log("offer.title", offer.title);

  // console.log("product", this.state.product);

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m8">
          <h3 className="card-content text-primary">
            Offer Title: {offer && offer.title}
          </h3>
          <div className="card story">
            <div className="card-content">
              <span className="card-title text-primary">Company: </span>
              {offer && offer.company}
              <div className="card-content">
                <span className="card-title text-primary">Location: </span>
                {offer && offer.location}
              </div>
              <div className="card-content">
                <span className="card-title text-primary">From:</span>
                <Moment format="YYYY/MM/DD">{offer && offer.from}</Moment>- To:{" "}
                <Moment format="YYYY/MM/DD">{offer && offer.to}</Moment>
              </div>

              <div className="card-content">
                <span className="card-title text-primary">Price:</span>
                {offer && offer.price}
              </div>

              <div className="card-content">
                <span className="card-title text-primary">Description:</span>
                {offer && offer.description}
              </div>
              <div className="card-content">
                <span className="card-title text-primary">Owner:</span>
                {localStorage.getItem("account")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/dashboard" className="btn btn-default mr-2 btn-lg float-right">
        Return to Dashboard
      </Link>
      {/* <Link to="#!" className="btn btn-primary mr-2 btn-lg float-right"> */}

      <button
        className="btn btn-primary mr-2 btn-lg float-right"
        // name={product.id}
        // value={product.price}th
        onClick={() => purchaseProduct(1, 1000000000000000000)}
      >
        Buy
      </button>
      {/* </Link> */}
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

ViewOffer.propTypes = {
  getSingleOfferByIdView: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSingleOfferByIdView })(ViewOffer);
