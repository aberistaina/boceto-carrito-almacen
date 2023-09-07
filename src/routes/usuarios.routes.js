import { Router } from "express";
import { createUsuario, loginUsuario } from "../controllers/usuarios.controllers.js";
import { emitToken } from "../middlewares/login.middlewares.js";


const router = Router()


//Ruta Crear Usuario
router.post("/", createUsuario)

//Ruta para login
router.post("/login", emitToken, loginUsuario)


export default router