// index.js
const express = require('express');
var cors = require('cors')

const fs = require('fs');
//const path = require('path');
const app = express();
const port = 8008;

function returnBackupString (num) {
    const beginning = "llm.backup.";
    const number_part = "000";
    const end_part = ".txt";
    const new_number_part = "00000" + String(num);
    const trimmed_number_part = new_number_part.slice(new_number_part.length - 3, new_number_part.length )
    console.log(trimmed_number_part, 'string');
    return beginning + trimmed_number_part + end_part;
}

function returnBackupNumber (str) {
    const beginning = "llm.backup.";
    const number_part = "000";
    const end_part = ".txt";

    const part = str.slice(beginning.length, beginning.length + number_part.length);
    console.log(part, 'number');

    return Number(part);
}

function readDirForBackup(dirname) {
    //const dirname = '/home/';
    let filelist = "";
    fs.readdir(dirname, (err, files) => {
        
    if (err) {
        console.error('Error reading directories:', err);
        return;
    }
        filelist = files;
        //console.log(filelist, 'here')    
        //res.send(filelist);
        //comma separated list of user directories.
        let checkedlist = [ 'llm.backup.000.txt' ];
        for (let i in filelist) {
            const f = filelist[i];
            if (f.startsWith('llm.backup.') && f.endsWith(".txt")) {
                checkedlist.push(f)
            }
        }
        //console.log("here", filelist, 'there');
        const c = checkedlist.toSorted();
        const ctop = c[c.length - 1];
        const cnum = returnBackupNumber(ctop);

        return Number(cnum);

    })
}

/////////////////////////

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
    const data = req.body.body;//JSON.stringify(req.body.body);//'body' is a sub Object of body !!
    let text = data.replace(/\\n/g, '\n');
    console.log(text, fname)

    fs.writeFile(fname, text, 'utf8', (err) => {
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
   
});

// backup
// restore
app.post('/backup', (req, res) => {
    const filepath = req.body.path;
    console.log(filepath, req.body)
    if (! filepath.startsWith("/home/")) {
        res.send('');
        return;
    }
    const path_part_array_with_name = filepath.split('/');
    const path_part_array = path_part_array_with_name.slice(0, path_part_array_with_name.length - 1);
    const old_filepath = '/' + path_part_array.join('/') + '/.llm.env';
    const num = readDirForBackup(filepath);
    const new_num = num + 1;
    const new_filepath = returnBackupString(new_num);

    console.log( old_filepath, new_filepath )
    fs.copyFile(old_filepath, new_filepath, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });  
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(returnBackupString(5));
});
