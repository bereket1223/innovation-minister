import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/user.js"

export const login = async (phoneNumber, password) => {
  const user = await User.findOne({ phoneNumber })
  if (!user) {
    return { success: false, message: "User not found" }
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return { success: false, message: "Invalid credentials" }
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

  return {
    success: true,
    token,
    user: { id: user._id, phoneNumber: user.phoneNumber },
  }
}



