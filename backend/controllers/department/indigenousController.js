import { getIndigenousData } from '../../service/department/indigenousService.js';

const getIndigenousDataController = async (req, res) => {
  const { department } = req.params;
  
  try {
    const departmentMapping = {
      "indigenous-innovation": "Indigenous Innovation",
      "indigenous-research": "Indigenous Research",
      "indigenous-technology": "Indigenous Technology",
    }

    if (!departmentMapping[department]) {
      return res.status(400).json({ message: "Invalid department" })
    }

    const data = await getIndigenousData(departmentMapping[department])
    res.json(data)
  } catch (error) {
    console.error(`Error fetching ${department}:`, error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export default getIndigenousDataController
