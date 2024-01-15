const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is require" });

  const shortID = shortid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
  res.json({ id: shortID });
}

async function handleGetShortURLDetails(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    //update
    {
      $push: {
        visitHistory: { timestamp: Date.now() }, //obj
      },
    }
  );

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetShortURLDetails,
  handleGetAnalytics,
};
