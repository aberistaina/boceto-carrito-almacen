import {v4 as uuid} from "uuid"
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadImage = (req, res, next) =>{
    let imagen = req.files?.imagen

    if(imagen){
        let formatos = ["jpeg", "gif", "webp", "svg", "png"]
        let extension = imagen.mimetype.split("/")[1]
        if(!formatos.includes(extension)){
            return res.status(400).json({code:500, message: `El formato de la imagen no es válido, intente con uno de estos formatos ${formatos.join("-")}`})
        }
        let nombreImagen = `IMG-${uuid().slice(0,6)}.${extension}`
        let pathDestino = path.resolve(__dirname, "../public/assets/uploads", nombreImagen)
        imagen.mv(pathDestino, async(error) =>{

            if(error){
                res.status(500).json({code:500, message: "Se produjo un error al crear el producto, no se pudo procesar la imagen"})
                console.log(error)
            }
            req.imagen = nombreImagen
            req.pathDestinoImagen = pathDestino
            next()
        })
    }else{
        next() 
    }  
}