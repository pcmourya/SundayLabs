const path = require('path');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);
app.use(bodyParser.json());
app.options('*', cors());

app.use('/files', express.static('files'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.pdf`); // Use original filename
  },
});

const upload = multer({ storage: storage });

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sunday_labs',
});

app.listen(4040, () => {
  console.log(`Listening on port 4040`);
});

app.post('/crop', upload.single('cropImage'), (req, res) => {
  const { crop } = req.body;
  const fileName = req.file;

  // Generate path for the PDF file
  //   const pdfPath = `${uuidv4()}`;

  // Generate a unique filename for the PDF file
  //   const fileName = `${pdfPath}.pdf`;

  // Specify the path to store the PDF files
  //   const filePath = path.join(__dirname, 'files', fileName);

  // Write the PDF file to the file system
  //   fs.writeFile(filePath, pdfData, 'base64', async (err) => {
  //     if (err) {
  //       console.error('Error saving PDF file:', err);
  //       res.status(500).send('Error saving PDF file');
  //     } else {
  //       console.log('PDF file saved successfully:', fileName);
  //       const sql = `INSERT INTO crops (report, crop) VALUES ("${fileName}", "${crop}")`;
  //       db.query(sql, (err, rows) => {
  //         if (err) throw err;
  //         return console.log('Data saved successfully');
  //       });
  //       res.status(200).send({ fileName: fileName });
  //     }
  //   });

  try {
    const sql = `INSERT INTO crops (report, crop) VALUES ("${fileName.filename}", "${crop}")`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      return console.log('Data saved successfully');
    });
    res.status(200).send({ fileName: fileName.filename });
  } catch (err) {
    console.log('error: ' + err);
  }
});

app.get('/crops', (req, res) => {
  const q = 'SELECT * FROM crops';
  db.query(q, (err, rows) => {
    if (err) throw err;
    console.log({ rows });
    return res.json(rows);
  });
});

// npm run build
// npm run preview
