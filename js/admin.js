const formCanciones = document.querySelector("#formCanciones");
let nuevo;
//evito que cambiando url un usuario pueda ingresar a pagina de admin
const user = JSON.parse(localStorage.getItem("usuario"));

class Cancion {
    constructor(codigo, titulo, interprete, imagen) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.interprete = interprete;
        this.imagen = imagen;
    }
}

// if(user.id === 1234){
//     const tablaUsuarios = document.querySelector("#tableUser");
    const tablaCanciones = document.querySelector("#bodyTable");
    const myModal = document.querySelector("#myModal");
    const content = document.querySelector("#bodyModificaModal");
    //const usuarios = JSON.parse(localStorage.getItem("usuarios")); //usuarios es la key por lo que en el registro quien se encargue de armar el almacenamiento en el local storage debe guardar los usuarios con esta key

    let canciones = JSON.parse(localStorage.getItem("canciones")) || [];

    formCanciones.addEventListener("submit", cargarCanciones)
    // function cargarUsuariosTabla(){
    //     usuarios.map( () =>{
    //         let tr = document.createElement("tr");

    //         tr.innerHTML = `
    //             <th scope="row">${user.usuario}</th>
    //             <td>${user.nombre}</td>
    //             <td>${user.email}</td>
    //         `;

    //         tablaUsuarios.appendChild(tr);
    //     });
    // }

    // cargarUsuariosTabla();

    function cargarTablaCanciones(){
        canciones.forEach((songs) => {
            let tr = document.createElement("tr");

            tr.innerHTML = `
                <th scope="row">${songs.imagen}</th>
                <td>${songs.titulo}</td>
                <td>${songs.interprete}</td>
                <a href="#" class="btn btn-warning" onclick="modificarSongs(${songs.codigo})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> 
            <a href="#" class="btn btn-danger" onclick="borrarSongs(${songs.codigo})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
            `;

            tablaCanciones.appendChild(tr);
        });
    }

    cargarTablaCanciones();

    function abrirModal(songs = null) {
        console.log(songs);
        if (songs === null) {
            nuevo = true;
            content.innerHTML = `
            <div class="modal-body" id="bodyModificaModal">
                            <div class="form-group">
                                <label for="titulo">Titulo de canción</label>
                                <input type="text" class="form-control" id="titulo" value="" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="interprete">Nombre de artista</label>
                                <input type="text" class="form-control" id="interprete" value="" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="discImg">Imagen de disco</label>
                                <input type="text" class="form-control" id="discImg" value="" autocomplete="off">
                            </div>
                        </div>
                        `;
        } else {
            content.innerHTML = `
            <div class="modal-body" id="bodyModificaModal">
                            <div class="form-group">
                                <label for="titulo">Titulo de canción</label>
                                <input type="text" class="form-control" id="titulo" value="${songs.titulo}" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="interprete">Nombre de artista</label>
                                <input type="text" class="form-control" id="interprete" value="${songs.interprete}" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="discImg">Imagen de disco</label>
                                <input type="text" class="form-control" id="discImg" value="${songs.imagen}" autocomplete="off">
                            </div>
                        </div>
                        `;
        }
    }
    
    //hago que se carguen todas las canciones
    function cargarCanciones(e) {
        e.preventDefault();

        //me traigo todos los datos   
        const codigo = new Date().getTime(); 
        const imagen = document.querySelector("#discImg").value;
        const titulo = document.querySelector("#titulo").value;
        const interprete = document.querySelector("#interprete").value;

        // if (imagen === "") {
        //     imagen = "https://www.pindula.co.zw/images/a/a7/No_Image.jpg";
        // }

        const newSong = new Cancion(codigo, titulo, interprete, imagen);
        canciones = [...canciones, newSong];
        localStorage.setItem("canciones", JSON.stringify(canciones));
        
        $(myModal).modal("hide");
    }

    function borrarSongs(codigo) {
        tablaCanciones.innerHTML = "";
        canciones = canciones.filter( (cancion) => cancion.codigo !== codigo);
        localStorage.setItem("canciones", JSON.stringify(canciones));
        cargarTablaCanciones(); 
    }
// }else{
//     location.href = "home.html"
// }