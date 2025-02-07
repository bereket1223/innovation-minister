import { readDepartmentService } from '../../service/department/read.department.service.js';

export const readDepartments = async (req, res) => {
  try {
    const departments = await readDepartmentService();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};