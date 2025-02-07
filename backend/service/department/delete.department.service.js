import department from "../../models/department.js";

export default async (departmentId) => {
  return await department.findByIdAndDelete(departmentId);
};