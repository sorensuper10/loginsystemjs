const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware til at parse request body og håndtere sessions
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
    secret: "hemmeligNøgle",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Forbind til MongoDB
mongoose.connect("mongodb://localhost:27017/loginDBs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Forbundet til MongoDB");
}).catch(err => {
    console.log("Fejl i forbindelsen: ", err);
});

// Brug ruterne fra authRoutes
app.use(authRoutes);

// Velkomstside
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    res.render("dashboard", { username: req.session.username });
});

// Start serveren
app.listen(3000, () => {
    console.log("Serveren kører på http://localhost:3000");
});
