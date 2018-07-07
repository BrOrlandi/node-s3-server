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

app.get('/test', (req, res) => {
  res.send(`
    <h1 style="text-align: center; margin-top: 30px;">
      <a href="/download/BLGjgheeDYFHspdQBVP3.mp4" download="BLGjgheeDYFHspdQBVP3.mp4">Download Node</a>
    </h1>
    <h1 style="text-align: center; margin-top: 30px;">
      <a href="https://s3.amazonaws.com/star-wars-intros/BLGjgheeDYFHspdQBVP3.mp4" download="BLGjgheeDYFHspdQBVP3.mp4">Download S3</a>
    </h1>
  `);
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