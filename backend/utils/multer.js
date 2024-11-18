// Import multer for handling file uploads
const multer = require('multer');
// Import path module for handling file paths
const path = require("path");

// Configure storage options for multer
const storage = multer.diskStorage({
    // Set the destination folder for uploaded files
    destination: (req, file, cb) => {
        // Log the file details (uncomment if needed)
        // console.log(file);
        cb(null, "public/images"); // Store files in the 'public/images' directory
    },
    // Set the filename for uploaded files
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and the original file extension
        const modifiedFileName = Date.now() + path.extname(file.originalname);
        cb(null, modifiedFileName); // Save the file with the new name
    }
});

// Filter files by type
const fileFilter = function (req, file, cb) {
    // Define allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the file's mimetype against the allowed types
    const mimetype = filetypes.test(file.mimetype);
    // Check the file's extension against the allowed types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Accept the file if both mimetype and extension are valid
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        // Reject the file and return an error if the type is invalid
        cb(new Error("Error: Images Only"));
    }

    // Log the mimetype check result (uncomment if needed)
    // console.log("mimetype: ", mimetype);
};

// Configure multer with the defined storage options and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Export the configured multer instance for use in other parts of the application
module.exports = upload;
