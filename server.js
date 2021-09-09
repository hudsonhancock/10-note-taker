const express = require("express");
const db = require("./Public/db/db.json");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", (req, res) => {
  res.sendFile(__dirname + "/public/db/db.json");
});

const noteArr = db;

app.post("/api/notes", (req, res) => {
  // noteArray.push();
  console.log(noteArr);

  let noteData = {};
  noteData.title = req.body.title;
  noteData.text = req.body.text;
  noteData.id = noteArr.length;

  // console.log(noteData.title);
  // console.log(noteData.text);
  // console.log(noteData.id);

  noteArr.push(noteData);
  console.log(noteArr);

  // noteArr.length;
  // noteArr.push(req.body.title);
  // noteArr.push(req.body.text);
  // console.log(noteArr);

  fs.writeFile("Public/db/db.json", JSON.stringify(noteArr), (err) =>
    err ? console.log(err) : console.log("Successfully created db.json!")
  );
});

app.listen(PORT, () => {
  console.log(`app listening  at http://localhost:${PORT}`);
});
