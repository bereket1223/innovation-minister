import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export default async (userId, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};
