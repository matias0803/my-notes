import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 4000

let notes = [
    {
        id: 1,
        title: "Proyecto Final",
        noteText: "Revisar el proyecto de fin de curso",
        noteType: "Recordatorio"
    },
    {
        id: 2,
        title: "Lista de Compras",
        noteText: "Comprar ingredientes para la cena",
        noteType: "Tarea"
    },
    {
        id: 3,
        title: "Práctica de Código",
        noteText: "Practicar JavaScript y CSS",
        noteType: "Estudio"
    },
    {
        id: 4,
        title: "Lectura de Diseño",
        noteText: "Leer artículo sobre diseño web",
        noteType: "Lectura"
    },
    {
        id: 5,
        title: "Presentación del Equipo",
        noteText: "Preparar la presentación del equipo",
        noteType: "Trabajo"
    }
];



let lastid = 5

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//get all note
app.get("/notes", (req,res) =>{
    res.json(notes)
})

//get a specific
app.get("/notes/:id", (req,res) =>{
    const id = parseInt(req.params.id)
    console.log(id)
    const specificNote = notes.find((notes) => notes.id === id)
    res.json(specificNote)
})

//post new note
app.post("/notes", (req,res) =>{
    
    lastid = lastid + 1
    const newNote = {
        id: lastid,
        title: req.body.title,
        noteText: req.body.text,
        noteType: req.body.type,
    }
    notes.push(newNote)
    console.log(notes.slice(-1))
    res.json(newNote)
})

//patch a note
app.patch("/notes/:id", (req, res) => {
    

    const id = parseInt(req.params.id);
    const existingNote = notes.find((notes) => notes.id === id);
    console.log("datos de editar dentro de la api", req.body)
    const replacementNote = {
      id: id,
      title: req.body.title || existingNote.title,
      noteText: req.body.text || existingNote.noteText,
      noteType: req.body.type || existingNote.noteType,
    };
    const searchIndex = notes.findIndex((notes) => notes.id === id);
    notes[searchIndex] = replacementNote;
    console.log(notes[searchIndex]);
    res.json(replacementNote);
  });
  

//delete a note

app.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = notes.findIndex((notes) => notes.id === id);
    if (searchIndex > -1) {
      notes.splice(searchIndex, 1);
      res.sendStatus(200);
    } else {
      res
        .status(404)
        .json({ error: `notes with id: ${id} not found. Notes were deleted.` });
    }
  });










app.listen(port, ()=>{
    console.log("API running on port " , port)
})