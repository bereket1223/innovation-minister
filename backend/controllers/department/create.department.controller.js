import {
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  getDepartmentsByType,
  deleteDepartment,
  approveDepartment,
} from "../../service/department/create.department.service.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

export const createDepartmentController = async (req, res) => {
  try {
    // Get file path if uploaded
    const filePath = req.file ? req.file.path : null

    // Create file URL for frontend access
    const fileUrl = filePath ? `${req.protocol}://${req.get("host")}/${filePath}` : null

    // Combine form data with file path and URL
    const departmentData = {
      ...req.body,
      documentPath: filePath,
      fileUrl: fileUrl,
      status: "pending", // Default status for new submissions
    }

    // Create department using service
    const department = await createDepartment(departmentData)

    // Return success response
    return res.status(201).json(new ApiResponse(201, department, "Department created successfully"))
  } catch (error) {
    console.error("Error in createDepartmentController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while creating department"))
  }
}

export const getDepartmentByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const department = await getDepartmentById(id)

    if (!department) {
      return res.status(404).json(new ApiError(404, "Department not found"))
    }

    return res.status(200).json(new ApiResponse(200, department, "Department retrieved successfully"))
  } catch (error) {
    console.error("Error in getDepartmentByIdController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while retrieving department"))
  }
}

export const getAllDepartmentsController = async (req, res) => {
  try {
    const departments = await getAllDepartments()

    return res.status(200).json(new ApiResponse(200, departments, "Departments retrieved successfully"))
  } catch (error) {
    console.error("Error in getAllDepartmentsController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while retrieving departments"))
  }
}

export const getDepartmentsByTypeController = async (req, res) => {
  try {
    const { type } = req.params

    // Convert URL parameter to proper department type
    let departmentType
    switch (type) {
      case "indigenous-innovation":
        departmentType = "Indigenous Innovation"
        break
      case "indigenous-research":
        departmentType = "Indigenous Research"
        break
      case "indigenous-technology":
        departmentType = "Indigenous Technology"
        break
      default:
        return res.status(400).json(new ApiError(400, "Invalid department type"))
    }

    const departments = await getDepartmentsByType(departmentType)

    return res
      .status(200)
      .json(new ApiResponse(200, departments, `${departmentType} departments retrieved successfully`))
  } catch (error) {
    console.error("Error in getDepartmentsByTypeController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while retrieving departments"))
  }
}

export const deleteDepartmentController = async (req, res) => {
  try {
    const { id } = req.params
    const deletedDepartment = await deleteDepartment(id)

    if (!deletedDepartment) {
      return res.status(404).json(new ApiError(404, "Department not found"))
    }

    return res.status(200).json(new ApiResponse(200, deletedDepartment, "Department deleted successfully"))
  } catch (error) {
    console.error("Error in deleteDepartmentController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while deleting department"))
  }
}

export const approveDepartmentController = async (req, res) => {
  try {
    const { id } = req.params
    const approvedDepartment = await approveDepartment(id)

    if (!approvedDepartment) {
      return res.status(404).json(new ApiError(404, "Department not found"))
    }

    return res.status(200).json(new ApiResponse(200, approvedDepartment, "Department approved successfully"))
  } catch (error) {
    console.error("Error in approveDepartmentController:", error)
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Something went wrong while approving department"))
  }
}

