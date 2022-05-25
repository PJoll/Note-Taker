var express = require("express");
var path = require("path");
var fs = require ("fs");
const { title } = require("process");
const uuidv1 = require("uuid/v1");

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
res.sendFile(path.join(__dirname, "/db/db.json")));
// tried to create a unique note id usinig uuid
app.post("/api/notes", (req, res)=> {
const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv1(),
}
let notes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
notes.push(newNote);
fs.writeFileSync("/db/db.json", JSON.stringify(notes));
res.json(notes)
// need to convert notes to object no idea how

});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`));