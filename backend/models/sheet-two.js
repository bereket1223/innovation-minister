import mongoose from "mongoose"

const sheetTwoSchema = new mongoose.Schema(
  {
    hostOrganization: {
      type: String,
      required: [true, "Host organization is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    yearEstablished: {
      type: String,
      required: [true, "Year of establishment is required"],
    },
    contactPersonName: {
      type: String,
      required: [true, "Contact person name is required"],
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
    associationMemberFemale: {
      type: Number,
      default: 0,
    },
    associationMemberMale: {
      type: Number,
      default: 0,
    },
    associationMemberTotal: {
      type: Number,
      default: 0,
    },
    isPrivate: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    productionPerWeek: {
      type: String,
    },
    prototype: {
      type: String,
    },
    ipr: {
      type: String,
    },
    challenges: {
      type: String,
    },
    recommendations: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
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

const SheetTwo = mongoose.models.SheetTwo || mongoose.model("SheetTwo", sheetTwoSchema)

export default SheetTwo

