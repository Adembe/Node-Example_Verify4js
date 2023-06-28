import express from 'express';
import { verify } from 'verify4js';
import multer from 'multer';
import pdfjs from 'pdfjs-dist';
import path from 'path';

const __dirname = 'D:\\Me\\dadlaga\\Node-Example_Verify4js';


const app = express();
const upload = multer();

pdfjs.GlobalWorkerOptions.workerSrc = path.resolve(
    __dirname,
    'node_modules',
    'pdfjs-dist',
    'build',
    'pdf.worker.js'
  );

app.post('/verify', upload.single('file'), async (req, res) => {
  const fileData = Int8Array.from(req.file.buffer); // Convert Buffer to Int8Array

  verify(fileData)
    .then((VerifyResultInterface) => {
      console.log("result: ", VerifyResultInterface);
      res.status(200).json({ success: true,result: VerifyResultInterface });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ success: false, error: error.message });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
