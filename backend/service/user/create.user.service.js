import User from "../../models/user.js"
import bcrypt from "bcrypt"
export const createUser = async (userData) => {
  const { fullName, email, phone, password, profilePictureUrl } = userData

  // Check if user already exists by email or phone
  const existingUserByEmail = await User.findOne({ email })
  if (existingUserByEmail) {
    throw new Error("User with this email already exists")
  }

  const existingUserByPhone = await User.findOne({ phone })
  if (existingUserByPhone) {
    throw new Error("User with this phone number already exists")
  }

  // Hash the password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // Create new user
  const newUser = new User({
    fullName,
    email,
    phone,
    password: hashedPassword,
    profilePictureUrl,
  })

  return newUser.save()
}
