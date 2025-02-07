import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
   // required: true
 },
  gender:{
     type: String, 
     enum: ['Male', 'Female'],
     // required: true
     },
  age:{ 
    type: Number,
    // required: true
     },
  country: { 
    type: String,
     //required: true 
    },
  nationality: { 
    type: String, 
    //required: true
 },
  region: { 
    type: String,
   //  required: true
     },
  zone: { 
    type: String,
     //required: true
     },
  woreda: {
     type: String, 
    // required: true 
    },
  kebele: {
     type: String,
     // required: true 
    },
  email: { 
    type: String, 
   // required: true, 
   // unique: true 
},
  phone: { 
    type: String, 
    //required: true
 },
  department: { 
    type: String,
     //required: true
     },
  categories: {
     type: String,
    //  required: true 
    },
  title: {
     type: String, 
     //required: true 
    },
  patent: { 
    type: String, 
    enum: ['Yes', 'No'], 
  //  required: true
 },
  description: {
     type: String,
     // required: true
     },
  file: {
     type: String,
      required: false
     },
},
 { 
    timestamps: true

});

const User = mongoose.model('department', UserSchema);

export default User;
