//si un usuario no se encuentra logeado

let user = JSON.parse(localStorage.getItem("usuario")) 

if(user.email === undefined) {
    location.href = "login.html"
}

//traigo el arreglo de canciones.

let ... = JSON.parse(localStorage.getItem("...")) || [];

//variable donde voy a poner las cards


let contenedor = document.querySelcetor("#...");

function cargarCard() {
    .forEach( (...)=> {
    div.classList = "col col-md-6 col-lg mb-3";
    


    div.innerHTML =`
    <div class="card">
                <div class="cover-card">
                    <img src="${.imagen}" alt="imagen">
                </div>
                <h2>${.titulo}</h2>
                <p class="interprete">${.interprete}</p>
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