export function checkUser(req, res) {
  if (!req?.user) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User data retrieved successfully",
    data: req.user,
  });
}
