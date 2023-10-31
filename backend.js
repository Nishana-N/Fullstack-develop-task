

const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

// Route to upload the PDF file
app.post('/api/upload', upload.single('pdfFile'), (req, res) => {
 const filePath = path.join(__dirname, 'uploads', req.file.filename);
 res.status(200).json({ file: filePath });
});


// Route to create a new PDF with the selected pages
app.post('/api/create-pdf', async (req, res) => {
 const { pdfFile, selectedPages } = req.body;

 const pdfDoc = await PDFDocument.load(pdfFile);
 const copiedPages = selectedPages.map((page) => {
    return pdfDoc.copyPages(page - 1, page).export();
 });

 const newPdf = await PDFDocument.create();
 copiedPages.forEach((page) => {
    newPdf.addPage(page);
 });

 const pdfBytes = await newPdf.save();
 const pdfFilePath = path.join(__dirname, 'uploads', 'new-pdf.pdf');
 fs.writeFileSync(pdfFilePath, pdfBytes);

 res.status(200).json({ newPdf: pdfFilePath });
});

// Route to get the URL of the uploaded PDF file
app.get('/api/getpdf', async (req, res) => {
   // Retrieve the stored PDF file and return its URL
  try {
      const pdfFilePath = 'uploads/pdfFile-1637626459079.pdf'; // replace this with your actual PDF file path
      res.status(200).json({ message: 'PDF file retrieved successfully', pdfUrl: pdfFilePath });
   } catch (error) {
      res.status(500).json({ error: 'Server error while retrieving PDF file' });
   }
  });

app.listen(4000, () => console.log('Server is running on port 4000'));