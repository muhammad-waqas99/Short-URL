const express = require('express');
const router = express.Router();
const URL = require('../model/url');
const { restrictTo } = require('../middlewares/auth');


router.get('/admin/urls',restrictTo(["ADMIN"]),async (req , res)=>{

  try {

  
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Error loading home page");
  }

})
router.get('/',restrictTo(["NORMAL","ADMIN"]), async (req, res) => {

  try {

    const{id,error}  =req.query
  
    const allUrls = await URL.find({createdBy :req.user._id});
    return res.render('home', { urls: allUrls  , id: id || null ,error });
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
router.get('/logout', (req,res)=>{
         try {

    res.clearCookie("tokenCookie", {
      httpOnly: true,
      secure: false, 
    });

   
    return res.redirect("/login");
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).send("Internal Server Error during logout");
  }
})
module.exports = router;
