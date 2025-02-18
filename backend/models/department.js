import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true
 },
  gender:{
     type: String, 
     enum: ['Male', 'Female'],
     //
     },
  age:{ 
    type: Number,
   //
     },
  country: { 
    type: String,
    // 
    },
  nationality: { 
    type: String, 
   //
 },
  region: { 
    type: String,
   //
     },
  zone: { 
    type: String,
    //
     },
  woreda: {
     type: String, 
    // 
    },
  kebele: {
     type: String,
    // 
    },
  email: { 
    type: String, 
  //, 
 
},
  phone: { 
    type: String, 
   //
 },
  department: { 
    type: String,
    //
     },
  categories: {
     type: String,
  // 
    },
  title: {
     type: String, 
   // 
    },
  patent: { 
    type: String, 
    enum: ['Yes', 'No'], 
 //
 },
  description: {
     type: String,
   //
     },
  file: {
     type: String,
      required: false
     },
},
 { 
    timestamps: true

});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
