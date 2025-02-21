import Department from '../../models/department.js';

export const createDepartment = async (departmentData) => {
  try {
    const { email, phoneNumber, knowledgeTitle } = departmentData;

    const existingDepartment = await Department.findOne({
      $or: [{ email }, { phoneNumber }],
      knowledgeTitle
    });

    if (existingDepartment) {
      throw new Error("A department with this email/phone and knowledge title already exists.");
    }

    // Create and save the new department
    const department = new Department(departmentData);
    await department.save();
    
    return department;
  } catch (error) {
    console.error('Error in createDepartment service:', error.message);
    throw new Error("Failed to create department: " + error.message);
  }
};