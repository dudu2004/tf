// llamar a las constantes 
const carrito = document.getElementById('carrito');
const platillos = document.getElementById('lista-platillos');
const listaPlatillos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();
//cargar la lista de los productos 
function cargarEventListeners() {
  platillos.addEventListener('click', comprarPlatillo);
  carrito.addEventListener('click', eliminarPlatillo);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
//insertar un producto al carrito 
function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(platillo);
    }
}
//leer los datos del producto
function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContent,
        precio: platillo.querySelector('.precio spam').textContent,
        id: platillo.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoPlatillo);
}
//insertar los datos del producto al carrito 
function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100> 
       </td> 
       <td>${platillo.titulo}&nbsp</td>
       <td>${platillo.precio}&nbsp</td>
       <td>
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}
//eliminar un producto del carrito 
function eliminarPlatillo(e) {
    e.preventDefault();

    let platillo,
        platilloId;
    
    if(e.target.classList.contains('borrar-platillo')) {
        e.target.parentElement.parentElement.remove();
        platillo = e.target.parentElement.parentElement;
        platilloId = platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}
// vaciar el carrito 
function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}
//guardar producto en el localstorage
function guardarPlatilloLocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}
//obetener prodcuto para agregar al localstorage 
function obtenerPlatillosLocalStorage() {
    let platillosLS;

    if(localStorage.getItem('platillos') === null) {
        platillosLS = [];
    }else {
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}
//leer los productos ingresados a localstorage
function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}&nbsp</td>
            <td>${platillo.precio}&nbsp</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
        listaPlatillos.appendChild(row);
    });
}
// eliminar los productos del localstorage
function eliminarPlatilloLocalStorage(platillo) {
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platilloLS, index){
        if(platilloLS.id === platillo) {
            platillosLS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}
// vaciar el carrito 
function vaciarLocalStorage() {
    localStorage.clear();
}




