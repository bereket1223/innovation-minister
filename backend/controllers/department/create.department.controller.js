import  createDepartment  from "../../service/department/create.department.service.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

 const createDepartmentController = async (req, res) => {
  try {
    // Get file path if uploaded
    const filePath = req.file ? req.file.path : null

    // Combine form data with file path
    const departmentData = {
      ...req.body,
      documentPath: filePath,
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

export default createDepartmentController 