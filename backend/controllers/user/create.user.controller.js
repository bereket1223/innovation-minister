import { createUser } from "../../service/user/create.user.service.js"
import cloudinary from "../../utils/cloudinary.js"

const createUserController = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body
    let profilePictureUrl = ""

    // Handle file upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
      })
      profilePictureUrl = result.secure_url
    }

    // Create user
    const user = await createUser({
      fullName,
      email,
      phone,
      password,
      profilePictureUrl,
    })

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePictureUrl: user.profilePictureUrl,
      },
    })
  } catch (error) {
    if (
      error.message === "User with this email already exists" ||
      error.message === "User with this phone number already exists"
    ) {
      res.status(409).json({ message: error.message })
    } else {
      res.status(400).json({ message: "An error occurred during sign up" })
    }
  }
}

export default createUserController

