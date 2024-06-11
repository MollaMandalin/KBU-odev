const express = require("express");
const connectDB = require("./config/db.js");

const cookieParser = require("cookie-parser")

const {adminAuth, userAuth} = require("./middleware/auth.js")

connectDB();

const app = express();

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', require("./auth/Route.js"))



app.get("/", (req,res) => res.render("home"))
app.get("/register", (req,res) => res.render("register"))
app.get("/login", (req,res) => res.render("login"))
app.get("/admin", adminAuth, (req,res) => res.render("admin"))
app.get("/user", userAuth, (req,res) => res.render("user"))


const server = app.listen(3000, () => { console.log("Sever 3000 portundan dinleniyor") });


process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})