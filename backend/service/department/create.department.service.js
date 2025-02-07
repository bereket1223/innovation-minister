import Department from "../../models/department.js";

export default async (departmentData) => {
  const department = new Department(departmentData);
  return await department.save();
};
