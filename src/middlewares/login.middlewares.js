import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.models.js"

export const emitToken = async(req, res, next) =>{
    try {
        let {email, password } = req.body
        let usuario = await Usuario.findOne({
            attributes: ["nombre", "email", "admin"],
            where:{
                email,
                password
            }
        })
        if (!usuario){
            return res.json({code:400, message: "Email o Password Incorrecto",})
        }

        let token = jwt.sign({
            data: usuario,
        },
        "secreto",
        {expiresIn : "1h"}
        )
        req.token = token
        req.usuario = usuario
        next()

    } catch (error) {
        res.status(500).json({code: 500, message: "Error en el proceso de autenticación"})
    }

}

export const verifyToken = (req, res, next) =>{
    let { authorization} = req.headers
    let { token } = req.query

    try {
        if(authorization){
            let token = authorization.split(" ")[1]
            jwt.verify(token, "secreto", (error, decoded) =>{
                if(error){
                    res.status(401).json({code: 401, message: "El token proporcionado no fue emitido por el servidor, fue alterado o se encuentra caducado"})
                }
            })
            console.log(token)
            console.log("existe token")
            next()
        }else if(token){
            console.log(token)
            next()
        }else{
            res.status(401).json({code: 401, message: "Debe estar autenticado para ingresar a la vista"})
        }
        
    } catch (error) {
        res.status(500).json({code: 500, message: "Error en el proceso de autenticación"})
    }

}

