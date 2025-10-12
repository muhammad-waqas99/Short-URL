const User = require('../model/user');
const { setUser } = require('../services/auth');


async function HandleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "User already registered. Please use a different email." });
    }


    await User.create({ name, email, password });

    return res.redirect('/login');
  } catch (err) {
    console.error(err);

    if(err.name === "ValidationError"){
      const firstError =Object.values(err.errors)[0].message
        return res.render('signup',{error :firstError})
    }

    if(err.code ===11000){
      return res.render('signup', {error :"Email Already Exist , Try Using Another One"})
    }

    return res.status(500).render("signup", { error: "Something went wrong. Please try again." });
  }
}


async function HandleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

  const token = setUser(user);

    res.cookie('tokenCookie', token, {
      httpOnly: true,
      secure: false, 
    });

    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.status(500).render("login", { error: "Something went wrong. Please try again." });
  }
}

module.exports = {
  HandleUserSignup,
  HandleUserLogin,
};
