import readUserService from '../../service/user/read.user.service.js';

const readUsers = async (req, res) => {
  try {
    const users = await readUserService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default readUsers;
