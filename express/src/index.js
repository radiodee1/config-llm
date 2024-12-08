// index.js
const express = require('express');
var cors = require('cors')

const fs = require('fs');
//const path = require('path');
const app = express();
const port = 8008;

app.use(cors())
//app.use(express.text( {"type":"text/plain"} ));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send('users list!');
})

app.put('/config/:path',  function (req, res)  {
    const filename =   '/home/dave/test.txt';
    const fname = req.params.path;
    // Create a write stream to the file
    //const writeStream = fs.createWriteStream(filename);
    const data = req.body.test; // "content here again...";// req.body;

    //res.send('body ' + Object.keys(data) + ' ' + filename + ' ');
    console.log(data, fname)
    fs.writeFile(filename, data, (err) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error writing file');
    } else {
        res.send('Data saved successfully');
    }
  });
  // Handle the incoming data
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
