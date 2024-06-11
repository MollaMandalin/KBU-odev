const express = require("express")

const router = express.Router()

const { register, update, login, deleteUser } = require("./auth.js")

const {adminAuth} = require("../middleware/auth.js")

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth,update);
router.route("/delete").delete(adminAuth, deleteUser);

module.exports = router