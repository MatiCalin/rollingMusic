//si un usuario no se encuentra logeado

let user = JSON.parse(localStorage.getItem("usuario")) || {};

//traigo el arreglo de canciones.

let canciones = JSON.parse(localStorage.getItem("canciones")) || [];

//variable donde voy a poner las cards

let contenedor = document.querySelector("#container-cards");

const botonBuscar = document.querySelector("#searchForm");
botonBuscar.addEventListener("submit", buscarProducto);

function cargarCard() {
  contenedor.innerHTML = "";
  canciones.forEach((cancion) => {
    let div = document.createElement("div");

    div.innerHTML = `
    <div class="cardHome">
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

function buscarProducto(e) {
  e.preventDefault();

  canciones = JSON.parse(localStorage.getItem("canciones")) || [];

  const textoFiltrado = document.querySelector("#searchBtnFilter").value;

  if (textoFiltrado === "") {
    cargarCard();
  } else {
    canciones = canciones.filter(
      (cancion) =>
        cancion.interprete.toLowerCase() === textoFiltrado.toLowerCase()
    );
  }

  cargarCard();
}
