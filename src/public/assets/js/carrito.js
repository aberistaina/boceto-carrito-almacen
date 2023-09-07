let carrito = [];
let iconoCarrito = document.getElementById("iconoCarrito")

// Función para cargar el carrito desde el almacenamiento local al cargar la página
function cargarCarritoDesdeLocalStorage() {
  const carritoLocalStorage = localStorage.getItem("carrito");
  if (carritoLocalStorage) {
    carrito = JSON.parse(carritoLocalStorage);
  }
}

//Añadir cantidad de elementos al lado del icono de carrito
const sumarElementos = () =>{
    let elementosCarrito = carrito.length.toLocaleString()
    if(carrito.length > 0){
        iconoCarrito.style.display = "inline-flex"
        iconoCarrito.innerText = elementosCarrito
    }else{
        iconoCarrito.style.display = "none"
    }
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeLocalStorage();
  renderizarCarrito();
  sumarTotal();
  sumarElementos()
});

let body = document.querySelector("body");

body.addEventListener("click", (event) => {
  let elemento = event.target;
  if (elemento.classList.contains("agregar")) {
    let { nombre, precio } = elemento.dataset;
    let producto = {
      nombre: nombre,
      precio: precio
    };
    carrito.push(producto);
    renderizarCarrito();
    sumarTotal();
    guardarCarritoEnLocalStorage();
    sumarElementos()
  }
});


window.addEventListener("beforeunload", () => {
  guardarCarritoEnLocalStorage(); // 
});

let tbodyCarrito = document.querySelector("tbody")

tbodyCarrito.addEventListener("click",  (event)=>{
    let elemento = event.target
    let indice = elemento.dataset.indice
    eliminarArticulo(indice)
    renderizarCarrito()
    sumarTotal()
    sumarElementos()
    


})

const renderizarCarrito = () =>{
    carritoTable.innerHTML = ""
    for(let i = 0; i < carrito.length; i++){
        let carritoTable = document.getElementById("carritoTable")
        carritoTable.innerHTML += `
            <tr>
                <td class="ps-3">${carrito[i].nombre}</td>
                <td class="ps-3">${formatMoney(carrito[i].precio)}</td>
                <td class="ps-3"><button class="btn btn-danger eliminar" data-id="${carrito[i].id}" data-indice="${[i]}" ><i class="bi bi-trash-fill"></i> Eliminar</button></td>
            </tr>
        `
    }
}



const eliminarArticulo = (indice) =>{
    carrito.splice(indice, 1)

}

const formatMoney = (valor) =>{

    return "$" + Number(valor).toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
}

const sumarTotal = () =>{
    let total = 0
    for(let i = 0; i < carrito.length; i++){
        total += Number(carrito[i].precio)
    }
    total = formatMoney(total)
    let totalTabla = document.getElementById("totalCarrito")
    totalTabla.innerText = total
}

