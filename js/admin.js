const formCanciones = document.querySelector("#formCanciones");
let nuevo;

//tabla de usuarios
const user = JSON.parse(localStorage.getItem("usuario"));

if(user.id === 257){
    const tablaUsuarios = document.querySelector("#tableUser");
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    function cargarUsuariosTabla() {
        usuarios.forEach((user) => {
            let tr = document.createElement("tr");

            tr.innerHTML = `
                <th scope="row">${user.usuario}</th>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
            `;

            tablaUsuarios.appendChild(tr);
        });
    }

    cargarUsuariosTabla();
}else {
    location.href = "/pages/home.html";
}



class Cancion {
    constructor(codigo, titulo, interprete, imagen) {
        this.codigo = codigo;
        this.imagen = imagen;
        this.titulo = titulo;
        this.interprete = interprete;
        
    }
}

     
    const tablaCanciones = document.querySelector("#bodyTable");
    const myModal = document.querySelector("#changingModal");
    const content = document.querySelector("#bodyModificaModal");
 

    let canciones = JSON.parse(localStorage.getItem("canciones")) || [];

    formCanciones.addEventListener("submit", cargarCanciones)
     

    function cargarTablaCanciones(){
        canciones.forEach((songs) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <th scope="row" class="text-center"><img src="${songs.imagen}" alt="${songs.titulo}" class="rounded my-1 tableImg"></th>
                <td class="text-center text-capitalize songData">${songs.titulo}</td>
                <td class="text-center text-uppercase songData">${songs.interprete}</td>
                
                    <div class="collapseBtn">
                        <a href="#" class="btn my-1" onclick="modificarSongs(${songs.codigo})"><i class="fa-solid fa-user-pen"></i></a> 
                        <a href="#" class="btn my-1 px-3" onclick="borrarSongs(${songs.codigo})"><i class="fa-solid fa-trash-can"></i></a>
                        <button>
                            >
                        </button>
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
                                <label for="titulo" class="fw-normal fs-5">Titulo de canción</label>
                                <input maxlength="25" type="text" class="form-control my-2 fs-4" id="titulo" value="" autocomplete="off" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="interprete" class="fw-normal fs-5">Nombre de artista</label>
                                <input maxlength="25" type="text" class="form-control my-2 fs-4" id="interprete" value="" autocomplete="off" required>
                            </div>
                            <div class="form-group">
                                <label for="discImg" class="fw-normal fs-5">Imagen de disco</label>
                                <input type="url" class="form-control my-2 fs-4" id="discImg" value="" autocomplete="off">
                            </div>
                            
                        `;
        } else {
            content.innerHTML = `
            <div class="form-group">
                                <label for="titulo" class="fw-normal fs-5">Titulo de canción</label>
                                <input maxlength="25" type="text" class="form-control my-2 fs-4" id="titulo" value="${songs.titulo}" autocomplete="off" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="interprete" class="fw-normal fs-5">Nombre de artista</label>
                                <input maxlength="25" type="text" class="form-control my-2 fs-4" id="interprete" value="${songs.interprete}" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="discImg" class="fw-normal fs-5">Imagen de disco</label>
                                <input type="url" class="form-control my-2 fs-4" id="discImg" value="${songs.imagen}" autocomplete="off">
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
