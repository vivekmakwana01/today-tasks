const express = require("express");
require("./db/conn");
const Note = require("./models/notes");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/notes/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const notesData = await Note.find({ uid: uid });
    res.send(notesData);
  } catch (e) {
    res.send(e);
  }
});

app.get("/notes/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const noteData = await Note.findById({ _id });
    res.status(200).send(noteData);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/notes", async (req, res) => {
  const _id = req.params.id;
  try {
    const noteData = await Note.find();
    res.status(200).send(noteData);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.delete("/notes/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const noteData = await Note.findByIdAndDelete({ _id });
    res.status(200).send(noteData);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
