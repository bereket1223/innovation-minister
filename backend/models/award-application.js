import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  cityWoreda: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fieldStudy: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    enum: ['High School', 'Undergraduate', 'Postgraduate', 'Other'],
    required: true
  },
  workplace: {
    type: String,
    required: true
  },
  jobResponsibility: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  titleOfProject: {
    type: String,
    required: true
  },
  descriptionOfSupportRequest: {
    type: String,
    required: true
  },
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
  totalBudgetRequired: {
    type: Number,
    required: true
  },
  fileUpload: {
    type: String, // Store the URL or path of the uploaded file
    required: false
  }
});

// Create the model
const Request = mongoose.model('Request', requestSchema);

export default Request;
