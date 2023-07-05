const multer = require('multer');
const fs = require('fs');
const path = require('path');

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('there is no upload directory, we made the upload directory');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname,ext)+ Date.now()+ ext);
        }
    }),
    limits: {fileSize: 5*1024*1024}
})

module.exports = upload;