import Department from "../../models/department.js";
import { ApiError } from "../../utils/ApiError.js";

const createDepartment = async (departmentData) => {
  try {
    const department = await Department.create(departmentData);
    return department;
  } catch (error) {
    console.error("Error in createDepartment service:", error);
    if (error.code === 11000) {
      throw new ApiError(409, "Department with this information already exists");
    }
    throw new ApiError(500, "Something went wrong while creating department");
  }
};

const getDepartmentById = async (id) => {
  try {
    const department = await Department.findById(id);
    return department;
  } catch (error) {
    console.error("Error in getDepartmentById service:", error);
    throw new ApiError(500, "Something went wrong while retrieving department");
  }
};

const getAllDepartments = async () => {
  try {
    const departments = await Department.find({});
    return departments;
  } catch (error) {
    console.error("Error in getAllDepartments service:", error);
    throw new ApiError(500, "Something went wrong while retrieving departments");
  }
};

export { createDepartment, getDepartmentById, getAllDepartments };
export default createDepartment; // ✅ Now you can use default import
