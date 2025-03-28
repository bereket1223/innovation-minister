import mongoose from "mongoose"

const sheetTwoSchema = new mongoose.Schema(
  {
    hostOrganization: {
      type: String,
    
    },
    companyName: {
      type: String,
 
    },
    yearEstablished: {
      type: String,
   
    },
    contactPersonName: {
      type: String,
  
    },
    gender: {
      type: String,
      enum: ["male", "female"],

    },
    regionCity: {
      type: String,
 
    },
    sector: {
      type: String,

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

    },
    email: {
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

const SheetTwo = mongoose.models.SheetTwo || mongoose.model("SheetTwo", sheetTwoSchema)

export default SheetTwo

