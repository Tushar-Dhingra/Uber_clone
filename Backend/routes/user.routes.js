const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .notEmpty()
      .withMessage("Last name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.post("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
