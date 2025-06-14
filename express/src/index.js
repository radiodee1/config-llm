// index.js
const express = require('express');
var cors = require('cors')

const fs = require('fs');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 8008;
const host = process.env.HOST || "localhost";

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({storage: storage}); // Specify the upload directory

// This function takes the number from 
// 'returnBackupNumber' and adds extra 
// characters to it that form the filename
// used to save a backup of the env file.
function returnBackupString (num) {
    //console.log(num, "num")
    const beginning = "llm.backup.";
    const number_part = "000";
    const end_part = ".txt";
    const new_number_part = "00000" + String(num);
    //console.log(new_number_part, 'new_number_part')
    const trimmed_number_part = new_number_part.slice(new_number_part.length - 3, new_number_part.length )
    //console.log(trimmed_number_part, 'string');
    return beginning + trimmed_number_part + end_part;
}

// This function returns a number 
// formatted with zeros that is
// at most three digits long
function returnBackupNumber (str) {
    const beginning = "llm.backup.";
    const number_part = "000";
    const end_part = ".txt";
    //console.log(str, 'str');
    const part = str.slice(beginning.length, beginning.length + number_part.length);
    //console.log(part, 'number');

    return Number(part);
}

// This method takes raw input from the 
// express handler and puts together a 
// number that is part of the name for 
// the final backup.
function readDirForBackup(dirname) {
    //const dirname = '/home/';
    let filelist = "";
    let filename = ".llm.env";
    if (dirname.endsWith(filename)) {
        const d = dirname.slice(0, dirname.length - filename.length);
        dirname = d;
        
    }
    //console.log(dirname, 'dirname');
    let files = fs.readdirSync(dirname, (err, files) => {
        
        if (err) {
            console.error('Error reading directories:', err);
            return;
        }

    })

    filelist = files;
    //console.log(filelist, 'here')    
    //res.send(filelist);
    //comma separated list of user directories.
    let checkedlist = [ 'llm.backup.000.txt' ];
    for (let i in filelist) {
        const f = filelist[i];
        if (f.startsWith('llm.backup.') && f.endsWith(".txt") && f != "llm.backup.NaN.txt") {
            checkedlist.push(f)
        }
    }
    //console.log("here", filelist, 'there');
    const c = checkedlist.toSorted();
    //console.log(c)
    const ctop = c[c.length - 1];
    //console.log (ctop, 'ctop')
    const cnum = returnBackupNumber(ctop);
    //console.log(cnum, 'cnum')
    return Number(cnum);


}

// This method takes raw input from the 
// express handler and puts together a 
// list of backup files that are available
// on the host.
function readDirForList(dirname) {
    //const dirname = '/home/';
    let filelist = "";
    let filename = ".llm.env";
    if (dirname.endsWith(filename)) {
        const d = dirname.slice(0, dirname.length - filename.length);
        dirname = d;
        
    }
    //console.log(dirname, 'dirname');
    let files = fs.readdirSync(dirname, (err, files) => {
        
        if (err) {
            console.error('Error reading directories:', err);
            return;
        }
    })

    filelist = files;
    let checkedlist = [  ];
    for (let i in filelist) {
        const f = filelist[i];
        if (f.startsWith('llm.backup.') && f.endsWith(".txt") && f != "llm.backup.NaN.txt") {
            checkedlist.push(f)
        }
    }
    //console.log("here", filelist, 'there');
    const c = checkedlist.toSorted();
    //console.log(c)
    return c;


}
/////////////////////////

// This method returns the directory portion of a 
// string, given the expected file name.
function directoryPortion(filepath, filename) {
    const x = filename.length;
    const y = filepath.slice(0, filepath.length - x);
    return y;
}

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Here we read the .env file. The file
// is named '.llm.env'
app.post('/api/config', (req, res) => {
    const filepath = req.body.path;
    console.log(filepath, req.body)
    if (! fs.existsSync(filepath) ) {
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

// Here we read the home directory to find the 
// current user. We use the readdir method
app.get('/api/users', (req, res) => {
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

// Here we replace the contents of the config file
// on the host hard drive. The full path for the 
// file is included in the put request.
app.put('/api/config',  function (req, res)  {
    //const filename =   '/home/dave/test.txt';
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

// Here we write the '.llm.restart' file to the disk.
// The full path to the file is included in the post 
// request 
app.post('/api/restart', (req, res) => {
    const filepath = req.body.path;
    const path = directoryPortion(filepath, '.llm.restart')
    console.log(filepath, req.body)
    if (! fs.existsSync(path) ) {
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

// **************************
// backup
// restore
// listbackup
// **************************

// Here a backup file is made from the ~/.llm.env file.
// The express method makes a copy of the file named with 
// a numbered filename.
app.post('/api/backup', (req, res) => {
    console.log("must provide full path to config file!!")
    const filepath = req.body.path;
    const path = directoryPortion(filepath, 'llm.backup.xxx.txt');
    console.log(path, req.body)
    if (! fs.existsSync(path)  ) {
        res.send('');
        return;
    }
    const path_part_array_with_name = filepath.split('/');
    //console.log(path_part_array_with_name)
    let path_part_array = [];
    if (path_part_array_with_name.length == 3) {
        path_part_array = path_part_array_with_name;
    }
    if (path_part_array_with_name.length >= 4) {
        path_part_array = path_part_array_with_name.slice(0, 3);// path_part_array_with_name.length - 1);
    }
    if (path_part_array_with_name.length < 3) {
        res.send('');
        return;
    }
    //console.log(path_part_array, 'path_part_array')
    const old_filepath = path_part_array.join('/') + '/.llm.env';
    const num = readDirForBackup(path_part_array.join('/'));
    //console.log(num, 'num...')
    const f_num = Number(num);
    const new_num = f_num + 1;
    const new_filepath =  path_part_array.join('/') + '/' + returnBackupString(new_num);

    //console.log( old_filepath, new_filepath )
    fs.copyFile(old_filepath, new_filepath, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
        res.send(new_filepath);
    });  
});

// Here a backup file is selected and 
// copied to the ~/.llm.env file.
app.post('/api/restore', (req, res) => {
    console.log("must provide full path to config file!!")
    const filepath = req.body.path;
    const path = directoryPortion(filepath, 'llm.backup.xxx.txt');
    console.log(path, req.body)
    if (! fs.existsSync(path)  ) {
        res.send('');
        return;
    }
    const path_part_array_with_name = filepath.split('/');
    //console.log(path_part_array_with_name)
    let path_part_array = [];
    if (path_part_array_with_name.length == 3) {
        path_part_array = path_part_array_with_name;
    }
    if (path_part_array_with_name.length >= 4) {
        path_part_array = path_part_array_with_name.slice(0, 3);// path_part_array_with_name.length - 1);
    }
    if (path_part_array_with_name.length < 3) {
        res.send('');
        return;
    }
    //console.log(path_part_array, 'path_part_array')
    const old_filepath = path_part_array.join('/') + '/.llm.env';
    const new_filepath = path_part_array_with_name.join('/');

    console.log( new_filepath, old_filepath );
    fs.copyFile(new_filepath, old_filepath, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
        res.send(new_filepath);
    });  
});

// Here the api returns a list of backup
// files available on a host.
app.post('/api/listbackup', (req, res) => {
    //const dirname = req.body.path;
    const filepath = req.body.path;
    //console.log(filepath, req.body)
    if (! fs.existsSync(filepath)   ) {
        res.send('');
        return;
    }
    const path_part_array_with_name = filepath.split('/');
    console.log(path_part_array_with_name, 'path_part_array_with_name');
    let path_part_array = [];
    if (path_part_array_with_name.length == 3) {
        path_part_array = path_part_array_with_name;
    }
    if (path_part_array_with_name.length >= 4) {
        path_part_array = path_part_array_with_name.slice(0, 3);// path_part_array_with_name.length - 1);
    }
    if (path_part_array_with_name.length < 3) {
        res.send('');
        return;
    }
    const dirname = path_part_array.join('/');
    console.log(dirname, 'dirname');
    var filelist;
    try {
        filelist = readDirForList(dirname);
        // encode filelist somehow here??
        res.send(filelist);
    }
    catch (err) {
        console.log(err.message);
        res.send({ "message" :"bad listbackup"});
        return;
    }
})

// **********************************
// copy file 
// copy json credential file
// **********************************

// This method copies a whole file. It is
// meant for regular files.
app.put('/api/file',  upload.any(), function (req, res)  {
    
    const newPath = req.body.destination;
    console.log(newPath, 'newPath');
    const xdata =  req.files[0];
    console.log(xdata)
    const fileBuffer = xdata.buffer ;
    const fileContent = fileBuffer; // name change
    
    fs.writeFile(newPath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing file');
        } else {
            res.send('Data saved successfully');
        }
    });
 });

// This method copies a json file to the host that
// is used for google credentials
app.put('/api/credential' , upload.any() , (req, res) => {
    
    const newPath = req.body.destination;
    console.log(newPath, 'newPath');
    const xdata =  req.files[0];
    console.log(xdata)
    const fileBuffer = xdata.buffer ;
    const fileContent = fileBuffer.toString('utf-8');
    
    fs.writeFile(newPath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing file');
        } else {
            res.send('Data saved successfully');
        }
    });
 
})


// NOTE: do not include 'host' in listen function below for app to work on localhost
app.listen(port,  () => {
    console.log(`Example app listening at http://${host}:${port}`);
    //console.log(directoryPortion('/home/dave/test.txt','test.txt'));
});
