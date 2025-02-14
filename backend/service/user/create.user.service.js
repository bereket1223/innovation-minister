import User from "../../models/User.js";
import bcrypt from "bcrypt";

const createUserService = async ({ fullName, email, phone, password, profilePicture }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    phone,
    password: hashedPassword,
    profilePicture, // Store Cloudinary URL
  });

  await user.save();
  return user;
};

export default createUserService;
