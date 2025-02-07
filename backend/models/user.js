import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
     type: String,
      required: true
     },
  email: {
     type: String,
      required: true, 
      unique: true 
    },
  phone: { 
    type: String,
     required: true 
    },
  password: { 
    type: String, 
    required: true
 },
  profilePhoto: {
     type: String,
      required: false
     },
}, 
{ 
    timestamps: true
 });

const User = mongoose.model('User', UserSchema);

export default User;
