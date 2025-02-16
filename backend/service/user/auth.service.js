import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/user.js"

const login = async (phone, password) => {
  const user = await User.findOne({ phone })
  if (!user) {
    console.log("User not found:", phone)
    return { success: false, message: "User not found" }
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    console.log("Invalid password for:", phone)
    return { success: false, message: "Invalid credentials" }
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

  console.log("Login successful for:", phone)
  return {
    success: true,
    token,
    user: { id: user._id, phone: user.phone },
  }
}

const signup = async (phone, password) => {
  const existingUser = await User.findOne({ phone })
  if (existingUser) {
    return { success: false, message: "Phone number already in use" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ phone, password: hashedPassword })
  await newUser.save()

  return { success: true }
}

export default {
  login,
  signup,
}

