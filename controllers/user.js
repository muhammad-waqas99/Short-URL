const User =require('../model/user')
const {v4 :uuidv4} =require('uuid')
const {setUser} =require('../services/auth')

async function HandleUserSignup(req,res){
     const {name , email , password} =req.body
     await User.create({
        name:name,
        email:email,
        password:password,
        
     })
     return res.redirect('/')
}
async function HandleUserLogin(req,res){
     const { email , password} =req.body
     const user = await User.findOne({
        email,
        password,
     })

     if(!user){
        return res.render("home", {
            error : "invalid user name and password "
        })
     }



   const token =setUser(user)
res.cookie('uid', token, {
  httpOnly: true,
  secure: false, 
});
   

     return res.redirect('/')
}

module.exports ={
    HandleUserSignup,
    HandleUserLogin
}