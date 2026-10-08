import { IS_DEV } from "../config/config.js";

export const errorHandler = async (err, req, res, next) => {
  if (!err) next();

  console.log("Error catached Below");
  console.error(err.stack);

  return res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || "Internal Server Message",
    ...(IS_DEV ? { stack: err.stack } : {}),
  });
};
