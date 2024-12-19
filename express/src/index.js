// index.js
const express = require('express');
var cors = require('cors')

const fs = require('fs');
//const path = require('path');
const app = express();
const port = 8008;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/config', (req, res) => {
    const filepath = req.body.path;
    console.log(filepath, req.body)
    if (! filepath.startsWith("/home/")) {
        res.send('');
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
        console.log(data); // Prints the content of the file
        res.send(data);
    });
    //res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const dirname = '/home/';
    var filelist = "";
    fs.readdir(dirname, (err, files) => {
        
    if (err) {
        console.error('Error reading directories:', err);
        return;
    }
        filelist = files;
        res.send(filelist);
        //comma separated list of user directories.
    })
})

app.put('/config',  function (req, res)  {
    const filename =   '/home/dave/test.txt';
    const fname = req.body.path;
    
    //req.body Object contains 'path' and 'body'
    const data = req.body.body; // 'body' is a sub Object of body !!

    console.log(data, fname)
    fs.writeFile(fname, data, (err) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error writing file');
    } else {
        res.send('Data saved successfully');
    }
  });
})

app.post('/restart', (req, res) => {
    const filepath = req.body.path;
    console.log(filepath, req.body)
    if (! filepath.startsWith("/home/")) {
        res.send('');
        return;
    }
    const data = "restart"; // req.body.body; // 'body' is a sub Object of body !!


    console.log(data, filepath)
    fs.writeFile(filepath, data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing file');
        } else {
            res.send('Data saved successfully');
        }
    });
   
    //fs.readFile(filepath, 'utf8', (err, data) => {
    //if (err) {
    //    console.error(err);
    //    return;
    //}
    //    console.log(data); // Prints the content of the file
    //    res.send(data);
    //});
    //res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
