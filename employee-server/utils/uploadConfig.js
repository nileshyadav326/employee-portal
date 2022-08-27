const multer  = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `employee-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png") {
      cb(null, true);
    } else {
      cb(new Error("Not a Image File!!"), false);
    }
  };

export const uploadFile = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});