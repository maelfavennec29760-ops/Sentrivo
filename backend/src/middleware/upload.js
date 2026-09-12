import multer from "multer"

const storage = multer.diskStorage({
    destination: "uploads/websites",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName)
    }
});

const upload = multer({ storage });

export { upload }