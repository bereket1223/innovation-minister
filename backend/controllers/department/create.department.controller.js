import { createDepartment } from '../../service/department/create.department.service.js';
import cloudinary from '../../utils/cloudinary.js';

 const createDepartmentController = async (req, res) => {
  try {
    const departmentData = req.body;
    let fileUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'departments',
      });
      fileUrl = result.secure_url;
    }

    const department = await createDepartment({
      ...departmentData,
      fileUrl,
    });

    res.status(201).json({
      success: true,
      data: department,
      message: 'Department created successfully',
    });
  } catch (error) {
    console.error('Error in createDepartmentController:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the department',
    });
  }
};
export default createDepartmentController