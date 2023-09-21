import express from "express";
import db from './utils/database.js';
import Task from "./models/task.models.js";
import "dotenv/config.js";


Task;

const PORT = process.env.PORT ?? 3000;

db.authenticate()
    .then(() => {
        console.log("Conexión correcta");
    })
    .catch ((error) => console.log(error));

db.sync()
 .then (() => console.log('base de datos sincronizadas'))
 .catch ((error) => console.log(error));


//Paso 2
 const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    res.send("ok");
});

//Paso 1
app.post('/todos', async (req, res) => {
    const {body} = req;
    const task = await Task.create(body);
    res.status(201).json(task);

});

//Paso 3: Consultar tareas
app.get('/todos', async(req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

//Paso 4: Consultar tareas por id
app.get('/todos/:id', async(req, res) => {
    const {id} = req.params;
    const task = await Task.findByPk(id);
    res.json(task);
});

//Paso 5: PUT
app.put('/todos/:id', async(req, res) => {
    const {id} = req.params;
    const {body} = req;
    const task = await Task.update(body, {
        where: {id}
    });
    res.json(task);
});

//Paso 6: DELETE
app.delete('/todos/:id', async(req, res) => {
    const {id} = req.params;
    await Task.destroy({
        where: {id}
    });
    res.status(204).end()
});

app.listen (PORT, () => {
    console.log(`Servidor esuchando en el puerto ${PORT}`);
});
