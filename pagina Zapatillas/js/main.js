// PRODUCTOS
const productos = [
    // zapatillas
    {
        id: "producto1",
        titulo: "Zapatillas nike air glitter dorado",
        imagen: "./img/producto1.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 79000
    },
    {
        id: "producto2",
        titulo: "Zapatillas nike white air glitter rosa",
        imagen: "./img/producto2.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 79000
    },
    {
        id: "producto3",
        titulo: "Zapatillas nike white doble glitter plateado",
        imagen: "./img/producto3.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 85000
    },
    {
        id: "producto4",
        titulo: "Zapatillas nike white glitter fucsia",
        imagen: "./img/producto4.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 79000
    },
    {
        id: "producto5",
        titulo: "Zapatillas nike air black glitter negro",
        imagen: "./img/producto5.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 79000
    },
    
    {
        id: "producto6",
        titulo: "Zapatillas nike air glitter plateado",
        imagen: "./img/producto6.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 79000
    },
   
   //accesorios
    {
        id: "producto7",
        titulo: "mochila marron simil cuero",
        imagen: "./img/mochilamarron.jpeg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 25000
    },

    {
        id: "producto8",
        titulo: "bag animal print",
        imagen: "./img/baganimalprint.jpeg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 39000
    },

    {
        id: "producto9",
        titulo: "bag rocas charol",
        imagen: "./img/bagrocas.jpeg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 30000
    },

    {
        id: "producto10",
        titulo: "cinto cuero blanco",
        imagen: "./img/cintoblanco.jpeg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 5000
    },

    {
        id: "producto11",
        titulo: "cinto tornasolado",
        imagen: "./img/cintotornasolado.jpeg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 5000
    },
   
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";


    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
           <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
           <div class="producto-detalles">
              <h3 class="producto-titulo">${producto.titulo}<h3>
              <p class="producto-precio">$${producto.precio}</p>
              <button class="producto-agregar" id="${producto.id}">Agregar</button>
           </div>
           `;
           contenedorProductos.append(div);
      })

      actualizarBotonesAgregar();
}

cargarProductos(productos); 

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos")  {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
  
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
       boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrio;
let nuevoNumerito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); 

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
 } else {
    productosEnCarrito = [];
 }


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
     
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
