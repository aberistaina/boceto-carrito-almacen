import Producto from "../models/Productos.models.js"
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs"


export const findOne = async(req, res) =>{
    try {
        let id = req.params.id
        let producto = await Producto.findByPk(id)

        res.json({code:201, message: "Producto encontrado con éxito", data: producto})
    } catch (error) {
        res.status(500).json({code: 500, message: "No se pudo encontrar el producto"})
    }

}




export const createProductos = async(req, res) =>{
    try {
        let { nombre, descripcion, precio, stock } = req.body

        let nuevoProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        stock,
        imagen: req.imagen
        })
        res.json({code:201, message: "Producto creado con éxito", data: nuevoProducto})
        
    } catch (error) {
        fs.unlinkSync(req.pathDestinoImagen, (error)=>{
            if(error){
                console.log("no se pudo eliminar la imagen")
            }else{
                console.log("imagen eliminada con éxito")
            }
        })
        res.status(500).json({code: 500, message: "No se pudo crear el producto"})
    }
}

export const deleteProducto = async(req, res) =>{
    try {
        let id = req.params.id
        let nombreImagen = req.params.ruta
        let productoEliminado = await Producto.destroy({
            where:{
                id: id
            }
        })
        fs.unlinkSync(path.resolve(__dirname,`../public/assets/uploads/${nombreImagen}` ) , (error) =>{
            if(error){
                console.log("no se pudo eliminar la imagen")
            }else{
                console.log("imagen eliminada con éxito")
            }
        })
        res.json({code:200, message: "Producto Eliminado con éxito", data: productoEliminado})

    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, message: "No se pudo eliminar el producto"})
    }
}

export const updateProducto = async(req, res) =>{
    try {
        let id = req.params.id
        let { nombre, descripcion, precio, stock} = req.body
        let producto = await Producto.findByPk(id)
        let imagenAntigua = producto.imagen
        let nuevosDatos;

        if(!producto){
            fs.unlinkSync(path.resolve(__dirname,`../public/assets/uploads/${req.imagen}` ) , (error) =>{
                if(error){
                    console.log("no se pudo eliminar la imagen")
                }else{
                    console.log("imagen eliminada con éxito")
                }
            })
            return res.json({code:400, message: "Producto no existe en la base de datos"})
        }
        
        if(req.imagen){
            nuevosDatos = {
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                imagen: req.imagen,
            }
            fs.unlinkSync(path.resolve(__dirname,`../public/assets/uploads/${imagenAntigua}` ) , (error) =>{
                if(error){
                    console.log("no se pudo eliminar la imagen")
                }else{
                    console.log("imagen eliminada con éxito")
                }
            })
        }else {
                nuevosDatos = {
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    stock: stock,
                    imagen: producto.imagen,
            }

        }

            let productoModificado = await Producto.update(nuevosDatos,{
                where:{
                    id:id
                }
            })


            res.json({code:200, message: "Producto Modificado con éxito", data: productoModificado})

    } catch (error) {
        fs.unlinkSync(req.pathDestinoImagen, (error)=>{
            if(error){
                console.log("no se pudo eliminar la imagen")
            }else{
                console.log("imagen eliminada con éxito")
            }
        })
        res.status(500).json({code: 500, message: "No se pudo Modificar el producto"})
    }
}




