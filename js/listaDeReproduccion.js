//variables 
const miLista = document.querySelector('#mi-lista');
const Auriculares = document.querySelector('#auriculares');
const contenedorAuriculares = document.querySelector('#headphones tbody');
const vaciarLista = document.querySelector('#vaciar-lista');

//eventos
miLista.addEventListener('click', agregarMusica);
Auriculares.addEventListener("click", eliminarMusica);
vaciarLista.addEventListener("click",() =>{
	listaMusica = [];
	vaciarListaDeReproduccion();
	saveLocal();
})

document.addEventListener('DOMContentLoaded', () => {
	listaMusica = JSON.parse(localStorage.getItem('listaMusica')) || [];
	listaHTML();
})

function agregarMusica(e) {
	e.preventDefault();
	
	if(e.target.classList.contains('agregar-lista')) {
		const miMusica = e.target.parentElement.parentElement;
		
		leerDatosMusica(miMusica);
	}
}

function leerDatosMusica(miMusica) {
	const infoMusica = {
		imagen: miMusica.querySelector('img').src,
		titulo: miMusica.querySelector('h4').textContent,
		id: miMusica.querySelector('a').getAttribute('data-id'),
	};

/// para que no se repita el tema
	const existe = listaMusica.some((tema) => tema.id === infoMusica.id);

	if(existe) {
		const tema = listaMusica.map((temas) => {
			if (temas.id === infoMusica.id) {
				temas.cantidad++;
				return temas;
			} else {
				return tema;
			}
		});

		listaMusica = [...tema];
	} else {
		listaMusica = [infoMusica, ...listaMusica];
	}
	
	listaHTML();
}

function listaHTML() {
	vaciarListaDeReproduccion();

	listaMusica.forEach((infoMusica) => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${infoMusica.imagen}" width="100"/>
				</td>
			<td> 
			${infoMusica.nombre}
		    </td>
			<td> <a href="#" class="borrar-producto" data-id="${infoMusica.id}"> X </a>  </td>
		
			`;
			contenedorAuriculares.appendChild(row);
	});

	saveLocal();
}
	//vaciar lista
	function eliminarMusica(e){
		e.preventDefault();
		
		if (e.target.classList.contains('borrar-producto')) {
			const productoId = e.target.getAttribute('data-id');
			
			///eliminar del arreglo del carrito
			listaMusica = listaMusica.filter((producto) => producto.id !== productoId )
		
			listaHTML();
		}
	}

	function vaciarListaDeReproduccion(){
		contenedorAuriculares.innerHTML = '';
	
}

function saveLocal() {
	localStorage.setItem("listaMusica", JSON.stringify(listaMusica));
};