import department from "../../models/department.js";

export default async (departmentId, updateData) => {
  return await department.findByIdAndUpdate(departmentId, updateData, { new: true });
};
