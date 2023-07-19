import express from "express"
import cors from "cors"
import { sequelize } from "./database/database.js"
import { Cita } from "./models/Cita.js"

const app = express()
const port = process.env.PORT || 3001
app.use(cors())

async function conexionBD() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
    } catch (error) {
        console.log("Problema de conexion", error)
    }
}

app.get("/listar-citas/:codigo", async function(req, res) {
    const citas = await Cita.findAll( {where: {
        codigo: req.params.codigo
    }})
    res.send(citas)
})

app.get("/eliminar-citas/:codigo", async function(req, res) {
    await Cita.destroy({
        where: {
            codigo: req.params.codigo
        }
    })
    res.send("Cita eliminada")
})

app.get("/guardar-cita/:codigo/:nombre/:profesor/:fecha", async function(req, res) {
    let cod = req.params.codigo;
    let nom = req.params.nombre;
    let prof = req.params.profesor;
    let fech = req.params.fecha;

    await Cita.create({
        codigo: cod,
        nombre: nom,
        profesor: prof,
        fecha: fech
    })
    res.send("Cita creada satisfactoriamente")
})

app.get("/", function(req, res) {
    res.send("Si hay conexion al servidor");
})

app.listen(port, function() {
    console.log("El servidor se encuentra activo: " + port)
    conexionBD()
})