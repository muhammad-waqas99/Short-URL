const express =require("express")
const app =express()
const connectToMongodb =require('./connect')
const urlRoute=require('./routes/url')
const URL =require('./model/url')
const PORT = 8001

connectToMongodb("mongodb://localhost:27017/short-url")

app.use(express.json())

app.use("/url",urlRoute)

app.get("/:shortId" ,async (req,res)=>{
  const shortId =req.params.shortId

  const entry = await URL.findOneAndUpdate({
    shortId
},{ $push : {
    visitHistory:{timestamp:Date.now()}
}})

res.redirect(entry.redirectURL)
})


app.listen(PORT , ()=> console.log(`Server is started at PORT : ${PORT}`))
