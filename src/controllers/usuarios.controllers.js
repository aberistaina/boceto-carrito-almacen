import Usuario from "../models/Usuario.models.js"


export const createUsuario = async(req, res) =>{
    try {
        let { nombre, email, password } = req.body

        let nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password
        })
        res.json({code:201, message: "Usuario creado con éxito", data: nuevoUsuario})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, message: "No se pudo crear el usuario"})
    }
}

export const loginUsuario = async(req, res) =>{
    try {
        res.json({code:200, message: "Inicio de sesión Exitoso", token: req.token, usuario: req.usuario})
        
    } catch (error) {
        res.status(500).json({code: 500, message: "No se pudo iniciar sesión"})
    }
}