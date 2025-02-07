import { createDepartmentService } from '../../service/department/create.department.service.js';

export const createDepartment = async (req, res) => {
  try {
    const department = await createDepartmentService(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
