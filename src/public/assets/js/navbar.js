let token = localStorage.getItem("token")
let crudProductos = document.getElementById("crudProductos")
let login = document.getElementById("linkLogin")
let logout = document.getElementById("linkLogout")
let usuario = JSON.parse(localStorage.getItem("usuario"));


if(token){  
    login.style.display = "none" 
    if(usuario.admin){     
        crudProductos.style.display = "inline-flex"
    }
}else{
    logout.style.display = "none"
}

//Logout
logout.addEventListener("click", (event) =>{
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    location.href = "/"

})
