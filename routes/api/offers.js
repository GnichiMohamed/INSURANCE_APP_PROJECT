const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Offer = require("../../models/Offer");
const User = require("../../models/User");

// @route   Get api/offers/me
// @descr   Get current users offer
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const offer = await Offer.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!offer) {
      return res.status(400).json({ msg: "There is no offer for this user" });
    }

    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/offers
// @descr   Create or Update a user offer
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("location", "location is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),

      check("from", "from is required").not().isEmpty(),
      check("to", "to is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, price, from, to, description } = req.body;
    // Build offer object
    const offerFields = {};
    offerFields.user = req.user.id;
    if (title) offerFields.title = title;
    if (company) offerFields.company = company;
    if (location) offerFields.location = location;
    if (price) offerFields.price = price;

    if (from) offerFields.from = from;
    if (to) offerFields.to = to;
    if (description) offerFields.description = description;

    try {
      let offer = await Offer.findOne({ user: req.user.id });

      if (offer) {
        // Update
        offer = await Offer.findOneAndUpdate(
          { user: req.user.id },
          { $set: offerFields },
          { new: true }
        );

        return res.json(offer);
      }

      // Create
      offer = new Offer(offerFields);

      await offer.save();
      res.json(offer);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/offers
// @descr   Get all offers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().populate("user", ["name", "avatar"]);
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/user/:user_id
// @descr   Get offers by user ID
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const offer = await Offer.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!offer) return res.status(400).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Offer not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/user/:user_id
// @descr   Get offers by user ID ***Public***
// @access  Public
router.get("/user_public/:user_id", async (req, res) => {
  try {
    const offer = await Offer.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!offer) return res.status(400).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Offer not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/offer/:offer_id
// @descr   Get single offer by ID
// @access  Private
router.get("/offer/:offer_id", auth, async (req, res) => {
  try {
    const offer = await Offer.findOne({
      _id: req.params.offer_id,
    });

    if (!offer) return res.status(400).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Offer not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/offer-view/:offer_id
// @descr   Get single offer by ID View
// @access  Private
router.get("/offer-view/:offer_id", auth, async (req, res) => {
  try {
    const offer = await Offer.findOne({
      _id: req.params.offer_id,
    });

    if (!offer) return res.status(400).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Offer not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/offers/offerPublic/:offer_id
// @descr   Get single offer by ID  ***Public***
// @access  Public
router.get("/offerPublic/:offer_id", async (req, res) => {
  try {
    const offer = await Offer.findOne({
      _id: req.params.offer_id,
    });

    if (!offer) return res.status(400).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Offer not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/offers/:offer_id
// @descr   Delete an offer
// @access  Private
router.delete("/:offer_id", auth, async (req, res) => {
  try {
    // Remove offer
    await Offer.findOneAndRemove({ _id: req.params.offer_id });

    res.json({ msg: "Offer deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// CRUD

// @route   POST api/offers
// @descr   Create an offer
// @access  Private
router.post(
  "/add_offer",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("location", "location is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),

      check("from", "from is required").not().isEmpty(),
      check("to", "to is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, price, from, to, description, blockchain_id } = req.body;
    // Build offer object
    const offerFields = {};
    offerFields.user = req.user.id;
    if (title) offerFields.title = title;
    if (company) offerFields.company = company;
    if (location) offerFields.location = location;
    if (price) offerFields.price = price;
    if (from) offerFields.from = from;
    if (to) offerFields.to = to;
    if (description) offerFields.description = description;
    if (blockchain_id) offerFields.blockchain_id = blockchain_id;

    try {
      // Create
      offer = new Offer(offerFields);

      await offer.save();
      res.json(offer);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/offers/edit-offer/:id
// @descr   Edit an offer
// @access  Private
router.put(
  "/edit-offer/:id",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("location", "location is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
      check("to", "to is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, price, from, to, description } = req.body;
    // Build offer object
    const offerFields = {};
    offerFields.user = req.user.id;
    if (title) offerFields.title = title;
    if (company) offerFields.company = company;
    if (location) offerFields.location = location;
    if (price) offerFields.price = price;
    if (from) offerFields.from = from;
    if (to) offerFields.to = to;
    if (description) offerFields.description = description;

    // Grab the id of the offer
    let id = await req.params.id;

    // Find the Offer By ID from the database
    Offer.findById(id)
      .then((offerFields) => {
        offerFields.title = title;
        offerFields.company = company;
        offerFields.location = location;
        offerFields.price = price;
        offerFields.from = from;
        offerFields.to = to;
        offerFields.description = description;
        offerFields
          .save()
          .then((offerFields) => {
            res.send({
              message: "Offer updated successfully",
              status: "success",
            });
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }
);

module.exports = router;
