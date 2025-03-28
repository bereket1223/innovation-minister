import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      
      trim: true,
    },
    gender: {
      type: String,
      
      enum: ["male", "female"],
    },
    age: {
      type: Number,
      
    },
    nationality: {
      type: String,
      
    },
    region: {
      type: String,
      
    },
    zone: {
      type: String,
      
    },
    woreda: {
      type: String,
      
    },
    kebele: {
      type: String,
      
    },
    email: {
      type: String,
      
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      
    },

    // Affiliation Details (Optional)
    institution: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    institutionAddress: {
      type: String,
      trim: true,
    },

    // Education & Qualifications (Optional)
    highestDegree: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    completionYear: {
      type: String,
    },
    specialization: {
      type: String,
      trim: true,
    },

    // Indigenous Knowledge Information
    knowledgeTitle: {
      type: String,
      
      trim: true,
    },
    knowledgeDepartment: {
      type: String,
      
      enum: ["Indigenous Research", "Indigenous Technology", "Indigenous Innovation"],
    },
    subCategory: {
      type: String,
      
      trim: true,
    },
    otherSubCategory: {
      type: String,
      trim: true,
    },
    interestAreas: {
      type: String,
      
      trim: true,
    },

    documentPath: {
      type: String,
      
    },
    fileUrl: {
      type: String,
      
    },

    // Agreement
    agreement: {
      type: Boolean,
      
      default: false,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
)

const Department = mongoose.model("Department", departmentSchema)

export default Department

