import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false }, // Cloudinary Image URL
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
