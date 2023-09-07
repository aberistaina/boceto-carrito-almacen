let formCreateUser = document.getElementById("formCreateUser")

formCreateUser.addEventListener("submit", async(event) =>{
    event.preventDefault()

    let raw = new FormData(formCreateUser)
    if(raw.get("password") != raw.get("confirm_password")){
        document.getElementById("password2").innerHTML = `Contraseña <p style="color: red;">Las contraseñas no coinciden</p>`

        return 
    }

    let requestOptions = {
    method: 'POST',
    body: raw,
    };
    let response = await fetch("/api/v1/usuarios", requestOptions)
    let data = await response.json()

    if(data.code === 201){
        alert(data.message)
        formCreateUser.reset()
        window.location.href = "/login"
    }
    else{
        alert(data.message)
    }
})

let loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", async(event) =>{
    event.preventDefault()

    let raw = new FormData(loginForm)
    let requestOptions = {
    method: 'POST',
    body: raw,
    };
    
    let response = await fetch("/api/v1/usuarios/login", requestOptions)
    let data = await response.json()

    if(data.code === 200){
        alert(data.message)
        loginForm.reset()
        localStorage.setItem("token", data.token)
        localStorage.setItem("usuario", JSON.stringify(data.usuario))
        location.href = "/"
    }
    else{
        alert(data.message)
    }
})