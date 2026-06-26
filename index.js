const express =require("express")

const dotenv =require('dotenv')
dotenv.config()
const path =require("path")
const app =express()
const connectToMongodb =require('./connect')
const urlRoute=require('./routes/url')
const staticRouter =require('./routes/staticRouter')
const userRoute =require('./routes/user')
const URL =require('./model/url')
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const cookieParser =require('cookie-parser')
const PORT = process.env.PORT || 8001
const dns = require('dns');
dns.setServers(['1.1.1.1','8.8.8.8'])

connectToMongodb(process.env.mongo_URI)
.then(()=>{
  console.log("MongoDB Connected")
})
.catch((err)=>{
  console.log("MongoDB Error : ");
  console.log(err)
})


app.set('view engine', 'ejs');
app.set('views', path.resolve(('./views')))
  
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url",restrictTo(['NORMAL','ADMIN']),urlRoute)
app.use('/' , staticRouter)
app.use('/user' ,userRoute)


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
