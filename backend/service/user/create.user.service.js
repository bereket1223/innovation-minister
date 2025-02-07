import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export default async (userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  const user = new User(userData);
  return await user.save();
};
