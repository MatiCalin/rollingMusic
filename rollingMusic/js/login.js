//variables
const formularioLogin = document.querySelector("#formularioLogin");
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
//evento
formularioLogin.addEventListener("submit", validarLogin)
function validarLogin(e){
    e.preventDefault();
    let inputEmail = document.querySelector("#email").value;
    let inputpassword = document.querySelector("#password").value;
    let user = usuarios.find((user) => {
        return user.email === inputEmail;
    });
    let password = usuarios.find((user) =>{
        return user.password === inputpassword;
    });
    if(user !== undefined && password !==undefined ){
    const usuario = {
        id: user.id,
        email: user.email,
    };
    localStorage.setItem("usuario", JSON.stringify("usuario"))
    if(user.id === 257){
        console.log("soy el administrador")
    } else{
        console.log(" usuario normal")
    }
    } else {
        console.log("usuario no valido")
    }
}