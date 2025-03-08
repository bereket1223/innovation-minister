import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    age: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    woreda: {
      type: String,
      required: true,
    },
    kebele: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },
    knowledgeDepartment: {
      type: String,
      required: true,
      enum: ["Indigenous Research", "Indigenous Technology", "Indigenous Innovation"],
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
    },
    otherSubCategory: {
      type: String,
      trim: true,
    },
    interestAreas: {
      type: String,
      required: true,
      trim: true,
    },

    // Document path and URL
    documentPath: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },

    // Agreement
    agreement: {
      type: Boolean,
      required: true,
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

