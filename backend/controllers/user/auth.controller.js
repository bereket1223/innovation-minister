import { login } from "../../service/user/auth.service.js";

const loginController = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const result = await login(phoneNumber, password); // Use login function directly

    if (result.success) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json({ message: "Login successful", user: result.user });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    console.error("Login error:", error); // Log error details
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default loginController;
