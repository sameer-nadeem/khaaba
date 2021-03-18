const multer = require('multer')

const uploader = (req, res, filename, cb) => {
    var Storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './logos')
        },
        filename: function (req, file, callback) {
            callback(null, filename + '_' + file.originalname);
        }
    })

    var upload = multer({
        storage: Storage
    }).single('logo')

    upload(req, res, cb)
}

module.exports = uploader

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });


// app.post("/api/Upload", function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//             throw err
//             return res.end("Something went wrong!");
//         }
//         return res.end("File uploaded sucessfully!.");
//     });
// });
