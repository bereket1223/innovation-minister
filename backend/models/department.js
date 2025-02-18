import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String,  },
  age: { type: Number,  },
  country: { type: String,  },
  nationality: { type: String,  },
  region: { type: String,  },
  zone: { type: String,  },
  woreda: { type: String,  },
  kebele: { type: String,  },
  emailOrPhone: { type: String,  },
  department: { type: String,  },
  categories: { type: String,  }, // Array of categories
  title: { type: String,  },
  patent: { type: String, required: false }, // Patent can be optional
  description: { type: String,  },
  fileUrl: { type: String, required: false }, // File URL for uploaded docs/images
}, { timestamps: true });

const Department = mongoose.model('Department', DepartmentSchema);

export default Department;
