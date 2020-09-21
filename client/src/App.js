import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddOffer from "./components/offer/AddOffer";
import EditOffer from "./components/offer/EditOffer";
import ViewOffer from "./components/offer/ViewOffer";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Offers from "./components/dashboard/Offers";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
// Client
import Dashboard_Client from "./components/dashboard/Dashboard_Client";
import AddVehicle from "./components/vehicle/AddVehicle";
import EditVehicle from "./components/vehicle/EditVehicle";
import ViewVehicle from "./components/vehicle/ViewVehicle";
import ViewOfferPublic from "./components/offer/ViewOfferPublic";
import GetSimulation from "./components/simulation/GetSimulation";
// Private Route
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// Blockchain
import Test from "./components/blockchain/Test";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/user/:id" component={Profile} />
              <Route exact path="/offers" component={Offers} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute exact path="/add-offer" component={AddOffer} />
              <PrivateRoute
                exact
                path="/api/offers/edit-offer/:id"
                component={EditOffer}
              />
              <PrivateRoute
                exact
                path="/api/offers/offer-view/:id"
                component={ViewOffer}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
              {/* Client */}
              <PrivateRoute
                exact
                path="/dashboard-client"
                component={Dashboard_Client}
              />
              <PrivateRoute exact path="/add-vehicle" component={AddVehicle} />
              <Route
                exact
                path="/api/offers/offerPublic/:id"
                component={ViewOfferPublic}
              />
              <PrivateRoute
                exact
                path="/api/vehicles/vehicle-view/:id"
                component={ViewVehicle}
              />
              <PrivateRoute
                exact
                path="/api/vehicles/edit-vehicle/:id"
                component={EditVehicle}
              />
              <PrivateRoute
                exact
                path="/api/vehicles/simulation/:id"
                component={GetSimulation}
              />
              {/* Blockchain */}
              <Route exact path="/testBlockChain" component={Test} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
