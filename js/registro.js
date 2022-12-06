//variables
const formulario = document.querySelector("#form-register")
let usuarios = [] ;
document.addEventListener("DOMContentLoaded", () =>{
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let admin = new Usuario(257, "Juan",  "Juanadmin@gmail.com", "juan1", "1234");
usuarios = [...usuarios, admin];
});



//eventos
formulario.addEventListener("submit", validarUsuarios);
class Usuario{
    constructor(id, nombre, email, usuario, password){
        this.id = id; 
        this.nombre = nombre;
        this.email = email;
        this.usuario = usuario;
        this.password = password;
    }
}
function validarUsuarios(e){
    e.preventDefault();
    const id = Date.now();
    const nombre = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const usuario = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;
    let existedEmail = usuarios.find((user) =>{
        return user.email === email;
    })
    let newUser = new Usuario(id, nombre, email, usuario, password)
    usuarios = [...usuarios, newUser];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    formulario.reset()
}