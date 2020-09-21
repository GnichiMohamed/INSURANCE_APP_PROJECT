import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addOffer } from "../../actions/offer";

//
import Web3 from "web3";
import Marketplace from "../blockchain/Marketplace.json";

const AddOffer = ({ addOffer, history }) => {
  useEffect(() => {
    //
    loadWeb3();
    loadBlockchainData();

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
      console.log("account", accounts[0]);
      setFormData({ blockchain_id: accounts.length + 1 });

      setFormData({ account: accounts[0] });


      // console.log("accounts", accounts);
      localStorage.setItem("account", accounts[0]);
      // this.setState({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = Marketplace.networks[networkId];
      if (networkData) {
        const marketplace = new web3.eth.Contract(
          Marketplace.abi,
          networkData.address
        );
        console.log("marketplace", marketplace);

        setFormData({ marketplace })
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

  }, [])





  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    price: "",
    description: "",
    blockchain_id: 0,
    account: "",
    marketplace: null
  });

  //
  const [Data, setData] = useState({
    productName: "",
    productPrice: 0
  })
  const { productName, productPrice } = Data;

  // loadWeb3();
  // loadBlockchainData();

  // create product
  function createProduct(name, price) {
    // this.setState({ loading: true });
    const web3 = window.web3;
    // const networkId = web3.eth.net.getId();
    // const networkData = Marketplace.networks[networkId];


    const { account } = formData;
    console.log("account", account);


    formData.marketplace.methods
      .createProduct(name, price)
      .send({ from: localStorage.getItem("account") })
      .once("receipt", (receipt) => {
      });

  }
  const [toDateDisabled, toggleDisabled] = useState(false);


  const { company, title, location, from, to, price, description, blockchain_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addOffer({ ...formData, blockchain_id }, history);

    // const price = window.web3.utils.toWei(productPrice.value.toString(), 'Ether')
    createProduct(title, price);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Offer</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any offer that you want to
        share
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            // ref={(input) => { productName = input }}
            placeholder="* Offer Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            // ref={(input) => { productPrice = input }}
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div> */}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Offer Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddOffer.propTypes = {
  addOffer: PropTypes.func.isRequired,
};

export default connect(null, { addOffer })(withRouter(AddOffer));
