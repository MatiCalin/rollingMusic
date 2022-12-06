//si un usuario no se encuentra logeado

let user = JSON.parse(localStorage.getItem("usuario"))  || {};

// if (user.email === undefined) {
//     location.href = "login.html";
// }

//traigo el arreglo de canciones.

let canciones = JSON.parse(localStorage.getItem("canciones")) || [];

//variable donde voy a poner las cards

let contenedor = document.querySelector("#container-cards");

function cargarCard() {
    canciones.forEach( (cancion)=> {
    let div = document.createElement("div");
    //div.classList = "col col-md-6 col-lg mb-3";

    div.innerHTML =`
    <div id="mi-lista" class="card">
                <div class="cover-card">
                    <img src="${cancion.imagen}" alt="imagen">
                </div>
                <h2>${cancion.titulo}</h2>
                <p class="interprete">${cancion.interprete}</p>
                <small class=" text-ligth text-muted">5:49 min</small>
                <hr>
                <div class="footer-card">
                    <a href="#" class="u-full-width button-primary button input agregar-lista"data-id="cancion2">Agregar a mi lista +</a>
                    <a href="#"><i>Resproducir</i></a>
                </div>
            </div>
    `;
    contenedor.appendChild(div);
    });
}

cargarCard();