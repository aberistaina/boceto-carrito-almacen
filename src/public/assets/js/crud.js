//Crear Producto

let formCreate = document.getElementById("formCreate")

formCreate.addEventListener("submit", async(event) =>{
    event.preventDefault()

    let raw = new FormData(formCreate)

    let requestOptions = {
    method: 'POST',
    body: raw,
    };

    let response = await fetch("/api/v1/productos", requestOptions)
    let data = await response.json()

    if(data.code === 201){
        alert(data.message)
        formCreate.reset()
        location.reload()
    }
    else{
        alert(data.message)
    }

})


//Eliminar Producto

let tbody = document.querySelector("tbody")

tbody.addEventListener("click", async(event) =>{
    let elemento = event.target
    console.log(elemento)
    if(elemento.classList.contains("eliminar")){
        let id = elemento.dataset.id
        let ruta = elemento.dataset.ruta

        let response = await fetch(`/api/v1/productos/${id}/${ruta}`, { method: "delete" })
        let data = await response.json()

        if(data.code === 200){
            alert(data.message)
            location.reload()
        }
        else{
            alert(data.message)
        }
    }
    
})


//Cargar Datos Para Update En Modal

tbody.addEventListener("click", async(event) =>{
    let elemento = event.target
    if(elemento.classList.contains("modificar")){
        let id = elemento.dataset.id
        let nombre = document.getElementById("nombreUpdate")
        let descripcion = document.getElementById("descripcionUpdate")
        let precio = document.getElementById("precioUpdate")
        let stock = document.getElementById("stockUpdate")
        let idModal = document.getElementById("idUpdate")
        

        let response = await fetch(`/api/v1/productos/id/${id}`)
        let data = await response.json()
        console.log(data)

        idModal.value = data.data.id
        nombre.value = data.data.nombre
        descripcion.value = data.data.descripcion
        precio.value = data.data.precio
        stock.value = data.data.stock


    }
    
})

//Modificar producto

let formUpdate = document.getElementById("formUpdate")

formUpdate.addEventListener("submit", async(event) =>{
    event.preventDefault()
    let id = document.getElementById("idUpdate").value

    let raw = new FormData(formUpdate)

    let requestOptions = {
    method: 'PUT',
    body: raw,
    };

    let response = await fetch(`/api/v1/productos/${id}`, requestOptions)
    let data = await response.json()

    if(data.code === 200){
        alert(data.message)
        location.reload()
    }
    else{
        alert(data.message)
    }

})