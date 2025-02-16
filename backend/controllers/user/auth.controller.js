import authService from "../../service/user/auth.service.js"

const login = async (req, res) => {
  try {
    const { phone, password } = req.body
    console.log("Login attempt:", { phone, password: "******" })

    const result = await authService.login(phone, password)

    if (result.success) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      console.log("Login successful for:", phone)
      res.status(200).json({ message: "Login successful", user: result.user })
    } else {
      console.log("Login failed for:", phone, "Reason:", result.message)
      res.status(401).json({ message: result.message })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export default login