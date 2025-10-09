const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function HandleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ Error: "URL is required" });
  }

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
   createdBy: req.user._id,
  });
// console.log("User from middleware:", req.user);

  return res.render('home', { id: shortID });
}

async function HandleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  res.json({
    TotalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  HandleGenerateNewShortURL,
  HandleGetAnalytics,
};
