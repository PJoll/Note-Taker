// create variables
var express = require("express");
var path = require("path");
const fs = require ("fs");
const { title } = require("process");
const uuidv1 = require("uuidv1");

var PORT = process.env.PORT || 3001;

var app = express();
  

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))});





// get request for notes

app.get("/api/notes", (req, res) =>
res.sendFile(path.join(__dirname, "db/db.json")));

// POST request for notes
app.post("/api/notes", (req, res)=> {
    console.log("post notes, ", req.body)
    // tried to create a unique note id usinig uuid
// const newNote = {
//     title: req.body.title,
//     text: req.body.text,
//     id: uuidv1(),
// }







console.info(`${req.method} request received to add note`)
const { title, text } = req.body;
console.log(req.body)
if (title && text) { 
    console.log(title && text)
    const newNote = {
        title,
        text,
        id:uuidv1()
    }; 
    fs.readFile("db/db.json", "utf8", (err,notes) => {
        if (err) {
            console.error(err);
        }else {
            const parsedNotes = JSON.parse(notes);

            parsedNotes.push(newNote);

            fs.writeFile("db/db.json", JSON.stringify(parsedNotes, null, 4),(writeErr ) =>
            writeErr
            ? console.error(writeErr)
            : console.info("Updated Notes")
            );
        }
    })
    const response = {
        status: "success",
        body: newNote,
    };
    console.log(response);
    res.status(201).json(response)
} else {
    res.status(500).json("error in postin note")
}




// convert notes to object using stringify
// let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
// notes.push(newNote);
// fs.writeFileSync("./db/db.json", JSON.stringify(notes));

// res.json(notes)
});

// returning to the index file
app.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "/index.html")));

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`));