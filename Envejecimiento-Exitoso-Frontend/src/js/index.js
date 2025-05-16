// js/index.js

document.addEventListener('DOMContentLoaded', async () => {
  const productGrid = document.querySelector('.product-grid');

  try {
    const response = await fetch('http://localhost:3000/api/productos');
    if (!response.ok) throw new Error('No se pudo conectar al backend');
    const productos = await response.json();
    renderizarProductos(productos);
  } catch (error) {
    console.warn('No se pudo obtener productos del backend. Cargando productos mock.');
    const productosMock = [
      { id: 1, nombre: 'Producto 1', precio: 29.99 },
      { id: 2, nombre: 'Producto 2', precio: 39.99 },
      { id: 3, nombre: 'Producto 3', precio: 19.99 },
      { id: 4, nombre: 'Producto 4', precio: 49.99 },
    ];
    renderizarProductos(productosMock);
  }

  function renderizarProductos(productos) {
    productGrid.innerHTML = ''; // Limpiar HTML previo

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="https://picsum.photos/seed/${encodeURIComponent(producto.nombre)}/250/150" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toFixed(2)}</p>
        <button data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
      `;

      productGrid.appendChild(card);
    });

    // Asignar eventos a los botones
    productGrid.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        const nombre = button.dataset.nombre;
        const precio = parseFloat(button.dataset.precio);
        agregarAlCarrito(id, nombre, precio);
      });
    });
  }

  function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function agregarAlCarrito(id, nombre, precio) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert(`${nombre} fue agregado al carrito.`);
  }
});
