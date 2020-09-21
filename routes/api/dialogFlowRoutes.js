const express = require("express");
const router = express.Router();

//
const dialogFlow = require("dialogflow");
const config = require("../../config/keys");

const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

// @route
// @descr
// @access
router.get("/", async (req, res) => {
  res.send({ hello: "Johnny" });
});

router.post("/api/df_text_query", async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };

  let responses = await sessionClient.detectIntent(request);

  res.send(responses[0].queryResult);
});

router.get("/api/df_event_query", async (req, res) => {
  res.send({ hello: "event query" });
});

module.exports = router;
