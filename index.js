require('dotenv').config()
const express = require('express');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  params: {
    Bucket: process.env.AWS_BUCKET,
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/download/:name', (req, res) => {
  const fileName = req.params.name;
  if (!fileName) {
    return res.status(400).end('missing file name');
  }
  var options = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
  };

  console.log('File: ', fileName);

  res.attachment(fileName);
  s3.getObject(options).createReadStream().pipe(res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Node Server is listening port', port);
});