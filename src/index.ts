import express from 'express';
import { verify } from 'verify4js';
import multer from 'multer';
import pdfjs from 'pdfjs-dist';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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

  console.log("filedata", fileData);

  verify(fileData)
    .then((VerifyResultInterface) => {
      console.log("result: ", VerifyResultInterface);
      res.json({ result: VerifyResultInterface });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ success: false, error: error.message });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
