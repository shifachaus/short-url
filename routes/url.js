const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetShortURLDetails,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetShortURLDetails);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
