import express from "express";
import { registerUser, loginUser } from "../services/user.service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const registerIt = await registerUser(username, email, password);

    res.status(201).json({
      message: "Register success",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY" && error.message.includes("email")) {
      return res.status(400).json({
        message: "Email already registered. Use another email!",
        error: error.message,
      });
    } else if (
      error.code === "ER_DUP_ENTRY" &&
      error.message.includes("username")
    ) {
      return res.status(400).json({
        message: "Username already registered. Use another username!",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "failed to register, something went wrong on the server",
        error: error.message,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const letsLogin = await loginUser(username, password);

    res.status(200).json({
      message: "Login successful",
      user: letsLogin,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to login, something went wrong on the server",
      error: error.message,
    });
  }
});

export default router;
