async function validateLogin(req) {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Email and password are required.");
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}


module.exports = validateLogin