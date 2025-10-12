const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function HandleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;

    if (!body.url) {
      return res.status(400).render("home", { error: "URL is required" });
    }
     const existingURL = await URL.findOne({ redirectURL: body.url, createdBy: req.user._id });
    if (existingURL) {
      return res.redirect(`/?id=${existingURL.shortId}&error=URL+already+exists`);
    }

    const shortID = nanoid(8);

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });


    return res.redirect(`/?id=${shortID}`);
  } catch (err) {
    console.error(err);

 
if (err.name === "ValidationError") {
    const firstError = Object.values(err.errors)[0].message;
    return res.redirect(`/?error=${encodeURIComponent(firstError)}`);
  }

  if (err.code === 11000) {
    return res.redirect(`/?error=${encodeURIComponent("This short URL already exists.")}`);
  }

 
  return res.redirect(`/?error=${encodeURIComponent("Something went wrong. Please try again.")}`);
}
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
