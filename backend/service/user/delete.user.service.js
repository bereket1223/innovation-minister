import User from "../../models/user.js";

export default async (userId) => {
  return await User.findByIdAndDelete(userId);
};
