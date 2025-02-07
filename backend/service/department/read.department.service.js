import Department from "../../models/department.js";

export default async (departmentId) => {
  return await Department.findById(departmentId);
};
