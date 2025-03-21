import mongoose from "mongoose"

const sheetOneSchema = new mongoose.Schema(
  {
    hostOrganization: {
      type: String,
      required: [true, "Host organization is required"],
    },
    yearEstablished: {
      type: String,
      required: [true, "Year of establishment is required"],
    },
    projectTitle: {
      type: String,
      required: [true, "Project title is required"],
    },
    founderName: {
      type: String,
      required: [true, "Founder name is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    regionCity: {
      type: String,
      required: [true, "Region and city are required"],
    },
    sector: {
      type: String,
      required: [true, "Sector is required"],
    },
    association: {
      type: String,
    },
    isPrivate: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    improvedTechnology: {
      type: String,
    },
    prototype: {
      type: String,
    },
    hasIp: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    challenges: {
      type: String,
    },
    recommendations: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    contactPerson: {
      type: String,
    },
    remark: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

const SheetOne = mongoose.models.SheetOne || mongoose.model("SheetOne", sheetOneSchema)

export default SheetOne

