import Producto from "../models/Productos.models.js"

export const viewHome = async(req, res) =>{
    let productos = await Producto.findAll()
    productos = productos.map(producto => producto.toJSON())
    res.render("home", {
        homeView: true,
        productos
    })
}

export const viewProductosCrud = async(req, res) =>{

    let productos = await Producto.findAll()
    productos = productos.map(producto => producto.toJSON())

    res.render("crudProductos", {
        productosView: true,
        productos
    })
    
}

export const loginRegistro = async(req,res) =>{
    res.render("loginRegistro",{
        loginView: true,
    })
}