exports.getProfile = async  function getProfile(req, res) {
  try {
    const { user } = req;

    //if id is present login
    if (user) {
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      throw new Error("please Login first");
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}
