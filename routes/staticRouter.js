const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/', async (req, res) => {
  try {
   console.log("👉 req.user:", req.user);
    // if(!req.user) return res.redirect('/login')
  
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Error loading home page");
  }


});

router.get("/signup" ,(req,res)=>{
  return res.render("signup")
})

router.get('/login', (req,res)=>{
    res.render('login')
})
module.exports = router;
