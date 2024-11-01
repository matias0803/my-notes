import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const app = express()
const port = 3000
const API_URL = "http://localhost:4000"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))


app.get("/", async (req, res)=>{
    try{
        const response = await axios.get(`${API_URL}/notes`)
        
        res.render("index.ejs", {notes: response.data})
    }
    catch(error){
        res.status(500).json({message: "Error fetching notes"})
    }
})

app.get("/new", (req,res) =>{
    res.render("modificar.ejs", {heading: "New note", submit: "Create note"})
})

app.get("/edit/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const response = await axios.get(`${API_URL}/notes/${id}`)
        console.log(response.data)
        res.render("modificar.ejs", {heading: "Edit note", submit: "Update note", notes: response.data})
    }
    catch(error){
        res.status(500).json({message: "Error fetching notes"})
    }
})

app.post("/api/notes", async (req,res) => {
    try{
        console.log("nueva nota")
        console.log(req.body)
        const response = await axios.post(`${API_URL}/notes`, req.body)
        console.log(response.data)
        res.redirect("/")
    }
    catch(error){
        res.status(500).json({message: "Error fetching notes"})
    }
})


app.post("/api/notes/:id", async (req, res) =>{
    try{
        console.log("datos que vienen de editar" , req.body)
        const response = await axios.patch(`${API_URL}/notes/${req.params.id}`, req.body)

        console.log("datos despues de editar", response.data)
        res.redirect("/")
    }
    catch(error){
        res.status(500).json({message: "Error fetching notes"})
    }
})


app.get("/api/notes/delete/:id", async (req, res) =>{
    try {
        console.log("entree")
        await axios.delete(`${API_URL}/notes/${req.params.id}`)
        res.redirect("/")
    }
    catch(error){
        res.status(500).json({message: "Error deleting notes"})
    }
})

app.listen(port, ()=>{
    console.log("listening on port ", port)
})


