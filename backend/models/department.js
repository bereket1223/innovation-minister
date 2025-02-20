import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  age : { type: String, required: true },
  nationality: { type: String, required: true },
  region: { type: String, required: true },
  zone: { type: String, required: true },
  woreda: { type: String, required: true },
  kebele: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  institution: { type: String },
  department: { type: String },
  designation: { type: String },
  institutionAddress: { type: String },
  highestDegree: { type: String },
  university: { type: String },
  completionYear: { type: String },
  specialization: { type: String },
  knowledgeTitle: { type: String, required: true },
  knowledgeDepartment: { type: String, required: true },
  subCategory: { type: String, required: true },
  otherSubCategory: { type: String },
  interestAreas: { type: String, required: true },
  fileUrl: { type: String, required: true },
  agreement: { type: Boolean, required: true },
}, { timestamps: true });

const Department = mongoose.model('Department', DepartmentSchema);

export default Department;