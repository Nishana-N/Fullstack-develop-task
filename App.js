
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import './App.css';
import * as $ from 'jquery';

 import React, { useEffect, useState } from 'react';
 import axios from 'axios';
 import {Pdf} from 'pdf-lib';

 function App() {
  const [pdfFile, setPdfFile] = useState(null);
 const [pages, setPages] = useState([]);
 const [selectedPages, setSelectedPages] = useState([]);
 const [uploadedPdf, setUploadedPdf] = useState(null);
 const [newPdfUrl, setNewPdfUrl] = useState(null);
 

useEffect(() => {
  fetch("http://localhost:4000/backend")
  .then((data)=>setPdfFile(data.pdfFile))
})


 const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the PDF file
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    const res = await axios.post('/api/upload', formData);

    // Get the stored PDF file
    const pdfUrl = await axios.get('/api/getpdf');

    // Convert the PDF to an array of pages
    const pdfData = await fetch(pdfUrl.data).then((res) => res.arrayBuffer());
    const pdfDoc = await Pdf.PDFDocument.load(pdfData);
    const pdfPages = pdfDoc.getPages();

    // Set the pages state
    setPages(pdfPages);
 };

 const handlePageChange = (e) => {
    // Update the selectedPages state based on the checkboxes
const pageNumber = parseInt(e.target.name);
    if (e.target.checked) {
      setSelectedPages([...selectedPages, pageNumber]);
    } else {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    }
 };

 const createNewPdf = async () => {
    // Use pdf-lib to extract the selected pages from the original PDF
    // Create a new PDF with the selected pages
    // Generate a download link for the new PDF
    // Set the newPdfUrl state

   const response = await axios.post('/api/create-pdf', {
      pdfFile: uploadedPdf,
      selectedPages,
    });
    setNewPdfUrl(response.data.newPdfUrl);
 };

 const handleDownload = () => {
    const link = document.createElement('a');
    link.href = newPdfUrl;
    link.download = 'new-pdf.pdf';
    link.click();
 };
  return(
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload PDF</button>
      </form>

      {pages.map((page, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={index}
            onChange={handlePageChange}
          />
          <label htmlFor={index}>Page {index + 1}</label>
        </div>
      ))}

      <button onClick={createNewPdf}>Create New PDF</button>
      {newPdfUrl && <a href={handleDownload}>Download New PDF</a>}
    </div>

  );
    

}

export default App;
