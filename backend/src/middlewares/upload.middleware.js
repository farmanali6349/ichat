import multer from "multer";
// import crypto from "crypto";
// import path from "path";
const MAX_FILE_SIZE = 24 * 1024 * 1024; // 24 MB

// export const uploadPath = path.join(process.cwd(), "public", "/temp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(16, (err, raw) => {
//       if (err) return cb(err);
//       return cb(null, file.fieldname + "-" + raw.toString("hex"));
//     });
//   },
// });

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImage || !isVideo) {
      cb(new Error("Only Image and Video Files are allowed"));
      return;
    }

    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
});
