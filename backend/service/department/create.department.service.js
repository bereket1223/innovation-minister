import Department from '../../models/department.js';

export const createDepartment = async (departmentData) => {
  try {
    const department = new Department(departmentData);
    await department.save();
    return department;
  } catch (error) {
    console.error('Error in createDepartment service:', error);
    throw error;
  }
};