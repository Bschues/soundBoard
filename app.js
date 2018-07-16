const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const publicPath = './public/';
const port = 3000;
const app = express();

const uploadedFiles = [];
const publicFolderPath = path.join(__dirname, 'public');

app.use(express.static('./public/'));

function fileFilter(req, file, cb) {
  var type = file.mimetype;
  var typeArray = type.split('/');
  if (typeArray[0] == 'audio') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/audio/');
  },
  filename: function(req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split('.');
    filename = '' + extension[0] + '.' + extension[extension.length - 1];
    cb(null, filename);
  },
});
const upload = multer({ storage: storage, dest: publicPath, fileFilter: fileFilter });

app.get('/public/audio', function(req, res) {
  fs.readdir('./public/audio', function(err, items) {
    if (err) console.log(err);
    if (items[0] === '.DS_Store') items.shift();
    res.send(JSON.stringify(items));
  });
});

app.post('/public/audio', upload.single('audioFile'), function(req, res, next) {
  const redirectScript = `<script> 
  window.location.replace("/");
  </script>`;
  if (!req.file) {
    res.send(`
    ${redirectScript}
     <script>
     (document.querySelector('#err').textContent = 'Please select a file'
     </script>
     `);
  } else {
    console.log('Uploaded: ' + req.file.filename);
    path.extname(req.file.originalname);
    uploadedFiles.push(req.file.filename);
    res.send(redirectScript);
  }
});

app.listen(port, () => console.log(`Server Listening on Port ${port}`));
