const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Vehicle = require("../../models/Vehicle");
const Offer = require("../../models/Offer");
const User = require("../../models/User");

// @route   GET api/vehicles/user/:user_id
// @descr   Get vehicles by user ID
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!vehicle) return res.status(400).json({ msg: "Vehicle not found" });

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Vehicle not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/vehicles/vehicle-view/:vehicle_id
// @descr   Get single vehicle by ID View
// @access  Private
router.get("/vehicle-view/:vehicle_id", auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicle_id,
    });

    if (!vehicle) return res.status(400).json({ msg: "Vehicle not found" });

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Vehicle not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/vehicles/vehicle/:vehicle_id
// @descr   Get single vehicle by ID
// @access  Private
router.get("/vehicle/:vehicle_id", auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicle_id,
    });

    if (!vehicle) return res.status(400).json({ msg: "Vehicle not found" });

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Vehicle not found" });
    }
    res.status(500).send("Server Error");
  }
});

// CRUD

// @route   POST api/vehicles
// @descr   Create a Vehicle
// @access  Private
router.post(
  "/add_vehicle",
  [
    auth,
    [
      check("new_value", "new_value is required").not().isEmpty(),
      check("actual_value", "actual_value is required").not().isEmpty(),
      check("date_first_circulation", "date_first_circulation is required")
        .not()
        .isEmpty(),
      check("brand", "brand is required").not().isEmpty(),
      check("model", "model is required").not().isEmpty(),
      check("power", "power is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      new_value,
      actual_value,
      date_first_circulation,
      brand,
      model,
      power,
    } = req.body;
    // Build vehicle object
    const vehicleFields = {};
    vehicleFields.user = req.user.id;
    if (new_value) vehicleFields.new_value = new_value;
    if (actual_value) vehicleFields.actual_value = actual_value;
    if (date_first_circulation)
      vehicleFields.date_first_circulation = date_first_circulation;
    if (brand) vehicleFields.brand = brand;
    if (model) vehicleFields.model = model;
    if (power) vehicleFields.power = power;

    try {
      // Create
      vehicle = new Vehicle(vehicleFields);

      await vehicle.save();
      res.json(vehicle);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/vehicles/edit-vehicle/:id
// @descr   Edit a vehicle
// @access  Private
router.put(
  "/edit-vehicle/:id",
  [
    auth,
    [
      check("new_value", "new_value is required").not().isEmpty(),
      check("actual_value", "actual_value is required").not().isEmpty(),
      check("date_first_circulation", "date_first_circulation is required")
        .not()
        .isEmpty(),
      check("brand", "brand is required").not().isEmpty(),
      check("model", "model is required").not().isEmpty(),
      check("power", "power is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      new_value,
      actual_value,
      date_first_circulation,
      brand,
      model,
      power,
    } = req.body;
    // Build vehicle object
    const vehicleFields = {};
    vehicleFields.user = req.user.id;
    if (new_value) vehicleFields.new_value = new_value;
    if (actual_value) vehicleFields.actual_value = actual_value;
    if (date_first_circulation)
      vehicleFields.date_first_circulation = date_first_circulation;
    if (brand) vehicleFields.brand = brand;
    if (model) vehicleFields.model = model;
    if (power) vehicleFields.power = power;

    // Grab the id of the vehicle
    let id = await req.params.id;

    // Find the Vehicle By ID from the database
    Vehicle.findById(id)
      .then((vehicleFields) => {
        vehicleFields.new_value = new_value;
        vehicleFields.actual_value = actual_value;
        vehicleFields.date_first_circulation = date_first_circulation;
        vehicleFields.brand = brand;
        vehicleFields.model = model;
        vehicleFields.power = power;
        vehicleFields
          .save()
          .then((vehicleFields) => {
            res.send({
              message: "Vehicle updated successfully",
              status: "success",
            });
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }
);

// @route   DELETE api/vehicles/:vehicle_id
// @descr   Delete a vehicle
// @access  Private
router.delete("/:vehicle_id", auth, async (req, res) => {
  try {
    // Remove vehicle
    await Vehicle.findOneAndRemove({ _id: req.params.vehicle_id });

    res.json({ msg: "Vehicle deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/vehicles/simulation/:vehicle_id
// @descr   Get Simulation by vehicle ID
// @access  Private

router.get("/simulation/:vehicle_id", auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicle_id,
    });

    if (!vehicle) return res.status(400).json({ msg: "Vehicle not found" });

    //   res.json(vehicle);

    if (vehicle) {
      v = vehicle.actual_value;
    }

    // Get all the offers
    let offers = await Offer.find().populate("user", ["name", "avatar"]);
    let prices_offers_array = [];
    for (let i = 0; i < offers.length; i++) {
      prices_offers_array.push(offers[i].price);
      // console.log(prices_offers_array);
    }

    let offers_prices = prices_offers_array;
    // console.log(offers_prices);
    vehicle_actual_value = v;

    // Trial
    var min = Math.min();
    var result = 0;
    let index = 0;
    for (i = 0; i < offers_prices.length; i++) {
      let absVal = Math.abs(vehicle_actual_value - offers_prices[i]);
      if (min > absVal) {
        index = i;
        min = absVal;
        result = offers_prices[i];
      }
    }
    // res.json(result);
    res.json(offers[index]);

    // var closest = offers_prices.reduce(function (prev, curr) {
    //   return Math.abs(curr - vehicle_actual_value) <
    //     Math.abs(prev - vehicle_actual_value)
    //     ? curr
    //     : prev;
    // });

    // res.json(closest);
    // console.log(vehicle_actual_value);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Vehicle not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
