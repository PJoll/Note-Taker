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

app.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "/public/notes.html")));


app.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "/public/index.html")));


app.get("/api/notes", (req, res) =>
res.sendFile(path.join(__dirname, "./db/db.json")));


app.post("/api/notes", (req, res)=> {
    // tried to create a unique note id usinig uuid
const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv1(),
}
// need to convert notes to object no idea how
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
notes.push(newNote);
fs.writeFileSync("./db/db.json", JSON.stringify(notes));

res.json(notes)
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`));