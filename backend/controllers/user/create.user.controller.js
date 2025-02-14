export const createUser = async (req, res) => {
  try {
      console.log("Received Data:", req.body);
      console.log("Received File:", req.file); // Ensure file upload works

      if (!req.body.username || !req.body.email || !req.body.password) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      // Proceed with user creation...
  } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
