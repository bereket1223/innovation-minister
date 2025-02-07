import deleteDepartmentService from '../../service/department/delete.department.service.js';

const deleteDepartment = async (req, res) => {
  try {
    await deleteDepartmentService(req.params.id);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteDepartment;
