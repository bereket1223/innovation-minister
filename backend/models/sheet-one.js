import mongoose from "mongoose"

const sheetOneSchema = new mongoose.Schema(
  {
    hostOrganization: {
      type: String,
    },
    yearEstablished: {
      type: String,
    
    },
    projectTitle: {
      type: String,
      
    },
    founderName: {
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
  
    },
    phoneNumber: {
      type: String,

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

