import { Router } from "express";
import {uploadImage} from "../middlewares/uploadImage.middlewares.js"
import {createProductos ,deleteProducto, updateProducto, findOne} from "../controllers/productos.controllers.js"


const router = Router()

//Ruta Obtener Todos Los Productos
router.get("/id/:id", findOne)

//Ruta Crear producto
router.post("/", uploadImage, createProductos)

//ruta Eliminar producto
router.delete("/:id/:ruta", deleteProducto)

//ruta Modificar producto
router.put("/:id",uploadImage, updateProducto)


export default router