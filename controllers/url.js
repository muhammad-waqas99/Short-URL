const {nanoid } =require("nanoid")
const URL =require('../model/url')

async function HandleGenerateNewShortURL(req, res) {
    const body =req.body 

    if(!body.url){
        return res.status(400).json({Error : "url is required"})
    }
    const shortID = nanoid(8)
    const URL =require("../model/url")

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })

    return res.json({id:shortID})
}

async function HandleGetAnalytics(req, res) {
    const shortId =req.params.shortId;
    const result = await URL.findOne({shortId})

    res.json({TotalClicks :result.visitHistory.length  , analytics :result.visitHistory})
}
module.exports={
    HandleGenerateNewShortURL,
    HandleGetAnalytics,
}