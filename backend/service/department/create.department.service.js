import Department from "../../models/department.js"

export const createDepartment = async (departmentData) => {
  try {
    const { email, phoneNumber, knowledgeTitle, fileUrl } = departmentData

    // Check if required fields are present
    if (!email || !phoneNumber || !knowledgeTitle) {
      throw new Error("Email, phone number, and knowledge title are required.")
    }

    // Validate fileUrl if present
    if (fileUrl) {
      if (!fileUrl.startsWith("https://res.cloudinary.com/") || !fileUrl.endsWith(".pdf")) {
        throw new Error("Invalid file URL. Must be a Cloudinary URL ending with .pdf")
      }
    }

    const existingDepartment = await Department.findOne({
      $or: [{ email }, { phoneNumber }],
      knowledgeTitle,
    })

    if (existingDepartment) {
      throw new Error("A department with this email/phone and knowledge title already exists.")
    }

    // Create and save the new department
    const department = new Department(departmentData)
    await department.save()

    return department
  } catch (error) {
    console.error("Error in createDepartment service:", error.message)
    throw new Error("Failed to create department: " + error.message)
  }
}

