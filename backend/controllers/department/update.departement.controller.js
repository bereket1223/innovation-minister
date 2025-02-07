import { updateDepartmentService } from '../../service/department/update.department.service.js';

export const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await updateDepartmentService(req.params.id, req.body);
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
