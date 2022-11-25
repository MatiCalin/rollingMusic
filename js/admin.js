const formCanciones = document.querySelector("#formCanciones");
let nuevo;
//evito que cambiando url un usuario pueda ingresar a pagina de admin
const user = JSON.parse(localStorage.getItem("usuario"));

class Cancion {
    constructor(codigo, titulo, interprete, imagen) {
        this.codigo = codigo;
        this.imagen = imagen;
        this.titulo = titulo;
        this.interprete = interprete;
        
    }
}

// if(user.id === 1234){
//     const tablaUsuarios = document.querySelector("#tableUser");
    const tablaCanciones = document.querySelector("#bodyTable");
    const myModal = document.querySelector("#changingModal");
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
                <th scope="row" class="text-center"><img src="${songs.imagen}" alt="${songs.titulo}"></th>
                <td class="text-center songData">${songs.titulo}</td>
                <td class="text-center songData">${songs.interprete}</td>
                <div>
                <a href="#" class="btn btn-warning my-1" onclick="modificarSongs(${songs.codigo})"><i class="fa-solid fa-user-pen"></i></a> 
            <a href="#" class="btn btn-danger my-1 px-3" onclick="borrarSongs(${songs.codigo})"><i class="fa-solid fa-trash-can"></i></a>
                </div>
                
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
            <div class="form-group">
                                <label for="titulo">Titulo de canción</label>
                                <input type="text" class="form-control my-2" id="titulo" value="" autocomplete="off">
                            </div>
                            
                            <div class="form-group">
                                <label for="interprete">Nombre de artista</label>
                                <input type="text" class="form-control my-2" id="interprete" value="" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="discImg">Imagen de disco</label>
                                <input type="text" class="form-control my-2" id="discImg" value="" autocomplete="off">
                            </div>
                            
                        `;
        } else {
            content.innerHTML = `
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
        tablaCanciones.innerHTML = "";
        e.preventDefault();

        //me traigo todos los datos   
        const codigo = new Date().getTime(); 
        let imagen = document.querySelector("#discImg").value;
        const titulo = document.querySelector("#titulo").value;
        const interprete = document.querySelector("#interprete").value;

        if (imagen === "") {
            imagen = "https://www.pindula.co.zw/images/a/a7/No_Image.jpg";
        }

        if (nuevo) {
            const newSong = new Cancion(codigo, titulo, interprete, imagen);
            canciones = [...canciones, newSong];
        }else {
            let index = canciones.findIndex((songs) =>{
                return songs.codigo === cancion.codigo;
            });

            canciones[index].imagen = imagen;
            canciones[index].titulo = titulo;
            canciones[index].interprete = interprete;
        }

        localStorage.setItem("canciones", JSON.stringify(canciones));
        
        $(myModal).modal("hide");

        cargarTablaCanciones();
    }

    function borrarSongs(codigo) {
        tablaCanciones.innerHTML = "";
        canciones = canciones.filter( (cancion) => cancion.codigo !== codigo);
        localStorage.setItem("canciones", JSON.stringify(canciones));
        cargarTablaCanciones(); 
    }

    function modificarSongs(codigo) {
        nuevo = false;
        cancion = canciones.find( (music) => {
            return music.codigo === codigo
        });

        abrirModal(cancion);

        $(myModal).modal("show");
    }
// }else{
//     location.href = "home.html"
// }