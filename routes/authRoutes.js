// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Login-side og handling
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", authController.login);

// Registreringsside og handling
router.get("/register", authController.register);
router.post("/register", authController.postCreateUser);

// Log ud
router.get("/logout", authController.logout);

// GET - Vis formularen til at oprette en bruger
router.get("/create-user", authController.getCreateUser);

// POST - Håndter oprettelse af bruger
router.post("/create-user", authController.postCreateUser);

module.exports = router;
