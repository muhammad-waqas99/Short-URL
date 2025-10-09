const express =require("express")
const path =require("path")
const app =express()
const connectToMongodb =require('./connect')
const urlRoute=require('./routes/url')
const staticRouter =require('./routes/staticRouter')
const userRoute =require('./routes/user')
const URL =require('./model/url')
const {restrictToLoggedInUser, checkAuth} = require('./middlewares/auth')
const cookieParser =require('cookie-parser')
const PORT = 8001

connectToMongodb("mongodb://localhost:27017/short-url")


app.set('view engine', 'ejs');
app.set('views', path.resolve(('./views')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/url",restrictToLoggedInUser,urlRoute)
app.use('/' , staticRouter)
app.use('/user',checkAuth ,userRoute)


app.get("/url/:shortId" ,async (req,res)=>{
  const shortId =req.params.shortId

  const entry = await URL.findOneAndUpdate({
    shortId
},{ $push : {
    visitHistory:{timestamp:Date.now()}
}})

res.redirect(entry.redirectURL)
})


app.listen(PORT , ()=> console.log(`Server is started at PORT : ${PORT}`))
