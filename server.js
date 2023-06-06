require("dotenv").config()


const mongoose = require("mongoose")


const express = require("express")


const cookieParser = require("cookie-parser")


const userRoutes = require("./routes/userRoutes")
const basicRoutes = require("./routes/basicRoutes")
const quoteRoutes = require("./routes/quoteSchema")
const { checkUser } = require("./middleware/reqAuth")

const app = express()


//view engine 
app.set('view engine', 'ejs'); //There are several types of view engines that you can use, ejs is a popular choice.
app.use(express.urlencoded({extended:true}));
app.use(express.static("public")); //public folders
app.use(cookieParser())

app.use(express.json());    
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.get("*", checkUser)

app.use("/api/user", userRoutes)

app.use(basicRoutes)
app.use(userRoutes)
app.use(quoteRoutes)

//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log("listening on port: " + process.env.PORT)
        })
    })
    .catch(error => console.log(error))