const Quote = require("../models/quoteModel")


const home = async (req, res, next) => {
    try {
      const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
      res.render("home", { quotes: randomQuote[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const login = (req, res, next) => {
    res.render('login');
}

const logout = (req, res, next) => {
    res.render('logout');
}

const signup = (req, res, next) => {
    res.render('signup');
}

const userHome = async (req, res) =>{
    const {username} = req.params;

    try{
        const quote = await Quote.find({ creator: username}).sort({createdAt: -1})
        res.render("userHome", { quote, username})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const ifHome = (req, res, next) =>{
    const searchedUsername = req.params.username;
    const loggedInUser = res.locals.user.email;


    if(searchedUsername === loggedInUser){
        next();
    }else{
        res.redirect("/")
    }

}

const hjelp = (req, res, next)=>{
    res.render("hjelp")
}

module.exports = {login, logout, signup, home, ifHome, userHome, hjelp}