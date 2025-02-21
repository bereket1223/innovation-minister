import Department from '../../models/department.js';

export const getIndigenousData = async (knowledgeDepartment) => {
  try {
    return await Department.find({ knowledgeDepartment: knowledgeDepartment });
  } catch (error) {
    console.error(`Error fetching ${knowledgeDepartment}:`, error);
    throw error;
  }
};
