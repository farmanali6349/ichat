export function checkUser(req, res) {
  if (!req?.user) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return req.status(200).json({
    success: true,
    statusCode: 200,
    message: "User data retrieved successfully",
    user: req.user,
  });
}
