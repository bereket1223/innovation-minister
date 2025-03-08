import Department from "../../models/department.js"
import { ApiError } from "../../utils/ApiError.js"
import fs from "fs"

export const createDepartment = async (departmentData) => {
  try {
    // Create new department document
    const department = await Department.create(departmentData)

    // Return created department without sensitive information
    return department
  } catch (error) {
    console.error("Error in createDepartment service:", error)

    // Handle duplicate key error (e.g., if email already exists)
    if (error.code === 11000) {
      throw new ApiError(409, "Department with this information already exists")
    }

    throw new ApiError(500, "Something went wrong while creating department")
  }
}

export const getDepartmentById = async (id) => {
  try {
    const department = await Department.findById(id)
    return department
  } catch (error) {
    console.error("Error in getDepartmentById service:", error)
    throw new ApiError(500, "Something went wrong while retrieving department")
  }
}

export const getAllDepartments = async () => {
  try {
    const departments = await Department.find({})
    return departments
  } catch (error) {
    console.error("Error in getAllDepartments service:", error)
    throw new ApiError(500, "Something went wrong while retrieving departments")
  }
}

export const getDepartmentsByType = async (departmentType) => {
  try {
    const departments = await Department.find({ knowledgeDepartment: departmentType })
    return departments
  } catch (error) {
    console.error("Error in getDepartmentsByType service:", error)
    throw new ApiError(500, "Something went wrong while retrieving departments by type")
  }
}

export const deleteDepartment = async (id) => {
  try {
    // Find department first to get file path
    const department = await Department.findById(id)

    if (!department) {
      return null
    }

    // Delete the file if it exists
    if (department.documentPath) {
      try {
        fs.unlinkSync(department.documentPath)
      } catch (fileError) {
        console.error("Error deleting file:", fileError)
        // Continue with department deletion even if file deletion fails
      }
    }

    // Delete the department
    const deletedDepartment = await Department.findByIdAndDelete(id)
    return deletedDepartment
  } catch (error) {
    console.error("Error in deleteDepartment service:", error)
    throw new ApiError(500, "Something went wrong while deleting department")
  }
}

export const approveDepartment = async (id) => {
  try {
    const approvedDepartment = await Department.findByIdAndUpdate(id, { status: "approved" }, { new: true })

    return approvedDepartment
  } catch (error) {
    console.error("Error in approveDepartment service:", error)
    throw new ApiError(500, "Something went wrong while approving department")
  }
}

