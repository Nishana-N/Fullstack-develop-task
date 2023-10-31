# Fullstack-develop-task
**Task Description:**
You are tasked to develop a web application that allows users to upload a PDF file and extract certain pages from the PDF to create a new PDF. The user should be able to select which pages they want to include in the new PDF.

**Frontend (Any React framework):**
1) Implement a simple form to upload a PDF file. The form should include validation to ensure that only PDF files are uploaded.
2) Once the file is uploaded, display a visual representation of all pages in the PDF.
3) Allow users to select which pages they want to extract from the original PDF. This can be achieved through checkboxes or a similar UI element associated with each page.
4) Include a button or functionality to create the new PDF based on the selected pages. Once completed, offer a download link to the user for the newly created PDF.
5) All pages should be responsive and should work from mobile devices.

**Backend (Any Node.js framework):**
1) Create a REST API to handle the upload of the PDF file and store it on the server.
2) Create a REST API to retrieve the stored PDF file for display.
3) Implement a REST API to extract the selected pages from the original PDF and create a new PDF. You can use any PDF library to achieve this in the Node.js framework you use.
4) Ensure all APIs work correctly and handle potential errors.

**Modules Used**
--> **For frontend download** 
"dependencies":
    1) "axios": "^1.6.0",
    2) "bootstrap": "^5.3.2",
    3) "jquery": "^3.7.1",
    4) "pdf-lib": "^1.17.1",
    5) "react": "^18.2.0",
    6) "react-dom": "^18.2.0",
    7) "react-router-dom": "^6.17.0",
    
--> **For backend download** 
"dependencies":
    1) "body-parser": "^1.20.2",
    2) "cors": "^2.8.5",
    3) "express": "^4.18.2",
    4) "multer": "^1.4.5-lts.1",
    5) "pdf-lib": "^1.17.1",
    6) "pdf2json": "^3.0.4",
    7) "pdfkit": "^0.13.0"

 **Steps to execute the code**
 For frontend:
   1) Open cmd
   2) Install dependencies mentioned above modules
   3) To run the code (App.js) **"npm start"**

 For backend:
    1) open cmd
    2) Install dependencies mentioned above modules
    3) To run the code **"node backend.js"**

  To connect both frontend and backend 2 cmd needs to open at a same time  
    
 
