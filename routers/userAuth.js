const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const isAuthValid = require("../middlewares/checkIsAuthValid");
const {
  registerUser,
  loginUser,
  getUser,
  getMe,
  loadCurrentUser,
  forgetPassword,
  resetPassword,
  activationEmail,
} = require("../controllers/userController");

router.get("/currentUser", isAuthValid, loadCurrentUser);

router.get("/me", isAuthValid, getMe);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forget_password", forgetPassword);

router.post("/reset_pass/:urlParameter", resetPassword);

router.post("/activate_email", activationEmail);

module.exports = router;
