import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String,  required: true },
  age: { type: Number, required: true  },
  country: { type: String,  required: true },
  nationality: { type: String, required: true  },
  region: { type: String,   required: true},
  zone: { type: String,   required: true},
  woreda: { type: String,   required: true},
  kebele: { type: String,  required: true },
  emailOrPhone: { type: String,  required: true },
  department: { type: String,  required: true },
  categories: { type: String,   required: true}, // Array of categories
  title: { type: String,   required: true},
  patent: { type: String,  required: true }, // Patent can be optional
  description: { type: String,  },
  fileUrl: { type: String,  required: true }, // File URL for uploaded docs/images
}, { timestamps: true });

const Department = mongoose.model('Department', DepartmentSchema);

export default Department;
